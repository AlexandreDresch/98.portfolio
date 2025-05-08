import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const bootMessages = [
  "Starting MS-DOS...",
  "HIMEM is testing extended memory...",
  "HIMEM has tested extended memory... OK",
  "Loading C:\\WINDOWS\\SYSTEM\\KERNEL.DLL",
  "Loading C:\\WINDOWS\\SYSTEM\\USER.DLL",
  "Loading C:\\WINDOWS\\SYSTEM\\GDI.DLL",
  "Loading C:\\WINDOWS\\SYSTEM\\MSGSRV32.EXE",
  "Initializing devices...",
  "Detecting hardware...",
  "Initializing registry...",
  "Loading user profile...",
  "Initializing graphical interface...",
  "Loading 98.portfolio...",
  "Welcome to 98.portfolio!",
]

export const errorMessages = [
  "ERROR: Failed to load C:\\WINDOWS\\SYSTEM\\MMSYSTEM.DLL... Retrying",
  "WARNING: Audio device not found",
  "ERROR: Failed to initialize video driver... Using VGA mode",
  "WARNING: Extended memory limited",
  "ERROR: Failed to load C:\\WINDOWS\\FONTS\\ARIAL.TTF... Using default font",
  "WARNING: Network device not found",
  "ERROR: Failed to load C:\\PROGRA~1\\COMMON~1\\SYSTEM\\OLEAUT32.DLL... Retrying",
  "WARNING: Insufficient disk space",
  "ERROR: Failed to initialize printer driver",
  "WARNING: Page file limited",
]

export function generateBootSequence() {
  const result = [...bootMessages]

  const numErrors = Math.floor(Math.random() * 3) + 2

  for (let i = 0; i < numErrors; i++) {
    const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]

    const position = Math.floor(Math.random() * (result.length - 5)) + 3

    result.splice(position, 0, errorMessage)

    if (Math.random() > 0.5) {
      result.splice(position + 1, 0, "Retrying... OK")
    }
  }

  return result
}
