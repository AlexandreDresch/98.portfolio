import { useAppDispatch } from "@/store/store";
import { setFooterMessage } from "@/store/footer-message-slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Checkmark from "../../shared/checkmark";
import { cn } from "@/lib/utils";

interface Favorite {
  label: string;
  url: string;
}

interface InternetNavigationMenuProps {
  currentUrl: string;
  canBack: boolean;
  canForward: boolean;
  favorites: Favorite[];
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
  onStop: () => void;
  onHome: () => void;
  onNavigate: (url: string) => void;
  onAddFavorite: () => void;
  onOrganizeFavorites: () => void;
  onViewSource: () => void;
  onPrint: () => void;
  onProperties: () => void;
  onClose: () => void;
  onAbout: () => void;
}

export default function IENavigationMenu({
  currentUrl,
  canBack,
  canForward,
  favorites,
  onBack,
  onForward,
  onRefresh,
  onStop,
  onHome,
  onNavigate,
  onAddFavorite,
  onOrganizeFavorites,
  onViewSource,
  onPrint,
  onProperties,
  onClose,
  onAbout,
}: InternetNavigationMenuProps) {
  const dispatch = useAppDispatch();

  function handleSetMessage(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    const textContent = Array.from(event.currentTarget.childNodes)
      .map(
        (node) =>
          (node as HTMLElement).innerText || (node as HTMLElement).textContent,
      )
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    dispatch(setFooterMessage(textContent));
  }

  const clearMessage = () => dispatch(setFooterMessage(""));

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          File
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="crt w-48 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={() =>
                  window.open(currentUrl || "about:blank", "_blank")
                }
              >
                New Window
              </DropdownMenuItem>
              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                Open...
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={() => currentUrl && window.open(currentUrl, "_blank")}
              >
                Save As...
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button flex justify-between"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onPrint}
              >
                <span>Print...</span>
                <span>Ctrl+P</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onProperties}
              >
                Properties
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onClose}
              >
                Close
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          Edit
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="crt w-40 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button flex justify-between"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={() => navigator.clipboard?.writeText(currentUrl)}
              >
                <span>Copy</span>
                <span>Ctrl+C</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled flex justify-between"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                <span>Paste</span>
                <span>Ctrl+V</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button-disabled flex justify-between"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                <span>Select All</span>
                <span>Ctrl+A</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                Find (on this page)...
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          View
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="crt w-44 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-transparent data-[state=open]:text-white data-[state=open]:bg-[#010f80] py-0.5 rounded-none hover:cursor-pointer">
                  Toolbars
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="crt bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
                    <DropdownMenuItem
                      className="menu-button group flex gap-1"
                      onMouseEnter={handleSetMessage}
                      onMouseLeave={clearMessage}
                    >
                      <Checkmark className="group-hover:fill-white" />
                      <span>Standard Buttons</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="menu-button flex gap-1 group"
                      onMouseEnter={handleSetMessage}
                      onMouseLeave={clearMessage}
                    >
                      <Checkmark className="group-hover:fill-white" />
                      <span>Address Bar</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />
                    <DropdownMenuItem
                      className="menu-button flex gap-1 group"
                      onMouseEnter={handleSetMessage}
                      onMouseLeave={clearMessage}
                    >
                      <Checkmark className="group-hover:fill-white" />
                      <span>Text Labels</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuItem
                className="menu-button flex gap-1 group"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                <Checkmark className="group-hover:fill-white" />
                <span>Status Bar</span>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-transparent data-[state=open]:text-white data-[state=open]:bg-[#010f80] py-0.5 rounded-none hover:cursor-pointer">
                  Explorer Bar
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="crt bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
                    <DropdownMenuItem
                      className="menu-button-disabled flex justify-between"
                      onMouseEnter={handleSetMessage}
                      onMouseLeave={clearMessage}
                    >
                      <span>Search</span>
                      <span>Ctrl+E</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="menu-button flex justify-between"
                      onMouseEnter={handleSetMessage}
                      onMouseLeave={clearMessage}
                      onClick={onOrganizeFavorites}
                    >
                      <span>Favorites</span>
                      <span>Ctrl+I</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="menu-button-disabled flex justify-between"
                      onMouseEnter={handleSetMessage}
                      onMouseLeave={clearMessage}
                    >
                      <span>History</span>
                      <span>Ctrl+H</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onViewSource}
              >
                Source
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                Full Screen
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button flex justify-between"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onRefresh}
              >
                <span>Refresh</span>
                <span>F5</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button flex justify-between"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onStop}
              >
                <span>Stop</span>
                <span>Esc</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          Go
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="crt w-48 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={cn(
                  "menu-button flex justify-between",
                  !canBack && "menu-button-disabled",
                )}
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={canBack ? onBack : undefined}
              >
                <span>Back</span>
                <span>Alt+Left Arrow</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  "menu-button flex justify-between",
                  !canForward && "menu-button-disabled",
                )}
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={canForward ? onForward : undefined}
              >
                <span>Forward</span>
                <span>Alt+Right Arrow</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button flex justify-between"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onHome}
              >
                <span>Home Page</span>
                <span>Alt+Home</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                Search the Web
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          Favorites
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="crt w-48 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onAddFavorite}
              >
                Add to Favorites...
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onOrganizeFavorites}
              >
                Organize Favorites...
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              {favorites.length === 0 ? (
                <DropdownMenuItem
                  className="menu-button-disabled"
                  onMouseEnter={handleSetMessage}
                  onMouseLeave={clearMessage}
                >
                  (empty)
                </DropdownMenuItem>
              ) : (
                favorites.map((f) => (
                  <DropdownMenuItem
                    key={f.url}
                    className="menu-button truncate"
                    onMouseEnter={handleSetMessage}
                    onMouseLeave={clearMessage}
                    onClick={() => onNavigate(f.url)}
                  >
                    {f.label}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          Tools
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="crt w-48 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                Mail and News
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                Synchronize...
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                Windows Update
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                Internet Options...
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          Help
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="crt w-36 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
              >
                Help Topics
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={handleSetMessage}
                onMouseLeave={clearMessage}
                onClick={onAbout}
              >
                About Internet Explorer
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
