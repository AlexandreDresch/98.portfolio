import { Button } from "../ui/button";
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
import Checkmark from "./checkmark";

export default function FolderNavigationMenu() {
  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          File
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-10 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-transparent data-[state=open]:text-white data-[state=open]:bg-[#010f80] py-0.5 rounded-none hover:cursor-pointer">
                  New
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
                    <DropdownMenuItem className="menu-button-disabled">
                      Folder
                    </DropdownMenuItem>
                    <DropdownMenuItem className="menu-button-disabled">
                      Shortcut
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />
                    <DropdownMenuItem className="menu-button-disabled">
                      Text Document
                    </DropdownMenuItem>
                    <DropdownMenuItem className="menu-button-disabled">
                      WordPad Document
                    </DropdownMenuItem>
                    <DropdownMenuItem className="menu-button-disabled">
                      Bitmap Image
                    </DropdownMenuItem>
                    <DropdownMenuItem className="menu-button-disabled">
                      Wave Sound
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="menu-button-disabled">
                Create Shortcut
              </DropdownMenuItem>
              <DropdownMenuItem className="menu-button">
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem className="menu-button">
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="menu-button-disabled">
                Properties
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuItem className="menu-button">
              Work Offline
            </DropdownMenuItem>
            <DropdownMenuItem className="menu-button">Close</DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          Edit
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-10 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem className="menu-button-disabled">
                Undo
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

              <DropdownMenuItem className="menu-button-disabled flex justify-between">
                <span>Cut</span>
                <span>Ctrl+X</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="menu-button-disabled flex justify-between">
                <span>Copy</span>
                <span>Ctrl+C</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="menu-button-disabled flex justify-between">
                <span>Paste</span>
                <span>Ctrl+V</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="menu-button-disabled">
                Paste Shortcut
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuItem className="menu-button flex justify-between">
              <span>Select All</span>
              <span>Ctrl+A</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="menu-button">
              Invert Selection
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
          View
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-10 py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
          align="start"
        >
          <div className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-transparent data-[state=open]:text-white data-[state=open]:bg-[#010f80] py-0.5 rounded-none hover:cursor-pointer">
                  Toolbars
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
                    <DropdownMenuItem className="menu-button group flex gap-1">
                      <Checkmark className="group-hover:fill-white" />
                      <span>Standard Buttons</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="menu-button flex gap-1 group">
                      <Checkmark className="group-hover:fill-white" />
                      <span>Address Bar</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="menu-button-disabled">
                      Links
                    </DropdownMenuItem>
                    <DropdownMenuItem className="menu-button-disabled">
                      Radio
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />
                    <DropdownMenuItem className="menu-button flex gap-1 group">
                      <Checkmark className="group-hover:fill-white" />
                      <span>Text Labels</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuItem className="menu-button flex gap-1 group">
                <Checkmark className="group-hover:fill-white" />
                <span>Status Bar</span>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-transparent data-[state=open]:text-white data-[state=open]:bg-[#010f80] py-0.5 rounded-none hover:cursor-pointer">
                  Explorer Bar
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
                    <DropdownMenuItem className="menu-button-disabled flex justify-between">
                      <span>Search</span>
                      <span>Ctrl+E</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="menu-button-disabled flex justify-between">
                      <span>Favorites</span>
                      <span>Ctrl+I</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="menu-button-disabled flex justify-between">
                      <span>History</span>
                      <span>Ctrl+H</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="menu-button-disabled">
                      Folders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />
                    <DropdownMenuItem className="menu-button-disabled">
                      Tip of the Day
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuItem className="menu-button">
              as Web Page
            </DropdownMenuItem>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="menu-button flex gap-1 group">
                <Checkmark className="group-hover:fill-white" />
                <span>Large Icons</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="menu-button flex gap-1 group">
                <Checkmark className="fill-none" />
                <span>Small Icons</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="menu-button">List</DropdownMenuItem>

              <DropdownMenuItem className="menu-button-disabled">
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
                  <DropdownMenuSubContent className="bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
                    <DropdownMenuItem className="menu-button group flex gap-1">
                      <Checkmark className="group-hover:fill-white" />
                      <span>by Name</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="menu-button flex gap-1 group">
                      <Checkmark className="fill-transparent" />
                      <span>by Type</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="menu-button flex gap-1 group">
                      <Checkmark className="fill-transparent" />
                      <span>by Size</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="menu-button flex gap-1 group">
                      <Checkmark className="fill-transparent" />
                      <span>by Date</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

                    <DropdownMenuItem className="menu-button-disabled flex gap-1 group">
                      <Checkmark className="fill-gray-500" />
                      <span>Auto Arrange</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuItem className="menu-button-disabled">
                Line Up Icons
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] mx-[2px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="menu-button flex justify-between">
                <span>Refresh</span>
                <span>F5</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="menu-button-disabled">
                Folder Options...
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
      >
        <span className="first-letter:underline text-sm">Go</span>
      </Button>

      <Button
        variant="ghost"
        className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
      >
        <span className="first-letter:underline text-sm">Favorites</span>
      </Button>

      <Button
        variant="ghost"
        className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
      >
        <span className="first-letter:underline text-sm">Tools</span>
      </Button>

      <Button
        variant="ghost"
        className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
      >
        <span className="first-letter:underline text-sm">Help</span>
      </Button>
    </div>
  );
}
