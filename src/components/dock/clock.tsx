import React, { useState, useEffect } from 'react';

interface ClockProps {
    showSeconds: boolean;
    className: string;
}

export default function Clock({ showSeconds, className}: ClockProps) {
  const [time, setTime] = useState(getCurrentTime(showSeconds));

  function getCurrentTime(showSeconds: boolean): string {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    let timeFormat = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes}`;

    if (showSeconds) {
      const seconds = currentTime.getSeconds();
      timeFormat += `:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    timeFormat += ` ${hours >= 12 ? 'PM' : 'AM'}`;
    return timeFormat;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime(showSeconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [showSeconds]);

  return (
      <span className={`${className}`}>{time}</span>
  );
};
