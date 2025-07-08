import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
    className?: string;
    label: string;
    description?: string;
    full?: boolean;
    icon?: ReactNode;
}

export default function PageLoader({
    icon = "🎲",
    full,
    className,
    label,
    description,
}: Props) {
    return (
        <div
            className={clsx(
                "flex w-full animate-fadeIn flex-col items-center justify-center px-4 text-center",
                className,
                { "h-screen": full, "h-52": !full },
            )}
        >
            <div className="relative mb-6 h-20 w-20">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white text-3xl dark:bg-gray-dark">
                    {icon}
                </div>
            </div>
            <h1 className="mb-2 font-heading text-xl text-black dark:text-white">
                {label}
            </h1>
            <p className="max-w-xs text-sm text-muted-foreground">
                {description || "Please wait while we complete a process."}
            </p>

            <div className="mt-6 h-2 w-40 overflow-hidden rounded-full bg-stroke dark:bg-stroke-dark">
                <div className="animate-pulse-slow h-full w-1/2 rounded-full bg-primary" />
            </div>
        </div>
    );
}
