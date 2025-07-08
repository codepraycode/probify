// components/TimerBar.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";

type TimerBarProps = {
  durationInSeconds: number;
  className?: string;
  onCompleteAction?: () => void;
  onTickAction?: (secondsLeft: number) => void;
  warningThreshold?: number; // Percentage (0-1) when timer turns yellow/red
};

type TimeDisplay = {
  minutes: number;
  seconds: number;
  formatted: string;
};

function formatTime(seconds: number): TimeDisplay {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return {
    minutes,
    seconds: secs,
    formatted: `${minutes}:${secs.toString().padStart(2, "0")}`,
  };
}

function useTimer(
  duration: number,
  onComplete?: () => void,
  onTick?: (secondsLeft: number) => void
) {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        
        // Call onTick with the new value before completion check
        onTick?.(next);

        if (next <= 0) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete, onTick]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);

  return {
    timeLeft: secondsLeft / duration,
    ...formatTime(secondsLeft),
    isRunning,
    pause,
    resume,
  };
}

export function TimerBar({
  durationInSeconds,
  className,
  onCompleteAction,
  onTickAction,
  warningThreshold = 0.2, // 20% remaining
}: TimerBarProps) {
  const { timeLeft, formatted, minutes, seconds } = useTimer(
    durationInSeconds,
    onCompleteAction,
    onTickAction
  );

  const progressColor = clsx({
    "bg-primary": timeLeft > warningThreshold,
    "bg-amber-500": timeLeft <= warningThreshold && timeLeft > warningThreshold / 2,
    "bg-red-500": timeLeft <= warningThreshold / 2,
  });

  return (
    <div className={clsx("w-full space-y-1", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-300 ease-linear",
            progressColor
          )}
          style={{
            width: `${Math.max(0, Math.min(100, timeLeft * 100))}%`,
          }}
          aria-valuenow={timeLeft * 100}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          ⏳ {formatted} remaining
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Started with {formatTime(durationInSeconds).formatted}
        </p>
      </div>
    </div>
  );
}