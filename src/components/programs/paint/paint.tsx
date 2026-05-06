import WindowWrapper from "@/components/shared/window-wrapper";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";
import {
  CANVAS_H,
  CANVAS_W,
  ICONS,
  LINE_TOOLS,
  menuMessages,
  PREVIEW_TOOLS,
  SHAPE_TOOLS,
  TOOL_LABELS,
  TOOL_ROWS,
} from "./constants";
import {
  FillMode,
  LineWidth,
  MenuItems,
  MenuName,
  Point,
  Rect,
  TextState,
  Tool,
  ZoomLevel,
} from "./types";
import { AboutDialog } from "./about-dialog";
import { ColorPalette } from "./color-palette";
import { MenuBar } from "./menu-bar";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeWindow } from "@/store/window-manager-slice";

declare global {
  interface CanvasRenderingContext2D {
    roundRect?: (x: number, y: number, w: number, h: number, r: number) => void;
  }
}

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    return this;
  };
}

function floodFill(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  hex: string,
): void {
  const w = ctx.canvas.width,
    h = ctx.canvas.height;
  sx = Math.max(0, Math.min(w - 1, ~~sx));
  sy = Math.max(0, Math.min(h - 1, ~~sy));
  const img = ctx.getImageData(0, 0, w, h),
    d = img.data;
  const si = (sy * w + sx) * 4;
  const [tr, tg, tb, ta] = [d[si], d[si + 1], d[si + 2], d[si + 3]];
  const fr = parseInt(hex.slice(1, 3), 16);
  const fg2 = parseInt(hex.slice(3, 5), 16);
  const fb = parseInt(hex.slice(5, 7), 16);
  if (tr === fr && tg === fg2 && tb === fb && ta === 255) return;
  const match = (i: number): boolean =>
    d[i] === tr && d[i + 1] === tg && d[i + 2] === tb && d[i + 3] === ta;
  const stack: number[] = [sx + sy * w];
  const vis = new Uint8Array(w * h);
  while (stack.length) {
    const p = stack.pop()!;
    if (vis[p]) continue;
    vis[p] = 1;
    const x = p % w,
      y = (p / w) | 0;
    if (x < 0 || x >= w || y < 0 || y >= h) continue;
    const i = p * 4;
    if (!match(i)) continue;
    d[i] = fr;
    d[i + 1] = fg2;
    d[i + 2] = fb;
    d[i + 3] = 255;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }
  ctx.putImageData(img, 0, 0);
}

function pickColor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
): string {
  const d = ctx.getImageData(Math.max(0, ~~x), Math.max(0, ~~y), 1, 1).data;
  return (
    "#" +
    [d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, "0")).join("")
  );
}

function brushStroke(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  size: number,
): void {
  const r = [2, 4, 7, 12][size - 1] || 2;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = r * 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

export default function Paint() {
  const [tool, setTool] = useState<Tool>("pencil");
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [lineWidth, setLineWidth] = useState<LineWidth>(1);
  const [fillMode, setFillMode] = useState<FillMode>(0);
  const [cursorPos, setCursorPos] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<ZoomLevel>(1);
  const [textState, setTextState] = useState<TextState | null>(null);
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [selRect, setSelRect] = useState<Rect | null>(null);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>("#000000");
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const isDrawRef = useRef<boolean>(false);
  const startRef = useRef<Point>({ x: 0, y: 0 });
  const lastRef = useRef<Point>({ x: 0, y: 0 });
  const savedImgRef = useRef<ImageData | null>(null);
  const drawBtnRef = useRef<number>(0);
  const airTimerRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();
  const footerMessage = useAppSelector((state) => state.footerMessage.message);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      setUndoStack([ctx.getImageData(0, 0, CANVAS_W, CANVAS_H)]);
    }
  }, []);

  const saveUndo = useCallback((): void => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      const img = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
      setUndoStack((s) => [...s.slice(-24), img]);
      setRedoStack([]);
    }
  }, []);

  const undo = useCallback((): void => {
    setUndoStack((prev) => {
      if (prev.length < 2) return prev;
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        setRedoStack((r) => [...r, ctx.getImageData(0, 0, CANVAS_W, CANVAS_H)]);
        ctx.putImageData(prev[prev.length - 2], 0, 0);
      }
      return prev.slice(0, -1);
    });
  }, []);

  const redo = useCallback((): void => {
    setRedoStack((prev) => {
      if (!prev.length) return prev;
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        setUndoStack((u) => [...u, ctx.getImageData(0, 0, CANVAS_W, CANVAS_H)]);
        ctx.putImageData(prev[prev.length - 1], 0, 0);
      }
      return prev.slice(0, -1);
    });
  }, []);

  const getPos = useCallback(
    (e: ReactMouseEvent | MouseEvent): Point => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: (e.clientX - rect.left) / zoom,
        y: (e.clientY - rect.top) / zoom,
      };
    },
    [zoom],
  );

  const getColor = useCallback(
    (btn: number): string => {
      return btn === 2 ? bgColor : fgColor;
    },
    [bgColor, fgColor],
  );

  const drawShape = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      sx: number,
      sy: number,
      ex: number,
      ey: number,
      color: string,
    ): void => {
      const ol = fillMode === 0 || fillMode === 1,
        fi = fillMode === 1 || fillMode === 2;
      const x = Math.min(sx, ex),
        y = Math.min(sy, ey),
        w = Math.abs(ex - sx),
        h = Math.abs(ey - sy);
      ctx.save();
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "square";

      if (tool === "line") {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      } else if (tool === "rect") {
        if (fi) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(x, y, w, h);
        }
        if (ol) {
          ctx.strokeStyle = color;
          ctx.strokeRect(x, y, w, h);
        }
      } else if (tool === "ellipse") {
        ctx.beginPath();
        ctx.ellipse(
          (sx + ex) / 2,
          (sy + ey) / 2,
          Math.max(1, w / 2),
          Math.max(1, h / 2),
          0,
          0,
          Math.PI * 2,
        );
        if (fi) {
          ctx.fillStyle = bgColor;
          ctx.fill();
        }
        if (ol) {
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      } else if (tool === "roundrect") {
        const r = Math.max(1, Math.min(12, w / 4, h / 4));
        ctx.beginPath();
        ctx.roundRect?.(x, y, w, h, r);
        if (fi) {
          ctx.fillStyle = bgColor;
          ctx.fill();
        }
        if (ol) {
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      }
      ctx.restore();
    },
    [tool, fillMode, lineWidth, bgColor],
  );

  const commitText = useCallback((): void => {
    if (!textState?.value) {
      setTextState(null);
      return;
    }
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.font = "bold 16px Arial";
      ctx.fillStyle = fgColor;
      ctx.fillText(textState.value, textState.x, textState.y + 16);
      saveUndo();
      setTextState(null);
    }
  }, [textState, fgColor, saveUndo]);

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement>): void => {
      e.preventDefault();
      const pos = getPos(e);
      const btn = e.button;
      const color = getColor(btn);
      const ctx = canvasRef.current?.getContext("2d");

      if (!ctx) return;

      if (tool === "fill") {
        saveUndo();
        floodFill(ctx, pos.x, pos.y, color);
        return;
      }
      if (tool === "eyedropper") {
        const c = pickColor(ctx, pos.x, pos.y);
        if (btn === 2) setBgColor(c);
        else setFgColor(c);
        return;
      }
      if (tool === "text") {
        commitText();
        setTextState({ x: pos.x, y: pos.y, value: "" });
        return;
      }

      isDrawRef.current = true;
      drawBtnRef.current = btn;
      startRef.current = pos;
      lastRef.current = pos;
      if (PREVIEW_TOOLS.includes(tool)) {
        savedImgRef.current = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
      }

      if (tool === "pencil") {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + 0.1, pos.y);
        ctx.stroke();
        ctx.restore();
      } else if (tool === "brush") {
        const r = [2, 4, 7, 12][lineWidth - 1] || 2;
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (tool === "eraser") {
        const sz = [8, 14, 20, 28][lineWidth - 1] || 8;
        ctx.fillStyle = bgColor;
        ctx.fillRect(pos.x - sz / 2, pos.y - sz / 2, sz, sz);
      } else if (tool === "airbrush") {
        const spray = (): void => {
          const r = 14 * lineWidth;
          ctx.fillStyle = color;
          for (let i = 0; i < 8 * lineWidth; i++) {
            const a = Math.random() * Math.PI * 2,
              d = Math.random() * r;
            ctx.fillRect(
              ~~(lastRef.current.x + Math.cos(a) * d),
              ~~(lastRef.current.y + Math.sin(a) * d),
              1,
              1,
            );
          }
        };
        spray();
        airTimerRef.current = setInterval(spray, 40);
      }
    },
    [getPos, getColor, tool, saveUndo, commitText, lineWidth, bgColor],
  );

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement>): void => {
      const pos = getPos(e);
      setCursorPos({ x: ~~pos.x, y: ~~pos.y });
      const prev = { ...lastRef.current };
      lastRef.current = pos;
      if (!isDrawRef.current) return;

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      const color = getColor(drawBtnRef.current);
      const start = startRef.current;

      if (tool === "pencil") {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.restore();
      } else if (tool === "brush") {
        brushStroke(ctx, prev.x, prev.y, pos.x, pos.y, color, lineWidth);
      } else if (tool === "eraser") {
        const sz = [8, 14, 20, 28][lineWidth - 1] || 8;
        ctx.fillStyle = bgColor;
        ctx.fillRect(pos.x - sz / 2, pos.y - sz / 2, sz, sz);
      } else if (SHAPE_TOOLS.includes(tool) || tool === "line") {
        if (savedImgRef.current) {
          ctx.putImageData(savedImgRef.current, 0, 0);
        }
        drawShape(ctx, start.x, start.y, pos.x, pos.y, color);
      } else if (tool === "select" || tool === "freeselect") {
        if (savedImgRef.current) {
          ctx.putImageData(savedImgRef.current, 0, 0);
        }
        const x = Math.min(start.x, pos.x),
          y = Math.min(start.y, pos.y),
          w = Math.abs(pos.x - start.x),
          h = Math.abs(pos.y - start.y);
        ctx.save();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(x, y, w, h);
        ctx.restore();
      }
    },
    [getPos, getColor, tool, lineWidth, bgColor, drawShape],
  );

  const handleMouseUp = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement>): void => {
      if (!isDrawRef.current) return;
      isDrawRef.current = false;
      if (airTimerRef.current) {
        clearInterval(airTimerRef.current);
        airTimerRef.current = null;
      }
      const pos = getPos(e),
        start = startRef.current;
      if (tool === "select") {
        setSelRect({
          x: ~~Math.min(start.x, pos.x),
          y: ~~Math.min(start.y, pos.y),
          w: ~~Math.abs(pos.x - start.x),
          h: ~~Math.abs(pos.y - start.y),
        });
      }
      saveUndo();
    },
    [tool, getPos, saveUndo],
  );

  const newCanvas = useCallback((): void => {
    saveUndo();
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      setSelRect(null);
    }
  }, [saveUndo]);

  const downloadCanvas = (): void => {
    const link = document.createElement("a");
    link.download = "untitled.png";
    link.href = canvasRef.current?.toDataURL() || "";
    link.click();
  };

  const invertColors = (): void => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      saveUndo();
      const img = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
      for (let i = 0; i < img.data.length; i += 4) {
        img.data[i] = 255 - img.data[i];
        img.data[i + 1] = 255 - img.data[i + 1];
        img.data[i + 2] = 255 - img.data[i + 2];
      }
      ctx.putImageData(img, 0, 0);
    }
  };

  const grayscale = (): void => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      saveUndo();
      const img = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
      for (let i = 0; i < img.data.length; i += 4) {
        const g = ~~(
          img.data[i] * 0.299 +
          img.data[i + 1] * 0.587 +
          img.data[i + 2] * 0.114
        );
        img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
      }
      ctx.putImageData(img, 0, 0);
    }
  };

  const flipCanvas = (horizontal: boolean): void => {
    const tmp = document.createElement("canvas");
    tmp.width = CANVAS_W;
    tmp.height = CANVAS_H;
    const tc = tmp.getContext("2d");
    if (tc && canvasRef.current) {
      tc.save();
      if (horizontal) {
        tc.translate(CANVAS_W, 0);
        tc.scale(-1, 1);
      } else {
        tc.translate(0, CANVAS_H);
        tc.scale(1, -1);
      }
      tc.drawImage(canvasRef.current, 0, 0);
      tc.restore();
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        saveUndo();
        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.drawImage(tmp, 0, 0);
      }
    }
  };

  const rotate90 = (): void => {
    const tmp = document.createElement("canvas");
    tmp.width = CANVAS_H;
    tmp.height = CANVAS_W;
    const tc = tmp.getContext("2d");
    if (tc && canvasRef.current) {
      tc.translate(CANVAS_H, 0);
      tc.rotate(Math.PI / 2);
      tc.drawImage(canvasRef.current, 0, 0);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        saveUndo();
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.drawImage(tmp, 0, 0, CANVAS_W, CANVAS_H);
      }
    }
  };

  const fillCanvas = (color: string): void => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      saveUndo();
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setTextState(null);
        setSelRect(null);
      }
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
        if (e.key === "z") {
          e.preventDefault();
          undo();
        }
        if (e.key === "y") {
          e.preventDefault();
          redo();
        }
        if (e.key === "s") {
          e.preventDefault();
          downloadCanvas();
        }
        if (e.key === "n") {
          e.preventDefault();
          newCanvas();
        }
        if (e.key === "a") {
          e.preventDefault();
          setSelRect({ x: 0, y: 0, w: CANVAS_W, h: CANVAS_H });
          setTool("select");
        }
        if (e.key === "+") {
          e.preventDefault();
          setZoom((z) => Math.min(z * 2, 8));
        }
        if (e.key === "-") {
          e.preventDefault();
          setZoom((z) => Math.max(z / 2, 0.5));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, newCanvas]);

  const getCursor = (): string => {
    const cursorMap: Record<Tool, string> = {
      pencil: "crosshair",
      brush: "crosshair",
      eraser: "cell",
      fill: "crosshair",
      eyedropper: "crosshair",
      magnifier: "zoom-in",
      text: "text",
      select: "crosshair",
      freeselect: "crosshair",
      line: "crosshair",
      rect: "crosshair",
      ellipse: "crosshair",
      roundrect: "crosshair",
      curve: "crosshair",
      airbrush: "crosshair",
      polygon: "crosshair",
    };
    return cursorMap[tool] || "crosshair";
  };

  const SZ = LINE_TOOLS.includes(tool);
  const FM = SHAPE_TOOLS.includes(tool);

  const MENUS: MenuItems = {
    File: [
      { l: "New", a: newCanvas, s: "Ctrl+N" },
      { l: "Save", a: downloadCanvas, s: "Ctrl+S" },
      { l: "─", d: true },
      { l: "Exit", a: () => dispatch(closeWindow(14)) },
    ],
    Edit: [
      { l: "Undo", a: undo, s: "Ctrl+Z", dis: undoStack.length < 2 },
      { l: "Redo", a: redo, s: "Ctrl+Y", dis: !redoStack.length },
      { l: "─", d: true },
      {
        l: "Select All",
        a: () => {
          setSelRect({ x: 0, y: 0, w: CANVAS_W, h: CANVAS_H });
          setTool("select");
          setActiveMenu(null);
        },
        s: "Ctrl+A",
      },
      {
        l: "Clear Selection",
        a: () => {
          setSelRect(null);
          setActiveMenu(null);
        },
      },
    ],
    View: [
      {
        l: "Zoom In",
        a: () => {
          setZoom((z) => Math.min(z * 2, 8));
          setActiveMenu(null);
        },
        s: "Ctrl++",
      },
      {
        l: "Zoom Out",
        a: () => {
          setZoom((z) => Math.max(z / 2, 0.5));
          setActiveMenu(null);
        },
        s: "Ctrl+-",
      },
      {
        l: "Normal Size (1×)",
        a: () => {
          setZoom(1);
          setActiveMenu(null);
        },
      },
      { l: "─", d: true },
      {
        l: `Show Grid ${showGrid ? "✓" : ""}`,
        a: () => {
          setShowGrid((v) => !v);
          setActiveMenu(null);
        },
      },
      { l: `Current: ${zoom}×`, d: true },
    ],
    Image: [
      { l: "Flip Horizontal", a: () => flipCanvas(true) },
      { l: "Flip Vertical", a: () => flipCanvas(false) },
      { l: "Rotate 90°", a: rotate90 },
      { l: "─", d: true },
      { l: "Invert Colors", a: invertColors },
      { l: "Grayscale", a: grayscale },
      { l: "Fill with Foreground", a: () => fillCanvas(fgColor) },
      { l: "Fill with Background", a: () => fillCanvas(bgColor) },
      { l: "─", d: true },
      { l: `Canvas: ${CANVAS_W}×${CANVAS_H}`, d: true },
    ],
    Colors: [
      { l: "Left-click palette → FG", d: true },
      { l: "Right-click palette → BG", d: true },
    ],
    Help: [
      {
        l: "About Paint",
        a: () => {
          setShowAbout(true);
          setActiveMenu(null);
        },
      },
    ],
  };

  return (
    <WindowWrapper
      title="untitled - Paint"
      icon="/icons/paint.png"
      controls={{ close: true, maximize: true, minimize: true }}
      id={14}
    >
      <div className="size-full flex flex-col min-h-0 text-[12px] select-none font-[Arial,sans-serif]">
        <div className="flex-1 min-h-0 flex flex-col relative border-[2px] border-t-white border-r-[#808080] border-b-[#808080] border-l-white">
          <MenuBar
            menus={MENUS}
            activeMenu={activeMenu}
            onMenuClick={setActiveMenu}
            onMenuItemClick={() => setActiveMenu(null)}
            messages={menuMessages}
          />

          <div className="flex flex-1 min-h-0 overflow-hidden">
            <div className="w-[54px] flex-shrink-0 p-1 border-r border-[#808080] bg-[#c0c0c0]">
              <div className="border border-[#808080] border-t-white border-l-white p-0.5 shadow-[inset_1px_1px_0_#fff]">
                <div className="grid grid-cols-2 gap-0.5">
                  {TOOL_ROWS.flat().map((t) => {
                    const Icon = ICONS[t];
                    const active = tool === t;
                    return (
                      <div
                        key={t}
                        title={TOOL_LABELS[t]}
                        onClick={() => {
                          setTool(t);
                        }}
                        className={`w-[22px] h-[22px] flex items-center justify-center cursor-default p-px ${
                          active
                            ? "bg-[#b8b8b8] shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_#fff]"
                            : "bg-[#c0c0c0] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#808080]"
                        }`}
                      >
                        {Icon && <Icon />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {(SZ || FM) && (
                <div className="mt-1.5 border border-[#808080] border-t-white border-l-white p-1 shadow-[inset_1px_1px_0_#fff]">
                  {SZ && (
                    <div>
                      {[1, 2, 3, 4].map((s) => {
                        const isEr = tool === "eraser";
                        const sz = isEr
                          ? [8, 14, 20, 28][s - 1]
                          : [1, 2, 4, 7][s - 1];
                        return (
                          <div
                            key={s}
                            onClick={() => setLineWidth(s as LineWidth)}
                            className={`h-[14px] flex items-center justify-center cursor-default mb-px ${
                              lineWidth === s
                                ? "bg-[#000080]"
                                : "bg-transparent"
                            }`}
                          >
                            {isEr ? (
                              <div
                                className="border border-[#888]"
                                style={{
                                  width: Math.min(sz, 36),
                                  height: Math.min(sz, 12),
                                  background: lineWidth === s ? "#fff" : "#000",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 36,
                                  height: sz,
                                  background: lineWidth === s ? "#fff" : "#000",
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {FM && (
                    <div
                      className={`${SZ ? "mt-1 border-t border-[#808080] pt-1" : ""}`}
                    >
                      {([0, 1, 2] as FillMode[]).map((m) => (
                        <div
                          key={m}
                          onClick={() => setFillMode(m)}
                          className={`flex items-center justify-center mb-0.5 cursor-default p-px ${
                            fillMode === m ? "bg-[#000080]" : "bg-transparent"
                          }`}
                        >
                          <svg width="36" height="13" viewBox="0 0 36 13">
                            {m === 0 && (
                              <rect
                                x="1"
                                y="1"
                                width="34"
                                height="11"
                                fill="none"
                                stroke={fillMode === m ? "#fff" : "#000"}
                                strokeWidth="1.5"
                              />
                            )}
                            {m === 1 && (
                              <>
                                <rect
                                  x="1"
                                  y="1"
                                  width="34"
                                  height="11"
                                  fill={fillMode === m ? "#aaa" : "#ccc"}
                                />
                                <rect
                                  x="1"
                                  y="1"
                                  width="34"
                                  height="11"
                                  fill="none"
                                  stroke={fillMode === m ? "#fff" : "#000"}
                                  strokeWidth="1.5"
                                />
                              </>
                            )}
                            {m === 2 && (
                              <rect
                                x="1"
                                y="1"
                                width="34"
                                height="11"
                                fill={fillMode === m ? "#ccc" : "#888"}
                              />
                            )}
                          </svg>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div
              className="flex-1 min-w-0 min-h-0 bg-[#808080] p-1.5 overflow-auto relative"
              style={{ cursor: getCursor() }}
            >
              <div className="inline-block shadow-[2px_2px_0_#000] leading-none relative">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_W}
                  height={CANVAS_H}
                  className="bg-white block"
                  style={{
                    imageRendering: "pixelated",
                    width: CANVAS_W * zoom,
                    height: CANVAS_H * zoom,
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {showGrid && zoom >= 2 && (
                  <svg
                    ref={overlayRef}
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{
                      width: CANVAS_W * zoom,
                      height: CANVAS_H * zoom,
                    }}
                    viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                  >
                    {Array.from(
                      { length: Math.floor(CANVAS_W / 10) },
                      (_, i) => (
                        <line
                          key={"v" + i}
                          x1={(i + 1) * 10}
                          y1="0"
                          x2={(i + 1) * 10}
                          y2={CANVAS_H}
                          stroke="rgba(0,0,0,0.2)"
                          strokeWidth="0.5"
                        />
                      ),
                    )}
                    {Array.from(
                      { length: Math.floor(CANVAS_H / 10) },
                      (_, i) => (
                        <line
                          key={"h" + i}
                          x1="0"
                          y1={(i + 1) * 10}
                          x2={CANVAS_W}
                          y2={(i + 1) * 10}
                          stroke="rgba(0,0,0,0.2)"
                          strokeWidth="0.5"
                        />
                      ),
                    )}
                  </svg>
                )}
                {textState && (
                  <input
                    autoFocus
                    value={textState.value}
                    onChange={(e) =>
                      setTextState((s) =>
                        s ? { ...s, value: e.target.value } : null,
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitText();
                      if (e.key === "Escape") setTextState(null);
                    }}
                    onBlur={commitText}
                    className="absolute bg-transparent border border-dashed border-black outline-none p-0.5 z-10"
                    style={{
                      left: textState.x * zoom,
                      top: textState.y * zoom,
                      color: fgColor,
                      fontSize: 16 * zoom,
                      fontFamily: "Arial",
                      minWidth: 80,
                      lineHeight: 1.2,
                    }}
                  />
                )}
                {[
                  { b: -3, r: -3, cursor: "se-resize" },
                  { b: -3, l: (CANVAS_W * zoom) / 2 - 3, cursor: "s-resize" },
                  { t: (CANVAS_H * zoom) / 2 - 3, r: -3, cursor: "e-resize" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white border border-black"
                    style={{
                      ...(s.b !== undefined ? { bottom: s.b } : { top: s.t }),
                      ...(s.r !== undefined ? { right: s.r } : { left: s.l }),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <ColorPalette
            fgColor={fgColor}
            bgColor={bgColor}
            customColor={customColor}
            onFgColorChange={setFgColor}
            onBgColorChange={setBgColor}
            onCustomColorChange={setCustomColor}
          />

          <div className="border-t border-[#808080] py-px px-1 flex justify-between text-[11px] bg-[#c0c0c0]">
            <div className="border border-[#808080] border-r-white border-b-white px-1 min-w-[110px] flex-shrink-0">
              {footerMessage}
            </div>
            <div className="flex gap-0.5 flex-wrap">
              {selRect && (
                <div className="border border-[#808080] border-r-white border-b-white px-1">
                  {selRect.w}×{selRect.h}
                </div>
              )}
              <div className="border border-[#808080] border-r-white border-b-white px-1 min-w-[60px]">
                {cursorPos.x},{cursorPos.y}
              </div>
              <div className="border border-[#808080] border-r-white border-b-white px-1">
                {CANVAS_W}×{CANVAS_H}
              </div>
              <div className="border border-[#808080] border-r-white border-b-white px-1">
                Zoom: {zoom}×
              </div>
            </div>
          </div>
        </div>

        <AboutDialog
          isOpen={showAbout}
          onClose={() => setShowAbout(false)}
          undoStackLength={undoStack.length}
        />
      </div>
    </WindowWrapper>
  );
}
