"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import WindowWrapper from "@/components/shared/window-wrapper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import IENavigationMenu from "./ie-navigation-menu";
import IEInternalNavigation from "./ie-internal-navigation";

interface HistoryEntry {
  url: string;
  title: string;
}
interface Favorite {
  label: string;
  url: string;
}
interface Tab {
  id: number;
  url: string;
  title: string;
  addressInput: string;
  isHome: boolean;
  loading: boolean;
  iframeError: boolean;
  history: HistoryEntry[];
  historyIdx: number;
}

let TAB_ID_COUNTER = 1;

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
    label: "AltaVista",
    url: "https://web.archive.org/web/19990125093146/http://www.altavista.com/",
  },
  {
    label: "Wikipedia",
    url: "https://web.archive.org/web/20010808121638/http://www.wikipedia.org/",
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

function makeTab(overrides: Partial<Tab> = {}): Tab {
  return {
    id: TAB_ID_COUNTER++,
    url: "",
    title: "New Tab",
    addressInput: "",
    isHome: true,
    loading: false,
    iframeError: false,
    history: [],
    historyIdx: -1,
    ...overrides,
  };
}

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
          The page you are looking for is currently unavailable.
        </p>
        <hr className="border-gray-400 mb-3" />
        <ul className="text-sm list-disc ml-5 space-y-1 text-gray-700">
          <li>
            Click <strong>Refresh</strong> or try again later.
          </li>
          <li>Check the address for spelling errors.</li>
          <li>
            This site may block embedded display.{" "}
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
          alt="IE"
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
              "bg-[#c0c0c0] px-3 py-1 text-sm cursor-default",
            )}
            onClick={(e) => {
              const q = (
                e.currentTarget.previousElementSibling as HTMLInputElement
              )?.value?.trim();
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
                alt=""
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
          Some modern websites block embedded display. Use{" "}
          <strong>&quot;Open in new tab&quot;</strong> on the error page, or
          press <kbd className="bg-gray-200 px-1">Ctrl+T</kbd> to open a new
          tab.
        </p>
      </div>
    </div>
  </div>
);

function TabBar({
  tabs,
  activeId,
  onSelect,
  onClose,
  onNew,
}: {
  tabs: Tab[];
  activeId: number;
  onSelect: (id: number) => void;
  onClose: (id: number) => void;
  onNew: () => void;
}) {
  return (
    <div className="flex items-end bg-[#c0c0c0] border-b border-[#808080] overflow-x-auto flex-shrink-0 pt-1 gap-0.5">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <div
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 cursor-default text-xs max-w-[160px] min-w-[80px] flex-shrink-0 select-none",
              isActive
                ? "bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#c0c0c0] border-r-[#808080] -mb-px z-10 relative crt"
                : "bg-[#a8a8a8] border-2 border-t-[#d0d0d0] border-l-[#d0d0d0] border-b-[#808080] border-r-[#808080] hover:bg-[#b8b8b8]",
            )}
          >
            <Image
              src="/icons/internet-explorer.png"
              alt=""
              width={12}
              height={12}
              className="flex-shrink-0"
            />
            <span className="truncate flex-1">{tab.title}</span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(tab.id);
                }}
                className={cn(
                  "flex-shrink-0 w-3.5 h-3.5 flex items-center justify-center text-[9px] leading-none hover:bg-[#cc0000] hover:text-white rounded-none ml-0.5",
                  isActive ? "text-[#444]" : "text-[#666]",
                )}
              >
                ✕
              </button>
            )}
          </div>
        );
      })}
      <button
        onClick={onNew}
        title="New Tab (Ctrl+T)"
        className="flex-shrink-0 px-2 py-1 text-xs border-2 border-transparent hover:border-t-white hover:border-l-white hover:border-b-[#808080] hover:border-r-[#808080] hover:bg-[#b8b8b8] cursor-default"
      >
        +
      </button>
    </div>
  );
}

export default function InternetExplorer() {
  const [tabs, setTabs] = useState<Tab[]>([makeTab()]);
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [favorites, setFavorites] = useState<Favorite[]>(DEFAULT_FAVORITES);
  const [showFavDialog, setShowFavDialog] = useState(false);
  const [favLabel, setFavLabel] = useState("");
  const [loadProgress, setLoadProgress] = useState(0);
  const [status, setStatus] = useState("Done");

  const iframeRefs = useRef<Map<number, HTMLIFrameElement | null>>(new Map());
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  const updateTab = useCallback((id: number, patch: Partial<Tab>) => {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

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

  useEffect(
    () => () => {
      if (progressRef.current) clearInterval(progressRef.current);
    },
    [],
  );

  const normalizeUrl = (raw: string): string => {
    const t = raw.trim();
    if (!t) return "";
    if (!t.includes(".") && !t.startsWith("http"))
      return `https://www2.bing.com/search?q=${encodeURIComponent(t)}`;
    if (!/^https?:\/\//i.test(t)) return `https://${t}`;
    return t;
  };

  const navigateTab = useCallback((tabId: number, raw: string) => {
    const url = normalizeUrl(raw);
    if (!url) return;
    setTabs((prev) =>
      prev.map((t) => {
        if (t.id !== tabId) return t;
        const cut = t.history.slice(0, t.historyIdx + 1);
        const newHistory = [...cut, { url, title: url }];
        return {
          ...t,
          url,
          addressInput: url,
          isHome: false,
          loading: true,
          iframeError: false,
          history: newHistory,
          historyIdx: newHistory.length - 1,
        };
      }),
    );
    setStatus(`Connecting to ${new URL(url).hostname}...`);
    startProgress();
  }, []);

  const navigate = useCallback(
    (url: string) => navigateTab(activeTabId, url),
    [activeTabId, navigateTab],
  );

  const openNewTab = useCallback((url?: string) => {
    const tab = makeTab(
      url ? { url, addressInput: url, isHome: false, loading: true } : {},
    );
    setTabs((prev) => [...prev, tab]);
    setActiveTabId(tab.id);
    if (url) {
      setStatus(`Connecting to ${new URL(url).hostname}...`);
      startProgress();
    }
  }, []);

  const closeTab = useCallback(
    (id: number) => {
      setTabs((prev) => {
        if (prev.length === 1) return prev;
        const idx = prev.findIndex((t) => t.id === id);
        const next = prev.filter((t) => t.id !== id);
        if (id === activeTabId) {
          const newActive = next[Math.max(0, idx - 1)];
          setActiveTabId(newActive.id);
        }
        return next;
      });
    },
    [activeTabId],
  );

  const goBack = () => {
    const t = activeTab;
    if (t.historyIdx <= 0) return;
    const newIdx = t.historyIdx - 1;
    const entry = t.history[newIdx];
    updateTab(t.id, {
      url: entry.url,
      addressInput: entry.url,
      historyIdx: newIdx,
      isHome: false,
      loading: true,
      iframeError: false,
    });
    startProgress();
  };

  const goForward = () => {
    const t = activeTab;
    if (t.historyIdx >= t.history.length - 1) return;
    const newIdx = t.historyIdx + 1;
    const entry = t.history[newIdx];
    updateTab(t.id, {
      url: entry.url,
      addressInput: entry.url,
      historyIdx: newIdx,
      isHome: false,
      loading: true,
      iframeError: false,
    });
    startProgress();
  };

  const refresh = () => {
    if (activeTab.isHome) return;
    updateTab(activeTab.id, { iframeError: false, loading: true });
    setStatus("Refreshing...");
    startProgress();
    const iframe = iframeRefs.current.get(activeTab.id);
    if (iframe) iframe.src = activeTab.url;
  };

  const stop = () => {
    updateTab(activeTab.id, { loading: false, iframeError: true });
    setStatus("Done");
    finishProgress();
    const iframe = iframeRefs.current.get(activeTab.id);
    if (iframe) iframe.src = "about:blank";
  };

  const goHome = () => {
    updateTab(activeTab.id, {
      isHome: true,
      url: "",
      addressInput: "",
      loading: false,
      iframeError: false,
      title: "New Tab",
    });
    setStatus("Done");
    finishProgress();
  };

  const handleIframeLoad = (tabId: number) => {
    const iframe = iframeRefs.current.get(tabId);
    let title = "";
    try {
      title = iframe?.contentDocument?.title ?? "";
    } catch {}
    updateTab(tabId, {
      loading: false,
      iframeError: false,
      ...(title ? { title: title.slice(0, 30) } : {}),
    });
    if (tabId === activeTabId) {
      setStatus("Done");
      finishProgress();
    }
  };

  const handleIframeError = (tabId: number) => {
    updateTab(tabId, { loading: false, iframeError: true });
    if (tabId === activeTabId) {
      setStatus("Done");
      finishProgress();
    }
  };

  const setAddressInput = (v: string) =>
    updateTab(activeTab.id, { addressInput: v });

  const addFavorite = () => {
    setFavLabel(
      activeTab.title !== "New Tab" ? activeTab.title : activeTab.url,
    );
    setShowFavDialog(true);
  };
  const confirmFavorite = () => {
    if (activeTab.url)
      setFavorites((f) => [...f, { label: favLabel, url: activeTab.url }]);
    setShowFavDialog(false);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === "t") {
        e.preventDefault();
        openNewTab();
      }
      if (ctrl && e.key === "w") {
        e.preventDefault();
        closeTab(activeTabId);
      }
      if (ctrl && e.key.match(/^[1-9]$/)) {
        e.preventDefault();
        const idx = parseInt(e.key) - 1;
        if (tabs[idx]) setActiveTabId(tabs[idx].id);
      }
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        goBack();
      }
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        goForward();
      }
      if (e.altKey && e.key === "Home") {
        e.preventDefault();
        goHome();
      }
      if (e.key === "F5") {
        e.preventDefault();
        refresh();
      }
      if (e.key === "Escape") stop();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabId, tabs, activeTab]);

  const canBack = activeTab.historyIdx > 0;
  const canForward = activeTab.historyIdx < activeTab.history.length - 1;

  return (
    <WindowWrapper
      id={10}
      title={
        activeTab.title !== "New Tab"
          ? `${activeTab.title} - Internet Explorer`
          : "Internet Explorer"
      }
      icon="/icons/internet-explorer.png"
      controls={{ close: true, minimize: true, maximize: true }}
      className="!w-[900px]"
    >
      <div
        className="flex flex-col w-full h-full bg-[#c0c0c0] select-none overflow-hidden"
        style={{ fontFamily: "Arial, sans-serif", fontSize: 12 }}
      >
        <div className="border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0 px-1 py-0.5">
          <IENavigationMenu
            currentUrl={activeTab.url}
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
            onOrganizeFavorites={() => {}}
            onViewSource={() =>
              activeTab.url && window.open(`view-source:${activeTab.url}`)
            }
            onPrint={() => window.print()}
            onProperties={() => alert(`URL: ${activeTab.url || "about:blank"}`)}
            onClose={() => closeTab(activeTabId)}
            onAbout={() =>
              alert("Internet Explorer\nVersion 5.00.2614.3500\n\n© 1995-1999")
            }
          />
        </div>

        <div className="flex items-center px-1 py-0.5 gap-0.5 border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0">
          <IEInternalNavigation
            canBack={canBack}
            canForward={canForward}
            loading={activeTab.loading}
            favorites={favorites}
            history={activeTab.history}
            onBack={goBack}
            onForward={goForward}
            onStop={stop}
            onRefresh={refresh}
            onHome={goHome}
            onNavigate={navigate}
            onRemoveFavorite={(i) =>
              setFavorites((f) => f.filter((_, idx) => idx !== i))
            }
          />
          <div className="ml-auto mr-1 flex-shrink-0">
            <Image
              src="/icons/internet-explorer.png"
              alt="IE"
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
            {activeTab.url && !activeTab.isHome && (
              <Image
                src="/icons/internet-explorer.png"
                alt=""
                width={14}
                height={14}
              />
            )}
            <input
              className="flex-1 outline-none text-xs py-0.5 bg-white font-mono"
              value={activeTab.addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(activeTab.addressInput);
              }}
              onFocus={(e) => e.target.select()}
              placeholder="Type a web address or search term and press Enter"
              spellCheck={false}
            />
          </div>
          <button
            onClick={() => navigate(activeTab.addressInput)}
            className={cn(
              raised,
              "bg-[#c0c0c0] px-3 py-0.5 text-xs cursor-default",
            )}
          >
            Go
          </button>
        </div>

        <TabBar
          tabs={tabs}
          activeId={activeTabId}
          onSelect={setActiveTabId}
          onClose={closeTab}
          onNew={() => openNewTab()}
        />

        <div className="flex-1 relative overflow-hidden bg-white">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "absolute inset-0",
                tab.id === activeTabId ? "block" : "hidden",
              )}
            >
              {tab.isHome ? (
                <Homepage onNavigate={navigate} />
              ) : tab.iframeError ? (
                <ErrorPage
                  url={tab.url}
                  onOpenTab={() => window.open(tab.url, "_blank")}
                />
              ) : (
                <iframe
                  ref={(el) => {
                    iframeRefs.current.set(tab.id, el);
                  }}
                  src={tab.url}
                  className="w-full h-full border-none"
                  onLoad={() => handleIframeLoad(tab.id)}
                  onError={() => handleIframeError(tab.id)}
                  title={`tab-${tab.id}`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              )}

              {tab.loading && !tab.iframeError && !tab.isHome && (
                <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center pointer-events-none">
                  <div className="text-[#000080] text-sm font-bold animate-pulse">
                    Loading...
                  </div>
                </div>
              )}
            </div>
          ))}
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
              {activeTab.url
                ? (() => {
                    try {
                      return new URL(activeTab.url).hostname;
                    } catch {
                      return "";
                    }
                  })()
                : ""}
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
            <div className={cn(inset1, "px-2 text-[10px] text-gray-500")}>
              {tabs.length} tab{tabs.length !== 1 ? "s" : ""}
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
                    alt=""
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
