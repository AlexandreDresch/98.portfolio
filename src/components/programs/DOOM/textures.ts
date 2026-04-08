import * as THREE from "three";

function mktex(
  fn: (ctx: CanvasRenderingContext2D) => void,
  repeat = false,
): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  fn(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
  }
  return t;
}

export function buildWall(): THREE.Texture {
  return mktex((ctx) => {
    ctx.fillStyle = "#1c1c1c";
    ctx.fillRect(0, 0, 128, 128);
    const BW = 32,
      BH = 16;
    for (let r = 0; r <= 8; r++) {
      const off = (r % 2) * (BW / 2);
      for (let x = -off; x < 128; x += BW) {
        ctx.fillStyle = `hsl(220,8%,${13 + Math.random() * 5}%)`;
        ctx.fillRect(x + 1, r * BH + 1, BW - 2, BH - 2);
      }
    }
    ctx.fillStyle = "#080808";
    for (let r = 0; r <= 8; r++) {
      ctx.fillRect(0, r * BH, 128, 1);
      const off = (r % 2) * (BW / 2);
      for (let x = -off; x < 128; x += BW) ctx.fillRect(x, r * BH, 1, BH);
    }

    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = `rgba(0,0,100,${0.04 + Math.random() * 0.04})`;
      ctx.fillRect(
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 28 + 4,
        Math.random() * 12 + 2,
      );
    }
  }, true);
}

export function buildFloor(): THREE.Texture {
  return mktex((ctx) => {
    ctx.fillStyle = "#141414";
    ctx.fillRect(0, 0, 128, 128);
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 4; c++) {
        const sh = 17 + ((r + c) % 2) * 6 + Math.random() * 4;
        ctx.fillStyle = `hsl(0,0%,${sh}%)`;
        ctx.fillRect(c * 32 + 1, r * 32 + 1, 30, 30);
      }
    ctx.fillStyle = "#080808";
    for (let i = 0; i <= 128; i += 32) {
      ctx.fillRect(i, 0, 1, 128);
      ctx.fillRect(0, i, 128, 1);
    }
  }, true);
}

export function buildBSOD(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#c0b8a8";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "#b0a898";
  ctx.fillRect(4, 4, 248, 248);
  ctx.fillStyle = "#444";
  ctx.fillRect(16, 18, 224, 188);
  ctx.fillStyle = "#0000AA";
  ctx.fillRect(18, 20, 220, 184);

  const grad = ctx.createLinearGradient(18, 20, 238, 20);
  grad.addColorStop(0, "#000080");
  grad.addColorStop(1, "#1a6ad0");
  ctx.fillStyle = grad;
  ctx.fillRect(18, 20, 220, 18);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 10px Courier New,monospace";
  ctx.textBaseline = "top";
  ctx.fillText("Windows", 24, 23);
  ctx.fillStyle = "#c0c0c0";
  ctx.fillRect(226, 22, 11, 12);
  ctx.fillStyle = "#000";
  ctx.font = "9px Courier New";
  ctx.fillText("✕", 228, 23);

  const lines: Array<[number, string, string]> = [
    [8, "#fff", "A fatal exception 0E has occurred"],
    [20, "#fff", "at 0028:C0034B2F in VxD VMM(01)."],
    [32, "#fff", "The current application will"],
    [42, "#fff", "be terminated."],
    [58, "#fff", "* Press any key to terminate"],
    [68, "#fff", "  the current application."],
    [78, "#fff", "* Press CTRL+ALT+DEL to restart"],
    [88, "#fff", "  your computer. You will lose"],
    [98, "#fff", "  any unsaved information in all"],
    [108, "#fff", "  other applications."],
    [126, "#ffff00", "Press any key to continue _"],
  ];
  lines.forEach(([dy, col, text]) => {
    ctx.font = "bold 7.5px Courier New,monospace";
    ctx.fillStyle = col;
    ctx.fillText(text, 22, 20 + dy);
  });

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath();
  ctx.moveTo(18, 20);
  ctx.lineTo(130, 20);
  ctx.lineTo(90, 100);
  ctx.lineTo(18, 100);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#b0a898";
  ctx.fillRect(18, 207, 220, 16);
  ctx.fillStyle = "#a0a090";
  ctx.fillRect(96, 220, 64, 16);
  ctx.fillRect(80, 232, 96, 10);

  ctx.fillStyle = "#888";
  ctx.fillRect(22, 211, 18, 8);
  ctx.fillRect(44, 211, 18, 8);
  ctx.fillStyle = "#999";
  ctx.fillRect(23, 212, 16, 6);
  ctx.fillRect(45, 212, 16, 6);
  ctx.fillStyle = "#00cc00";
  ctx.shadowColor = "#00ff00";
  ctx.shadowBlur = 5;
  ctx.beginPath();
  ctx.arc(214, 215, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#666";
  ctx.fillRect(22, 222, 60, 7);
  ctx.fillStyle = "#555";
  ctx.fillRect(23, 223, 58, 5);

  const t = new THREE.CanvasTexture(c);
  return t;
}

export function buildSplatter(): THREE.Texture {
  return mktex((ctx) => {
    ctx.clearRect(0, 0, 128, 128);
    ctx.fillStyle = "#0000AA";
    ctx.beginPath();
    ctx.arc(64, 64, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px Courier New,monospace";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("ERR", 64, 56);
    ctx.fillText("0x0E", 64, 70);
    for (let i = 0; i < 28; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "#0000AA" : "#4444ff";
      ctx.fillRect(
        64 + Math.random() * 54 - 27,
        64 + Math.random() * 54 - 27,
        Math.random() * 6 + 1,
        Math.random() * 6 + 1,
      );
    }
  });
}
