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
} from "../ui/dropdown-menu";
import Checkmark from "../shared/checkmark";
import { FooterMessages } from "@/constants";

export default function FolderNavigationMenu() {
  const dispatch = useAppDispatch();

  function handleSetMessage(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    const textContent = Array.from(event.currentTarget.childNodes)
      .map(
        (node) =>
          (node as HTMLElement).innerText || (node as HTMLElement).textContent
      )
      .join(" ")
      .replace(/\s+/g, "")
      .trim();

    const messageObject = FooterMessages.find(
      (item) => item.name === textContent
    );

    if (messageObject) {
      dispatch(setFooterMessage(messageObject.message));
    }
  }

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          File
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="crt w-10 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-transparent data-[state=open]:text-white data-[state=open]:bg-[#010f80] py-0.5 rounded-none hover:cursor-pointer">
                  New
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="crt bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      Folder
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      Shortcut
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />
                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      Text Document
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      WordPad Document
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      Bitmap Image
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      Wave Sound
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Create Shortcut
              </DropdownMenuItem>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Properties
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Work Offline
              </DropdownMenuItem>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
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
          className="crt w-10 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Undo
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button-disabled flex justify-between"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <span>Cut</span>
                <span>Ctrl+X</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled flex justify-between"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <span>Copy</span>
                <span>Ctrl+C</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled flex justify-between"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <span>Paste</span>
                <span>Ctrl+V</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Paste Shortcut
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button flex justify-between"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <span>Select All</span>
                <span>Ctrl+A</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Invert Selection
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
          className="crt w-10 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
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
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <Checkmark className="group-hover:fill-white" />
                      <span>Standard Buttons</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="menu-button flex gap-1 group"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <Checkmark className="group-hover:fill-white" />
                      <span>Address Bar</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      Links
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      Radio
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />
                    <DropdownMenuItem
                      className="menu-button flex gap-1 group"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <Checkmark className="group-hover:fill-white" />
                      <span>Text Labels</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuItem
                className="menu-button flex gap-1 group"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
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
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <span>Search</span>
                      <span>Ctrl+E</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="menu-button-disabled flex justify-between"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <span>Favorites</span>
                      <span>Ctrl+I</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="menu-button-disabled flex justify-between"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <span>History</span>
                      <span>Ctrl+H</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      Folders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />
                    <DropdownMenuItem
                      className="menu-button-disabled"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      Tip of the Day
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuItem
              className="menu-button"
              onMouseEnter={(event) => handleSetMessage(event)}
              onMouseLeave={() => dispatch(setFooterMessage(""))}
            >
              as Web Page
            </DropdownMenuItem>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button flex gap-1 group"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <Checkmark className="group-hover:fill-white" />
                <span>Large Icons</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button flex gap-1 group"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <Checkmark className="fill-none" />
                <span>Small Icons</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                List
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Details
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-transparent data-[state=open]:text-white data-[state=open]:bg-[#010f80] py-0.5 rounded-none hover:cursor-pointer">
                  Arrange Icons
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="crt bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
                    <DropdownMenuItem
                      className="menu-button group flex gap-1"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <Checkmark className="group-hover:fill-white" />
                      <span>by Name</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="menu-button flex gap-1 group"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <Checkmark className="fill-transparent" />
                      <span>by Type</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="menu-button flex gap-1 group"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <Checkmark className="fill-transparent" />
                      <span>by Size</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="menu-button flex gap-1 group"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <Checkmark className="fill-transparent" />
                      <span>by Date</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

                    <DropdownMenuItem
                      className="menu-button-disabled flex gap-1 group"
                      onMouseEnter={(event) => handleSetMessage(event)}
                      onMouseLeave={() => dispatch(setFooterMessage(""))}
                    >
                      <Checkmark className="fill-gray-500" />
                      <span>Auto Arrange</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Line Up Icons
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button flex justify-between"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <span>Refresh</span>
                <span>F5</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Folder Options...
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
                className="menu-button-disabled flex justify-between"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <span>Back</span>
                <span>Alt+Left Arrow</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled flex justify-between"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <span>Forward</span>
                <span>Alt+Right Arrow</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Up One Level
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button flex justify-between"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                <span>Home Page</span>
                <span>Alt+Home</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Channel Guide
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Search the Web
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                My Computer
              </DropdownMenuItem>
              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Internet Call
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
          className="crt w-40 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Add to Favorites...
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Organize Favorites...
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                (empty)
              </DropdownMenuItem>
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
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-transparent data-[state=open]:text-white data-[state=open]:bg-[#010f80] py-0.5 rounded-none hover:cursor-pointer">
                Find
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="crt bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
                  <DropdownMenuItem
                    className="menu-button-disabled"
                    onMouseEnter={(event) => handleSetMessage(event)}
                    onMouseLeave={() => dispatch(setFooterMessage(""))}
                  >
                    Files or Folders...
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="menu-button-disabled"
                    onMouseEnter={(event) => handleSetMessage(event)}
                    onMouseLeave={() => dispatch(setFooterMessage(""))}
                  >
                    Computer...
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="menu-button-disabled"
                    onMouseEnter={(event) => handleSetMessage(event)}
                    onMouseLeave={() => dispatch(setFooterMessage(""))}
                  >
                    On the Internet...
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Map Network Drive...
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Disconnect Network Drive...
              </DropdownMenuItem>

              <DropdownMenuItem
                className="menu-button-disabled"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Synchronize...
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
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                Help Topics
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem
                className="menu-button"
                onMouseEnter={(event) => handleSetMessage(event)}
                onMouseLeave={() => dispatch(setFooterMessage(""))}
              >
                About 98.portfolio
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
