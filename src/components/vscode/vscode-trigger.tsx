"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { openWindow } from "@/store/window-manager-slice"

export default function VSCodeTrigger() {
  const dispatch = useAppDispatch()
  const { selectedFile } = useAppSelector((state) => state.folders)

  const handleOpen = () => {
    dispatch(openWindow(9))
  }

  return (
    <Button variant="ghost" className="flex flex-col items-center cursor-pointer gap-1 mt-3" onClick={handleOpen}>
      <Image src="/icons/vscode.png" alt="VSCode Editor Icon" width={38} height={38} />
      <span className="font-normal text-sm">{selectedFile?.name || "VS Code"}</span>
    </Button>
  )
}
