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
