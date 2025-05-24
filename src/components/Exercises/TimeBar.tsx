/* eslint-disable react-hooks/exhaustive-deps */
// components/TimerBar.tsx
"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

export function TimerBar({
    durationInSeconds,
    className,
    onComplete,
    onTick,
}: {
    durationInSeconds: number;
    className?: string;
    onComplete?: () => void;
    onTick?: (secondsLeft: number) => void;
}) {
    const [secondsLeft, setSecondsLeft] = useState(durationInSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((s) => {
                const next = s - 1;
                if (next <= 0) {
                    clearInterval(interval);
                    onComplete?.();
                    return 0;
                }
                onTick?.(next);
                return next;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div
            className={clsx(
                "w-full overflow-hidden",
                className,
            )}
        >
            <div
                className="h-4 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${(secondsLeft / durationInSeconds) * 100}%` }}
            />
            <p className="dark:text-muted-foreground mt-1 text-sm text-body-color">
                ⏳ {minutes}:{seconds.toString().padStart(2, "0")} remaining
            </p>
        </div>
    );
}
