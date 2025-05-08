"use client";

import { useEffect, useRef } from "react";

export type SoundType =
  | "startup"
  | "shutdown"
  | "error"
  | "ding"
  | "notify"
  | "recycle"
  | "windowsLogon"
  | "hardDrive";

const soundPaths: Record<SoundType, string> = {
  startup: "/soundtrack/windows-98-startup.mp3",
  shutdown: "/soundtrack/windows-98-shutdown.mp3",
  error: "/soundtrack/windows-98-error.mp3",
  ding: "/soundtrack/windows-98-ding.mp3",
  notify: "/soundtrack/windows-98-notify.mp3",
  recycle: "/soundtrack/windows-98-recycle.mp3",
  windowsLogon: "/soundtrack/windows-98-logon.mp3",
  hardDrive: "/soundtrack/vintage-hard-drive.mp3",
};

export function useWindowsSound() {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    startup: null,
    shutdown: null,
    error: null,
    ding: null,
    notify: null,
    recycle: null,
    windowsLogon: null,
    hardDrive: null,
  });

  useEffect(() => {
    Object.entries(soundPaths).forEach(([type, path]) => {
      const soundType = type as SoundType;
      audioRefs.current[soundType] = new Audio(path);

      if (audioRefs.current[soundType]) {
        audioRefs.current[soundType]!.load();
      }
    });

    const currentAudioRefs = { ...audioRefs.current };

    return () => {
      Object.values(currentAudioRefs).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);

  const playSound = (soundType: SoundType) => {
    const audio = audioRefs.current[soundType];
    if (audio) {
      audio.currentTime = 0;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log(`Audio playback was prevented: ${error}`);
        });
      }
    }
  };

  const stopSound = (soundType: SoundType) => {
    const audio = audioRefs.current[soundType];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return { playSound, stopSound };
}

export default function SoundManager() {
  const { playSound } = useWindowsSound();

  useEffect(() => {
    const handleGlobalSoundEvent = (
      e: CustomEvent<{ soundType: SoundType }>
    ) => {
      if (e.detail && e.detail.soundType) {
        playSound(e.detail.soundType);
      }
    };

    window.addEventListener(
      "play-windows-sound" as any,
      handleGlobalSoundEvent
    );

    return () => {
      window.removeEventListener(
        "play-windows-sound" as any,
        handleGlobalSoundEvent
      );
    };
  }, [playSound]);

  return null;
}

export function playWindowsSound(soundType: SoundType) {
  const event = new CustomEvent("play-windows-sound", {
    detail: { soundType },
  });
  window.dispatchEvent(event);
}

export function stopWindowsSound(soundType: SoundType) {
  const event = new CustomEvent("stop-windows-sound", {
    detail: { soundType },
  });
  window.dispatchEvent(event);

  const audio = document.querySelector(
    `audio[data-sound-type="${soundType}"]`
  ) as HTMLAudioElement;
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}
