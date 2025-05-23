import clsx from "clsx";

type Status = "locked" | "unlocked" | "completed";

interface ExerciseCardProps {
    title: string;
    duration: number;
    status: Status;
    onStart?: () => void;
}

export function ExerciseCard({
    title,
    duration,
    status,
    onStart,
}: ExerciseCardProps) {
    const isLocked = status === "locked";
    const isCompleted = status === "completed";

    return (
        <div
            className={clsx(
                "rounded-2xl bg-white p-4 shadow-two transition-all dark:bg-gray-dark",
                {"pointer-events-none opacity-50": isLocked},
                {"border-2 border-primary": isCompleted},
            )}
        >
            <h3 className="mb-2 font-heading text-lg text-black dark:text-white">
                {title}
            </h3>
            <p className="text-sm text-body-color dark:text-body-color-dark">
                ⏱ {duration} min
            </p>

            <div className="mt-4">
                {status === "unlocked" && (
                    <button
                        onClick={onStart}
                        className="rounded-xl bg-primary px-4 py-2 font-semibold text-white shadow-btn transition hover:shadow-btn-hover"
                    >
                        Start Exercise
                    </button>
                )}
                {status === "completed" && (
                    <span className="font-bold text-green-600">
                        ✅ Completed
                    </span>
                )}
                {status === "locked" && (
                    <span className="text-yellow-500 font-bold">🔒 Locked</span>
                )}
            </div>
        </div>
    );
}
