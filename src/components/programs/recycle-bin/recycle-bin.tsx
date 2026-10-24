"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WindowWrapper from "@/components/shared/window-wrapper";
import FolderFooterMessage from "@/components/folder/folder-footer-message";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFooterMessage } from "@/store/footer-message-slice";
import { openWindow, selectProgram } from "@/store/window-manager-slice";
import Image from "next/image";
import { TrashItem } from "./types";
import { EMPTY_CONFIRMATIONS, INITIAL_ITEMS, RESTORE_QUIPS } from "./constants";
import { BinIcon, FileIconBig, FileIconSmall } from "./icons";
import { ToolbarButton } from "../my-computer/toolbar-button";
import FolderNavigationMenu from "@/components/folder/folder-navigation-menu";

export default function RecycleBin({
  renderTrigger,
  windowId,
}: {
  renderTrigger: boolean;
  windowId: number;
}) {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<TrashItem[]>(INITIAL_ITEMS);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [view, setView] = useState<"list" | "icon">("list");
  const [shaking, setShaking] = useState(false);

  const isEmpty = items.length === 0;
  const selectedItems = items.filter((i) => selected.has(i.id));

  const { selectedProgram } = useAppSelector((state) => state.windows);

  const handleSelect = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setSelected((prev) => {
        const next = new Set(prev);
        if (e.ctrlKey || e.metaKey) {
          next.has(id) ? next.delete(id) : next.add(id);
        } else if (e.shiftKey && prev.size > 0) {
          const ids = items.map((i) => i.id);
          const last = [...prev].at(-1)!;
          const a = ids.indexOf(last),
            b = ids.indexOf(id);
          const [lo, hi] = a < b ? [a, b] : [b, a];
          ids.slice(lo, hi + 1).forEach((x) => next.add(x));
        } else {
          next.clear();
          next.add(id);
        }
        const item = items.find((i) => i.id === id);
        if (item)
          dispatch(
            setFooterMessage(`${item.name}.${item.ext}  —  ${item.size}`),
          );
        return next;
      });
    },
    [items, dispatch],
  );

  const clearSel = () => {
    setSelected(new Set());
    dispatch(setFooterMessage(""));
  };

  const restore = useCallback(() => {
    if (!selected.size) return;
    setItems((p) => p.filter((i) => !selected.has(i.id)));
    setSelected(new Set());
    const q = RESTORE_QUIPS[Math.floor(Math.random() * RESTORE_QUIPS.length)];
    dispatch(setFooterMessage(`${selectedItems.length} item(s) restored.`));
  }, [selected, selectedItems, dispatch]);

  const deleteSelected = useCallback(() => {
    if (!selected.size) return;
    setItems((p) => p.filter((i) => !selected.has(i.id)));
    setSelected(new Set());
    dispatch(setFooterMessage("Permanently deleted."));
  }, [selected, dispatch]);

  const emptyBin = () => {
    if (isEmpty) {
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      return;
    }
    setItems([]);
    setSelected(new Set());
    dispatch(setFooterMessage("Recycle Bin emptied."));
  };

  const totalKB = items.reduce((acc, i) => {
    const n = parseFloat(i.size) || 0;
    const u = i.size.split(" ")[1];
    return acc + (u === "GB" ? n * 1024 * 1024 : u === "MB" ? n * 1024 : n);
  }, 0);
  const fmtTotal =
    totalKB > 1024 * 1024
      ? `${(totalKB / 1024 / 1024).toFixed(1)} GB`
      : totalKB > 1024
        ? `${(totalKB / 1024).toFixed(1)} MB`
        : `${Math.round(totalKB)} KB`;

  const panelTitle =
    selectedItems.length === 1
      ? `${selectedItems[0].name}.${selectedItems[0].ext}`
      : selectedItems.length > 1
        ? `${selectedItems.length} items selected`
        : "Recycle Bin";

  const panelDesc =
    selectedItems.length === 1
      ? `Size: ${selectedItems[0].size}\nDeleted: ${selectedItems[0].deletedOn}\nFrom: ${selectedItems[0].location}`
      : selectedItems.length > 1
        ? "Double-click any selected item to restore all of them."
        : isEmpty
          ? "Nothing here.\n\nEither very organized\nor you deleted System32."
          : `${items.length} item${items.length !== 1 ? "s" : ""} — ${fmtTotal}\n\nSelect items to restore\nor delete permanently.`;

  const handleOpenWindow = () => {
    dispatch(openWindow(windowId));
  };

  const handleSelectTrigger = () => {
    dispatch(selectProgram(null));
    dispatch(selectProgram(windowId));
  };

  const isActive = selectedProgram?.id === windowId;
  console.log(selectedProgram);

  return (
    <>
      {renderTrigger && (
        <button
          type="button"
          onClick={handleSelectTrigger}
          onDoubleClick={handleOpenWindow}
          className="flex cursor-pointer flex-col items-center gap-1 bg-transparent border-0"
        >
          <Image
            src={
              isEmpty
                ? "/icons/recycle-bin-empty.png"
                : "/icons/recycle-bin-full.png"
            }
            alt="Recycle Bin"
            width={38}
            height={38}
            draggable={false}
            className="object-contain"
          />

          <span
            className={cn(
              "font-normal text-sm text-white px-2 bg-[#0c7f80] max-w-full",
              isActive && "bg-[#010f80]",
            )}
          >
            Recycle Bin
          </span>
        </button>
      )}

      <WindowWrapper
        id={windowId}
        title={isEmpty ? "Recycle Bin (empty)" : "Recycle Bin"}
        icon={
          isEmpty
            ? "/icons/recycle-bin-empty.png"
            : "/icons/recycle-bin-full.png"
        }
        controls={{ close: true, minimize: true, maximize: true }}
        className="!w-[740px] flex-1 !min-h-[520px]"
        crtEffect
      >
        <div className="flex flex-col w-full h-full min-h-0 select-none text-sm pb-1">
          <div className="flex h-7 items-center px-1 border-b border-[#808080] flex-shrink-0 text-[12px]">
            <Separator
              orientation="vertical"
              className="bg-[#C0C0C0] h-6 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
            />

            <FolderNavigationMenu />
          </div>

          <div className="flex items-center px-1 py-0.5 border-b border-[#808080] flex-shrink-0 gap-0.5 bg-[#c0c0c0]">
            <Separator
              orientation="vertical"
              className="bg-[#C0C0C0] h-6 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
            />

            <ToolbarButton
              label="Empty"
              onClick={emptyBin}
              icon="/icons/recycle-bin-empty.png"
            />

            <ToolbarButton
              label="Restore"
              onClick={restore}
              icon="/arrow-left.svg"
              disabled={selected.size === 0}
            />

            <ToolbarButton
              label="Delete"
              disabled={selected.size === 0}
              onClick={deleteSelected}
              icon="/icons/x.png"
            />

            <Separator className="w-px h-8 bg-[#808080] mx-1" />

            {view === "list" ? (
              <ToolbarButton
                label="Icons"
                onClick={() => setView("icon")}
                icon="/icons/grid.png"
              />
            ) : (
              <ToolbarButton
                label="List"
                onClick={() => setView("list")}
                icon="/icons/list.png"
              />
            )}

            {selected.size > 0 && (
              <span className="ml-auto mr-2 text-[10px] text-[#808080]">
                {selected.size} selected
              </span>
            )}
          </div>

          <div className="flex flex-1 min-h-0 overflow-hidden">
            <div className="w-52 flex-shrink-0 border-r border-[#808080] bg-gradient-to-b from-[#d4d0c8] to-[#c0c0c0] flex flex-col p-3 gap-3 overflow-hidden">
              <div>
                <motion.div
                  animate={
                    shaking
                      ? { x: [0, -8, 8, -6, 6, -4, 4, 0] }
                      : isEmpty
                        ? { rotate: [0, -6, 6, -3, 3, 0] }
                        : { y: [0, -2, 0] }
                  }
                  transition={{
                    duration: shaking ? 0.5 : 2.5,
                    repeat: shaking ? 0 : Infinity,
                    repeatDelay: 3,
                  }}
                  className="mb-2 inline-block"
                >
                  <BinIcon full={!isEmpty} />
                </motion.div>

                <p className="font-bold text-[13px] leading-tight break-words">
                  {panelTitle}
                </p>
                <div className="h-px my-2 bg-gradient-to-r from-[#0000aa] via-[#6666ff] to-transparent" />
                <p className="text-[10px] text-gray-700 leading-relaxed whitespace-pre-line">
                  {panelDesc}
                </p>
              </div>

              {!isEmpty && (
                <div className="mt-auto border border-[#808080] bg-white p-2 flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#808080]">Items:</span>
                    <span className="font-bold">{items.length}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#808080]">Size:</span>
                    <span className="font-bold">{fmtTotal}</span>
                  </div>
                  <div className="h-2 border border-[#808080] mt-1 overflow-hidden">
                    <motion.div
                      className="h-full bg-[#000080]"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, (items.length / INITIAL_ITEMS.length) * 100)}%`,
                      }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-[9px] text-[#aaaaaa] italic text-center">
                    {Math.round((items.length / INITIAL_ITEMS.length) * 100)}%
                    full
                  </p>
                </div>
              )}
            </div>

            <div
              className="flex-1 min-h-0 overflow-auto bg-white"
              onClick={(e) => {
                if (e.target === e.currentTarget) clearSel();
              }}
            >
              <AnimatePresence mode="wait">
                {isEmpty ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-3 text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                      }}
                    >
                      <BinIcon full={false} />
                    </motion.div>
                    <div>
                      <p className="text-sm font-bold text-[#808080]">
                        The Recycle Bin is empty.
                      </p>
                    </div>
                  </motion.div>
                ) : view === "list" ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full min-w-max"
                  >
                    <div className="flex crt sticky top-0 bg-[#c0c0c0] border-b border-[#808080] text-[10px] font-bold z-10">
                      {(
                        [
                          "Name|flex-1 min-w-[200px]",
                          "Location|w-48",
                          "Deleted|w-28",
                          "Size|w-20 text-right pr-3",
                        ] as const
                      ).map((col) => {
                        const [h, cls] = col.split("|");
                        return (
                          <div
                            key={h}
                            className={cn(
                              "px-2 py-1 border-r border-[#808080]",
                              cls,
                            )}
                          >
                            {h}
                          </div>
                        );
                      })}
                    </div>

                    {items.map((item, idx) => {
                      const isSel = selected.has(item.id);
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: 16,
                            transition: { duration: 0.12 },
                          }}
                          transition={{ duration: 0.1, delay: idx * 0.01 }}
                          className={cn(
                            "flex items-center border-b border-gray-100 cursor-default",
                            isSel
                              ? "bg-[#010f80] text-white"
                              : "hover:bg-[#e8e8ff] text-black",
                          )}
                          onClick={(e) => handleSelect(item.id, e)}
                          onDoubleClick={restore}
                        >
                          <div className="flex items-center gap-1.5 flex-1 min-w-[200px] px-2 py-1 overflow-hidden">
                            <FileIconSmall ext={item.ext} selected={isSel} />
                            <span className="truncate text-[11px]">
                              {item.name}.{item.ext}
                            </span>
                          </div>
                          <div className="w-48 px-2 py-1 truncate text-[10px] border-l border-gray-100">
                            {item.location}
                          </div>
                          <div className="w-28 px-2 py-1 text-[10px] border-l border-gray-100">
                            {item.deletedOn}
                          </div>
                          <div className="w-20 px-2 py-1 text-right text-[10px] border-l border-gray-100 pr-3">
                            {item.size}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    key="icons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-1 content-start"
                    onClick={(e) => {
                      if (e.target === e.currentTarget) clearSel();
                    }}
                  >
                    {items.map((item, idx) => {
                      const isSel = selected.has(item.id);
                      return (
                        <motion.button
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{
                            opacity: 0,
                            scale: 0.6,
                            transition: { duration: 0.1 },
                          }}
                          transition={{ duration: 0.1, delay: idx * 0.015 }}
                          className={cn(
                            "flex flex-col items-center gap-1 px-1 py-2 cursor-default text-center",
                            isSel
                              ? "bg-[#010f80] text-white"
                              : "hover:bg-[#e8e8ff] text-black",
                          )}
                          onClick={(e) => handleSelect(item.id, e as never)}
                          onDoubleClick={restore}
                        >
                          <FileIconBig
                            ext={item.ext}
                            selected={isSel}
                            item={item}
                          />
                          <span className="text-[9px] leading-tight line-clamp-2 max-w-[72px] break-all">
                            {item.name}.{item.ext}
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <FolderFooterMessage
            folderName={
              selected.size > 0
                ? `${selected.size} object(s) selected`
                : isEmpty
                  ? "Recycle Bin is empty"
                  : `${items.length} object(s) — ${fmtTotal}`
            }
            icon={
              isEmpty
                ? "/icons/recycle-bin-empty.png"
                : "/icons/recycle-bin-full.png"
            }
          />
        </div>
      </WindowWrapper>
    </>
  );
}
