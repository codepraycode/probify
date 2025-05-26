import clsx from "clsx";

interface ProgressProps {
    value: number; // Between 0 and 100
    className?: string;
}

export default function Progress({ value, className }: ProgressProps) {
    return (
        <div
            className={clsx(
                "bg-muted h-3 w-full overflow-hidden rounded-full border border-gray-500",
                
            )}
        >
            <div
                className={clsx("h-full transition-all rounded-md", className)}
                style={{ width: `${value}%` }}
            />
        </div>
    );
}
