"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import WindowWrapper from "@/components/shared/window-wrapper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import IENavigationMenu from "./ie-navigation-menu";
import IEInternalNavigation from "./ie-internal-navigation";
import { ToolbarButton } from "./toolbar-button";

interface HistoryEntry {
  url: string;
  title: string;
}
interface Favorite {
  label: string;
  url: string;
}

const DEFAULT_FAVORITES: Favorite[] = [
  {
    label: "MSN.com",
    url: "https://web.archive.org/web/19991128100812/http://www.msn.com/",
  },
  {
    label: "Hotmail",
    url: "https://web.archive.org/web/19981212014558/http://hotmail.com/",
  },
  {
    label: "Yahoo!",
    url: "https://web.archive.org/web/19981212034415/http://www9.yahoo.com/",
  },
  {
    label: "AltaVista Search",
    url: "https://web.archive.org/web/19990125093146/http://www.altavista.com/",
  },
  {
    label: "Wikipedia",
    url: "https://web.archive.org/web/20010808121638/http://www.wikipedia.org/",
  },
  {
    label: "The Verge",
    url: "https://web.archive.org/web/20000520024911/http://www.theverge.com/",
  },
  {
    label: "Hacker News",
    url: "https://web.archive.org/web/20070221033032/http://news.ycombinator.com/",
  },
  {
    label: "Archive.org",
    url: "https://web.archive.org/web/19980109140106/http://archive.org/",
  },
];

const raised =
  "border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080]";
const sunken =
  "border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white";
const inset1 =
  "border border-t-[#808080] border-l-[#808080] border-b-white border-r-white";

const ErrorPage = ({
  url,
  onOpenTab,
}: {
  url: string;
  onOpenTab: () => void;
}) => (
  <div className="w-full h-full bg-white p-6 font-sans overflow-auto">
    <div className="flex items-start gap-4 mb-4">
      <div className="text-4xl mt-1">🚫</div>
      <div>
        <h2 className="text-lg font-bold text-[#000080] mb-1">
          The page cannot be displayed
        </h2>
        <p className="text-sm text-gray-800 mb-3">
          The page you are looking for is currently unavailable. The website
          might be experiencing technical difficulties, or you may need to
          adjust your browser settings.
        </p>
        <hr className="border-gray-400 mb-3" />
        <p className="text-sm font-bold mb-1">Please try the following:</p>
        <ul className="text-sm list-disc ml-5 space-y-1 text-gray-700">
          <li>
            Click the <strong>Refresh</strong> button, or try again later.
          </li>
          <li>
            If you typed the page address in the Address bar, make sure that it
            is spelled correctly.
          </li>
          <li>
            This site may be blocking embedded display.{" "}
            <button
              onClick={onOpenTab}
              className="text-[#0000EE] underline cursor-pointer hover:text-[#551A8B]"
            >
              Open in new tab
            </button>{" "}
            to view it directly.
          </li>
        </ul>
        <hr className="border-gray-400 mt-4 mb-3" />
        <p className="text-xs text-gray-500">
          Cannot find server or DNS Error
          <br />
          <span className="text-[#0000EE]">{url}</span>
        </p>
      </div>
    </div>
  </div>
);

const Homepage = ({ onNavigate }: { onNavigate: (url: string) => void }) => (
  <div
    className="w-full h-full overflow-auto"
    style={{
      background: "linear-gradient(to bottom, #d4e8ff 0%, #ffffff 40%)",
    }}
  >
    <div className="max-w-2xl mx-auto p-6 h-full">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#0066CC]">
        <Image
          src="/icons/internet-explorer.png"
          alt="Internet Explorer Logo"
          width={48}
          height={48}
        />
        <div>
          <div
            className="text-2xl font-bold text-[#000080]"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Internet Explorer
          </div>
          <div className="text-sm text-gray-600">Version 5.0 — Start Page</div>
        </div>
      </div>

      <div className="bg-[#fffbe6] border-2 border-[#ccaa00] p-4 mb-4 rounded">
        <div className="text-sm font-bold text-[#000080] mb-2">
          🔍 Search the Web
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-[#808080] px-2 py-1 text-sm outline-none focus:border-[#000080]"
            placeholder="Search with Bing..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const q = (e.target as HTMLInputElement).value.trim();
                if (q)
                  onNavigate(
                    `https://www2.bing.com/search?q=${encodeURIComponent(q)}`,
                  );
              }
            }}
          />
          <button
            className={cn(
              raised,
              "bg-[#c0c0c0] px-3 py-1 text-sm cursor-default active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white",
            )}
            onClick={(e) => {
              const inp = e.currentTarget
                .previousElementSibling as HTMLInputElement;
              const q = inp?.value?.trim();
              if (q)
                onNavigate(
                  `https://www2.bing.com/search?q=${encodeURIComponent(q)}`,
                );
            }}
          >
            Go
          </button>
        </div>
      </div>

      <div className="bg-white border-2 border-[#808080] p-4 mb-4">
        <div className="text-sm font-bold text-[#000080] mb-3">
          ⭐ Favorites
        </div>
        <div className="grid grid-cols-2 gap-1">
          {DEFAULT_FAVORITES.map((f) => (
            <button
              key={f.url}
              onClick={() => onNavigate(f.url)}
              className="flex items-center gap-2 text-[#0000EE] text-sm text-left hover:underline p-1 hover:bg-[#e8f0ff] cursor-default"
            >
              <Image
                src="/icons/internet-explorer.png"
                alt="Internet Explorer Logo"
                width={14}
                height={14}
              />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#f0f0f0] border border-[#808080] p-3">
        <div className="text-xs font-bold text-[#000080] mb-1">
          💡 Did You Know?
        </div>
        <p className="text-xs text-gray-700">
          Some modern websites cannot be displayed inside Internet Explorer due
          to security restrictions. Use the{" "}
          <strong>`&quot;`Open in new tab`&quot;`</strong> button on the error
          page, or type any URL in the address bar above.
        </p>
      </div>
    </div>
  </div>
);

export default function InternetExplorer() {
  const [addressInput, setAddressInput] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("Internet Explorer");
  const [status, setStatus] = useState("Done");
  const [loading, setLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>(DEFAULT_FAVORITES);
  const [showFavDialog, setShowFavDialog] = useState(false);
  const [favLabel, setFavLabel] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isHome, setIsHome] = useState(true);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const normalizeUrl = (raw: string): string => {
    const trimmed = raw.trim();
    if (!trimmed) return "";
    if (!trimmed.includes(".") && !trimmed.startsWith("http")) {
      return `https://www2.bing.com/search?q=${encodeURIComponent(trimmed)}`;
    }
    if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
    return trimmed;
  };

  const startProgress = () => {
    setLoadProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 85) {
          clearInterval(progressRef.current!);
          return p;
        }
        return p + Math.random() * 12;
      });
    }, 180);
  };

  const finishProgress = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    setLoadProgress(100);
    setTimeout(() => setLoadProgress(0), 400);
  };

  const navigate = useCallback(
    (raw: string) => {
      const url = normalizeUrl(raw);
      if (!url) return;

      setCurrentUrl(url);
      setAddressInput(url);
      setIframeError(false);
      setLoading(true);
      setIsHome(false);
      setStatus(`Connecting to ${new URL(url).hostname}...`);
      setActiveMenu(null);
      startProgress();

      setHistory((prev) => {
        const cut = prev.slice(0, historyIdx + 1);
        const next = [...cut, { url, title: url }];
        setHistoryIdx(next.length - 1);
        return next;
      });
    },
    [historyIdx],
  );

  const goHome = () => {
    setIsHome(true);
    setCurrentUrl("");
    setAddressInput("");
    setPageTitle("Internet Explorer");
    setStatus("Done");
    setIframeError(false);
    setLoading(false);
    finishProgress();
  };

  const goBack = () => {
    if (historyIdx <= 0) return;
    const newIdx = historyIdx - 1;
    setHistoryIdx(newIdx);
    const entry = history[newIdx];
    setCurrentUrl(entry.url);
    setAddressInput(entry.url);
    setIframeError(false);
    setLoading(true);
    setIsHome(false);
    startProgress();
  };

  const goForward = () => {
    if (historyIdx >= history.length - 1) return;
    const newIdx = historyIdx + 1;
    setHistoryIdx(newIdx);
    const entry = history[newIdx];
    setCurrentUrl(entry.url);
    setAddressInput(entry.url);
    setIframeError(false);
    setLoading(true);
    setIsHome(false);
    startProgress();
  };

  const refresh = () => {
    if (isHome) return;
    setIframeError(false);
    setLoading(true);
    setStatus("Refreshing...");
    startProgress();
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };

  const stop = () => {
    setLoading(false);
    setStatus("Done");
    finishProgress();
    if (iframeRef.current) iframeRef.current.src = "about:blank";
    setIframeError(true);
  };

  const handleIframeLoad = () => {
    setLoading(false);
    setStatus("Done");
    finishProgress();
    try {
      const t = iframeRef.current?.contentDocument?.title;
      if (t) {
        setPageTitle(`${t} - Internet Explorer`);
        setHistory((prev) =>
          prev.map((e, i) => (i === historyIdx ? { ...e, title: t } : e)),
        );
      }
    } catch {}
  };

  const handleIframeError = () => {
    setLoading(false);
    setIframeError(true);
    setStatus("Done");
    finishProgress();
  };

  const handleAddressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") navigate(addressInput);
  };

  const addFavorite = () => {
    setFavLabel(pageTitle.replace(" - Internet Explorer", "") || currentUrl);
    setShowFavDialog(true);
    setActiveMenu(null);
  };
  const confirmFavorite = () => {
    if (currentUrl)
      setFavorites((f) => [...f, { label: favLabel, url: currentUrl }]);
    setShowFavDialog(false);
  };

  useEffect(
    () => () => {
      if (progressRef.current) clearInterval(progressRef.current);
    },
    [],
  );

  const canBack = historyIdx > 0;
  const canForward = historyIdx < history.length - 1;

  return (
    <WindowWrapper
      id={10}
      title={pageTitle}
      icon="/icons/internet-explorer.png"
      controls={{ close: true, minimize: true, maximize: true }}
      className="!w-[900px] "
    >
      <div
        className="flex flex-col w-full h-full bg-[#c0c0c0] select-none overflow-hidden"
        style={{ fontFamily: "Arial, sans-serif", fontSize: 12 }}
        onClick={() => setActiveMenu(null)}
      >
        {/* ── Menu bar ──────────────────────────────────────────────────── */}
        <div className="border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0 px-1 py-0.5">
          <IENavigationMenu
            currentUrl={currentUrl}
            canBack={canBack}
            canForward={canForward}
            favorites={favorites}
            onBack={goBack}
            onForward={goForward}
            onRefresh={refresh}
            onStop={stop}
            onHome={goHome}
            onNavigate={navigate}
            onAddFavorite={addFavorite}
            onOrganizeFavorites={() => setShowFavorites((v) => !v)}
            onViewSource={() =>
              currentUrl && window.open(`view-source:${currentUrl}`)
            }
            onPrint={() => window.print()}
            onProperties={() => alert(`URL: ${currentUrl || "about:blank"}`)}
            onClose={() => window.close()}
            onAbout={() =>
              alert("Internet Explorer\nVersion 5.00.2614.3500\n\n© 1995-1999")
            }
          />
        </div>

        <div className="flex items-center px-1 py-0.5 gap-0.5 border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0">
          <IEInternalNavigation
            canBack={canBack}
            canForward={canForward}
            loading={loading}
            onBack={goBack}
            onForward={goForward}
            onStop={stop}
            onRefresh={refresh}
            onHome={goHome}
          />

          <div className="w-px h-8 bg-[#808080] mx-1" />

          <ToolbarButton
            onClick={() =>
              navigate(
                `https://www2.bing.com/search?q=${encodeURIComponent(pageTitle.replace(" - Internet Explorer", ""))}`,
              )
            }
            title="Search"
          >
            <svg width="20" height="16" viewBox="0 0 20 16">
              <circle
                cx="8"
                cy="7"
                r="5"
                fill="none"
                stroke="#000080"
                strokeWidth="1.5"
              />
              <line
                x1="12"
                y1="11"
                x2="18"
                y2="15"
                stroke="#000080"
                strokeWidth="2"
              />
            </svg>
            <span>Search</span>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => setShowFavorites((v) => !v)}
            title="Favorites"
            wide
          >
            <svg width="20" height="16" viewBox="0 0 20 16">
              <path
                d="M10 2l2 5h5l-4 3 1.5 5L10 12l-4.5 3L7 10 3 7h5z"
                fill="#c8a000"
              />
            </svg>
            <span>Favorites</span>
          </ToolbarButton>

          <ToolbarButton title="History" wide>
            <svg width="20" height="16" viewBox="0 0 20 16">
              <circle
                cx="10"
                cy="8"
                r="6"
                fill="none"
                stroke="#800080"
                strokeWidth="1.5"
              />
              <polyline
                points="10,4 10,8 13,10"
                stroke="#800080"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <span>History</span>
          </ToolbarButton>

          <div className="ml-auto mr-1 flex-shrink-0">
            <Image
              src="/icons/internet-explorer.png"
              alt="Internet Explorer Logo"
              width={28}
              height={28}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 px-2 py-1 border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0">
          <span className="text-xs font-bold whitespace-nowrap">Address</span>
          <div
            className={cn(
              sunken,
              "flex-1 flex items-center bg-white px-1 gap-1",
            )}
          >
            {currentUrl && !isHome && (
              <Image
                src="/icons/internet-explorer.png"
                alt="Internet Explorer Logo"
                width={14}
                height={14}
              />
            )}
            <input
              className="flex-1 outline-none text-xs py-0.5 bg-white font-mono"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyDown={handleAddressKey}
              onFocus={(e) => e.target.select()}
              placeholder="Type a web address or search term and press Enter"
              spellCheck={false}
            />
          </div>
          <button
            onClick={() => navigate(addressInput)}
            className={cn(
              raised,
              "bg-[#c0c0c0] px-3 py-0.5 text-xs cursor-default active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white",
            )}
          >
            Go
          </button>
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {showFavorites && (
            <div className="w-48 flex-shrink-0 border-r-2 border-[#808080] bg-[#c0c0c0] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-2 py-1 bg-[#000080] text-white text-xs font-bold flex-shrink-0">
                <span>Favorites</span>
                <button
                  onClick={() => setShowFavorites(false)}
                  className="hover:bg-[#0000cc] px-1"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto bg-white">
                {favorites.map((f, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(f.url)}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs cursor-default hover:bg-[#000080] hover:text-white border-b border-gray-100"
                  >
                    <Image
                      src="/icons/internet-explorer.png"
                      alt="Internet Explorer Logo"
                      width={12}
                      height={12}
                    />
                    <span className="truncate">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 relative overflow-hidden bg-white">
            {isHome ? (
              <Homepage onNavigate={navigate} />
            ) : iframeError ? (
              <ErrorPage
                url={currentUrl}
                onOpenTab={() => window.open(currentUrl, "_blank")}
              />
            ) : (
              <iframe
                ref={iframeRef}
                src={currentUrl}
                className="w-full h-full border-none"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="browser-content"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            )}

            {loading && !iframeError && !isHome && (
              <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center pointer-events-none">
                <div className="text-[#000080] text-sm font-bold animate-pulse">
                  Loading...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-[#808080]">
          {loadProgress > 0 && (
            <div className="h-1 bg-[#c0c0c0]">
              <div
                className="h-full bg-[#000080] transition-all duration-150"
                style={{ width: `${Math.min(100, loadProgress)}%` }}
              />
            </div>
          )}

          <div className="flex items-center px-1 gap-1 bg-[#c0c0c0] h-5">
            <div className={cn(inset1, "flex-1 px-1 text-[10px] truncate")}>
              {status}
            </div>
            <div
              className={cn(
                inset1,
                "w-32 px-1 text-[10px] truncate text-center",
              )}
            >
              {currentUrl ? new URL(currentUrl).hostname : ""}
            </div>
            <div
              className={cn(
                inset1,
                "w-24 px-1 text-[10px] flex items-center gap-1",
              )}
            >
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path
                  d="M5 0a5 5 0 1 0 0 10A5 5 0 0 0 5 0zm0 2a2 2 0 0 1 0 6 2 2 0 0 1 0-6z"
                  fill="#808080"
                />
              </svg>
              Internet
            </div>
          </div>
        </div>

        {showFavDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div
              className="bg-[#c0c0c0] w-80"
              style={{
                border: "2px solid",
                borderColor: "white #808080 #808080 white",
                boxShadow: "3px 3px 0 #000",
              }}
            >
              <div
                className="flex items-center justify-between px-2 py-1"
                style={{
                  background: "linear-gradient(to right, #000080, #1084d0)",
                  height: 22,
                }}
              >
                <span className="text-white text-xs font-bold flex items-center gap-1">
                  <Image
                    src="/icons/internet-explorer.png"
                    alt="Internet Explorer Logo"
                    width={12}
                    height={12}
                  />{" "}
                  Add Favorite
                </span>
                <button
                  onClick={() => setShowFavDialog(false)}
                  className="text-white text-xs px-1 hover:bg-[#0000cc]"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs mb-3">
                  This will add the page to your Favorites.
                </p>
                <label className="text-xs block mb-1">Name:</label>
                <input
                  className={cn(
                    sunken,
                    "w-full px-1 py-0.5 text-xs outline-none mb-4 bg-white",
                  )}
                  value={favLabel}
                  onChange={(e) => setFavLabel(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && confirmFavorite()}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={confirmFavorite}
                    className={cn(
                      raised,
                      "bg-[#c0c0c0] px-6 py-0.5 text-xs cursor-default",
                    )}
                  >
                    OK
                  </button>
                  <button
                    onClick={() => setShowFavDialog(false)}
                    className={cn(
                      raised,
                      "bg-[#c0c0c0] px-4 py-0.5 text-xs cursor-default",
                    )}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </WindowWrapper>
  );
}
