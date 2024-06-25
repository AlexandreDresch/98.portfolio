import { Button } from "../ui/button";

export default function FolderNavigationMenu() {
    return (
        <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">File</span>
            </Button>

            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">Edit</span>
            </Button>

            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">View</span>
            </Button>

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
    )
}