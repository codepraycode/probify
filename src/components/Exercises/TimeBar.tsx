/* eslint-disable react-hooks/exhaustive-deps */
// components/TimerBar.tsx
"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";


type Props = {
    durationInSeconds: number;
    className?: string;
    onCompleteAction?: () => void;
    onTickAction?: (secondsLeft: number) => void;
}


function useTimer(duration: number, onComplete?: VoidFunction) {
    const [secondsLeft, setSecondsLeft] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((s) => {
                const next = s - 1;
                if (next <= 0) {
                    clearInterval(interval);
                    onComplete?.();
                    return 0;
                }
                return next;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const remaining = duration - (minutes * 60 + seconds);

    return {
        timeLeft: secondsLeft / duration,
        minutes,
        seconds,
        remaining,
    };
}

export function TimerBar(props: Props) {
    const { durationInSeconds, className, onCompleteAction, onTickAction } =
        props;
    
    const { minutes, seconds, timeLeft } = useTimer(
        durationInSeconds,
        onCompleteAction,
    );


    

    return (
        <div className={clsx("w-full overflow-hidden", className)}>
            <div
                className="h-4 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${timeLeft * 100}%` }}
            />
            <p className="mt-1 text-sm text-body-color dark:text-muted-foreground">
                ⏳ {minutes}:{seconds.toString().padStart(2, "0")} remaining
            </p>
        </div>
    );
}
