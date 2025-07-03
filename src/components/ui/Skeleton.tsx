import clsx from "clsx";
import React from "react";

type SkeletonProps = {
    className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div
            className={clsx(
                "animate-pulse rounded-md bg-gray-200 dark:bg-bg-color-dark",
                className,
            )}
        />
    );
};

export default function UserProfileSkeleton() {
    return (
        <div className="w-full animate-pulse space-y-6 rounded-xl border p-6 shadow-sm dark:border-gray-700 dark:bg-bg-color-dark">
            <div className="flex items-center gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        </div>
    );
}

export function LeaderboardSkeleton() {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-zinc-900">
            <ul className="animate-pulse divide-y divide-gray-200 dark:divide-gray-700">
                {Array.from({ length: 5 }).map((_, i) => (
                    <li
                        key={i}
                        className="flex items-center justify-between py-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-zinc-700" />
                            <div>
                                <div className="mb-1 h-4 w-24 rounded bg-gray-200 dark:bg-zinc-700" />
                                <div className="h-3 w-16 rounded bg-gray-200 dark:bg-zinc-700" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground sm:text-sm">
                            <div className="h-4 w-10 rounded bg-gray-200 dark:bg-zinc-700" />
                            <div className="h-4 w-10 rounded bg-gray-200 dark:bg-zinc-700" />
                            <div className="h-4 w-10 rounded bg-gray-200 dark:bg-zinc-700" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}