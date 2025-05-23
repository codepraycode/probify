// components/TimerBar.tsx
"use client";
import { useEffect, useState } from "react";

export function TimerBar({ durationInSeconds }: { durationInSeconds: number }) {
    const [secondsLeft, setSecondsLeft] = useState(durationInSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((s) => {
                if (s <= 1) clearInterval(interval);
                return s - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div className="mb-4 h-4 w-full overflow-hidden rounded-full bg-stroke dark:bg-stroke-dark">
            <div
                className="h-4 bg-primary transition-all duration-300"
                style={{ width: `${(secondsLeft / durationInSeconds) * 100}%` }}
            />
            <p className="mt-1 text-sm text-body-color dark:text-body-color-dark">
                ⏳ {minutes}:{seconds.toString().padStart(2, "0")} remaining
            </p>
        </div>
    );
}
