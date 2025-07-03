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
