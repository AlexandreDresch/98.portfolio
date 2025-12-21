"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState("");
  const [activity, setActivity] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const activityInterval = setInterval(() => {
      setActivity((v) => !v);
    }, 600);

    return () => {
      clearInterval(timeInterval);
      clearInterval(activityInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-between text-white mb-4 px-2 select-none">
      <span className="text-base font-bold">
        {currentTime || "18:32"}
      </span>

      <div className="flex items-center gap-3 text-xs font-bold">
        <div className="flex items-center gap-1">
          <span>NET</span>
          <div className="flex gap-px">
            <div
              className={`w-1 h-2 ${
                activity ? "bg-lime-400" : "bg-lime-900"
              }`}
            />
            <div
              className={`w-1 h-2 ${
                activity ? "bg-lime-900" : "bg-lime-400"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-px">
          <div className="w-1 h-1 bg-white"></div>
          <div className="w-1 h-1 bg-white"></div>
          <div className="w-1 h-1 bg-white opacity-60"></div>
          <div className="w-1 h-1 bg-white opacity-30"></div>
        </div>

        <div className="bg-white/20 px-2 py-1 border border-white/40">
          57%
        </div>
      </div>
    </div>
  );
}
