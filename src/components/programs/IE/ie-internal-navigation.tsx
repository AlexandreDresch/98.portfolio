import Image from "next/image";
import { useState } from "react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";

interface Favorite {
  label: string;
  url: string;
}

interface HistoryEntry {
  url: string;
  title: string;
}

interface IEInternalNavigationProps {
  canBack: boolean;
  canForward: boolean;
  loading: boolean;
  favorites: Favorite[];
  history: HistoryEntry[];
  onBack: () => void;
  onForward: () => void;
  onStop: () => void;
  onRefresh: () => void;
  onHome: () => void;
  onNavigate: (url: string) => void;
  onRemoveFavorite?: (index: number) => void;
}

type Panel = "search" | "favorites" | "history" | null;

function SidePanel({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full border-r-2 border-[#808080] bg-[#c0c0c0] w-56 flex-shrink-0 overflow-hidden">
      <div className="flex items-center justify-between px-2 py-1 bg-[#000080] text-white text-xs font-bold flex-shrink-0">
        <span>{title}</span>
        <button
          onClick={onClose}
          className="hover:bg-[#0000cc] px-1 leading-none"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-white">{children}</div>
    </div>
  );
}

function NavBtn({
  src,
  alt,
  label,
  disabled,
  active,
  onClick,
}: {
  src: string;
  alt: string;
  label: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white",
        active && "border-black border-t-white border-l-white bg-[#d4d0c8]",
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <Image width={24} height={24} alt={alt} src={src} className="w-6 h-auto" />
      <span className="text-xs">{label}</span>
    </Button>
  );
}

export default function IEInternalNavigation({
  canBack,
  canForward,
  loading,
  favorites,
  history,
  onBack,
  onForward,
  onStop,
  onRefresh,
  onHome,
  onNavigate,
  onRemoveFavorite,
}: IEInternalNavigationProps) {
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePanel = (panel: Panel) =>
    setActivePanel((prev) => (prev === panel ? null : panel));

  const handleNavigate = (url: string) => {
    onNavigate(url);
    setActivePanel(null);
  };

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    handleNavigate(`https://www2.bing.com/search?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <NavBtn
          src="/arrow-left.svg"
          alt="Go back"
          label="Back"
          disabled={!canBack}
          onClick={onBack}
        />
        <NavBtn
          src="/arrow-right.svg"
          alt="Go forward"
          label="Forward"
          disabled={!canForward}
          onClick={onForward}
        />
        <NavBtn
          src="/icons/x.png"
          alt="Stop"
          label="Stop"
          disabled={!loading}
          onClick={onStop}
        />
        <NavBtn
          src="/icons/refresh.png"
          alt="Refresh"
          label="Refresh"
          onClick={onRefresh}
        />
        <NavBtn src="/icons/homepage.png" alt="Home" label="Home" onClick={onHome} />

        <div className="w-px h-8 bg-[#808080] mx-1" />

        <NavBtn
          src="/icons/search.png"
          alt="Search"
          label="Search"
          active={activePanel === "search"}
          onClick={() => togglePanel("search")}
        />
        <NavBtn
          src="/icons/star.png"
          alt="Favorites"
          label="Favorites"
          active={activePanel === "favorites"}
          onClick={() => togglePanel("favorites")}
        />
        <NavBtn
          src="/icons/history.png"
          alt="History"
          label="History"
          active={activePanel === "history"}
          onClick={() => togglePanel("history")}
        />
      </div>

      {activePanel !== null && (
        <div className="absolute top-0 left-0 h-full z-20 flex">
          {activePanel === "search" && (
            <SidePanel title="Search" onClose={() => setActivePanel(null)}>
              <div className="p-3 border-b border-gray-200">
                <p className="text-[10px] text-gray-600 mb-2 font-bold">
                  Search the Web
                </p>
                <input
                  autoFocus
                  className="w-full border border-[#808080] px-2 py-1 text-xs outline-none focus:border-[#000080] mb-2"
                  placeholder="Enter search terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="w-full bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-xs py-0.5 cursor-default hover:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
                >
                  Search
                </button>
              </div>

              <div className="p-3">
                <p className="text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-wide">
                  Quick Links
                </p>
                {[
                  { label: "Google", url: "https://www.google.com" },
                  { label: "Bing", url: "https://www.bing.com" },
                  { label: "Yahoo! Search", url: "https://search.yahoo.com" },
                  { label: "DuckDuckGo", url: "https://duckduckgo.com" },
                ].map((s) => (
                  <button
                    key={s.url}
                    onClick={() => handleNavigate(s.url)}
                    className="flex items-center gap-1.5 w-full px-1 py-1 text-xs text-[#0000EE] text-left hover:bg-[#000080] hover:text-white border-b border-gray-100 cursor-default"
                  >
                    <span className="text-[10px]">🔍</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </SidePanel>
          )}

          {activePanel === "favorites" && (
            <SidePanel title="Favorites" onClose={() => setActivePanel(null)}>
              {favorites.length === 0 ? (
                <div className="p-4 text-xs text-gray-400 text-center">
                  No favorites saved yet.
                </div>
              ) : (
                favorites.map((f, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-1.5 px-2 py-1 text-xs border-b border-gray-100 hover:bg-[#000080] hover:text-white cursor-default"
                    onClick={() => handleNavigate(f.url)}
                  >
                    <Image
                      src="/icons/internet-explorer.png"
                      alt="Favorite"
                      width={12}
                      height={12}
                      className="flex-shrink-0"
                    />
                    <span className="flex-1 truncate">{f.label}</span>
                    {onRemoveFavorite && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(i);
                        }}
                        className="hidden group-hover:block text-white hover:text-red-300 px-0.5 text-[10px] leading-none"
                        title="Remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))
              )}
            </SidePanel>
          )}

          {activePanel === "history" && (
            <SidePanel title="History" onClose={() => setActivePanel(null)}>
              {history.length === 0 ? (
                <div className="p-4 text-xs text-gray-400 text-center">
                  No history yet.
                </div>
              ) : (
                <>
                  <div className="px-2 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wide border-b border-gray-200 bg-gray-50">
                    Today
                  </div>
                  {[...history].reverse().map((entry, i) => {
                    let hostname = entry.url;
                    try {
                      hostname = new URL(entry.url).hostname;
                    } catch {}
                    const displayTitle =
                      entry.title && entry.title !== entry.url
                        ? entry.title
                        : hostname;
                    return (
                      <div
                        key={i}
                        className="group flex items-center gap-1.5 px-2 py-1 text-xs border-b border-gray-100 hover:bg-[#000080] hover:text-white cursor-default"
                        onClick={() => handleNavigate(entry.url)}
                        title={entry.url}
                      >
                        <Image
                          src="/icons/internet-explorer.png"
                          alt="History entry"
                          width={12}
                          height={12}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="truncate font-medium">
                            {displayTitle}
                          </div>
                          <div className="truncate text-[10px] text-gray-400 group-hover:text-blue-200">
                            {hostname}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </SidePanel>
          )}
        </div>
      )}
    </>
  );
}
