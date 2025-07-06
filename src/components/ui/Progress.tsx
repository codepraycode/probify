"use client";

import clsx from "clsx";
import * as React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
}

export function Progress({
    className,
    value,
    max = 100,
    ...props
}: ProgressProps) {
    return (
        <div
            className={clsx(
                "relative h-2 w-full overflow-hidden rounded-full",
                className,
            )}
            {...props}
        >
            <div className="absolute h-full w-full bg-current opacity-20" />
            <div
                className="absolute h-full rounded-full bg-current transition-all duration-500"
                style={{ width: `${(value / max) * 100}%` }}
            />
        </div>
    );
}
