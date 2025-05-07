"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { dismissClippy, showRandomClippyMessage, showContextualClippyMessage } from "@/store/clippy-slice"
import { cn } from "@/lib/utils"

export default function Clippy() {
  const dispatch = useAppDispatch()
  const { isVisible, currentMessageId, messages, isAnimating } = useAppSelector((state) => state.clippy)
  const [isOpen, setIsOpen] = useState(false)

  // Get the current message text
  const currentMessage =
    messages.find((m) => m.id === currentMessageId)?.text || "Hi! I'm Clippy, your assistant. Can I help you?"

  // Random appearance
  useEffect(() => {
    // Show Clippy randomly every 2-5 minutes if not already visible
    const randomAppearance = () => {
      const randomTime = Math.floor(Math.random() * (300000 - 120000) + 120000) // 2-5 minutes
      const timer = setTimeout(() => {
        dispatch(showRandomClippyMessage())
        randomAppearance() // Schedule next appearance
      }, randomTime)

      return () => clearTimeout(timer)
    }

    const initialTimer = setTimeout(() => {
      // Initial appearance after 30 seconds
      dispatch(showRandomClippyMessage())
      randomAppearance() // Start the random cycle
    }, 30000)

    return () => clearTimeout(initialTimer)
  }, [dispatch])

  // Show contextual help when certain actions are performed
  useEffect(() => {
    // Example: Listen for window-related actions
    const handleWindowAction = (e: Event) => {
      if ((e as CustomEvent).detail?.type === "window") {
        dispatch(showContextualClippyMessage("tips"))
      }
    }

    window.addEventListener("app-action", handleWindowAction)
    return () => window.removeEventListener("app-action", handleWindowAction)
  }, [dispatch])

  // Handle dropdown open/close
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      dispatch(showRandomClippyMessage())
    }
  }

  // Handle dismissal
  const handleDismiss = (duration: number | null) => {
    dispatch(dismissClippy(duration))
    setIsOpen(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-14 right-28 z-50">
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <Image
              width={80}
              height={80}
              alt="Clippy"
              src="/clippy.gif"
              className={cn(
                "w-auto h-14 cursor-pointer transition-transform duration-300",
                isAnimating && "animate-bounce",
                isOpen && "scale-110",
              )}
            />
            {!isOpen && <div className="absolute -top-2 -right-2 w-4 h-4 text-red-500 font-black text-3xl animate-pulse" >!</div>}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="center" className="w-64 p-4 bg-[#FFFFCC] border-2 border-black shadow-md rounded-none mb-3">
          <div className="flex items-start space-x-2 mb-3">
            <Image width={40} height={40} alt="Clippy icon" src="/clippy-thinking.gif" className="size-10" />
            <p className="text-sm">{currentMessage}</p>
          </div>

          <DropdownMenuSeparator />

          <div className="flex justify-between mt-2">
            <DropdownMenuItem
              onSelect={() => dispatch(showRandomClippyMessage())}
              className="text-xs cursor-pointer hover:bg-yellow-100"
            >
              Show another tip
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => handleDismiss(null)}
              className="text-xs cursor-pointer hover:bg-yellow-100"
            >
              Hide Clippy
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-6 bg-[#C0C0C0] border-2 border-t-white border-l-white border-b-black border-r-black"
              onClick={() => handleDismiss(3600000)}
            >
              Dismiss for 1 hour
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
