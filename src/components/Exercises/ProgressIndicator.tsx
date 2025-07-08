import clsx from "clsx";

type Props = {
    currentIndex: number;
    length: number;
    updatedSelection: (index: number) => void;
    isActive: boolean;
    // selections: number;
}


{/* <div className="flex items-center justify-between text-sm text-body-color dark:text-body-color-dark">
    <span>
        Question <strong>{currentIndex + 1}</strong> of{" "}
        {mockQuestions.length}
    </span>
    <div className="flex items-center gap-2">
        {mockQuestions.map((_, idx) => (
            <div
                key={idx}
                className={`h-2 w-6 rounded-full transition-transform ${
                    answers[idx]
                        ? "bg-primary"
                        : "bg-gray-300 dark:bg-stroke-dark"
                } ${idx === currentIndex ? "scale-125" : ""}`}
            />
        ))}
    </div>
</div> */}


export default function ProgressIndicator(props: Props) {
    const { currentIndex, length, updatedSelection, isActive } = props;
    return (
        <div className="flex items-center justify-between text-sm text-body-color dark:text-body-color-dark">
            <span>
                Question <strong>{currentIndex}</strong> of {length}
            </span>

            {/* <div className="ml-4 flex-1 overflow-x-auto">
                <div className="flex w-max gap-1 pr-4">
                    {Array.from({ length }).map((_, idx) => (
                        <button
                            key={idx}
                            title={`Question ${idx + 1}`}
                            onClick={() => updatedSelection(idx)}
                            className={clsx(
                                "h-4 w-4 rounded-full border-2 transition-all",
                                {
                                    "scale-125 border-primary bg-primary": isActive
                                },
                            )}
                            // `${
                            //     idx === currentIndex
                            //         ? 
                            //         : answers[idx]
                            //         ? "border-primary/70 bg-primary/70"
                            //         : "border-gray-400 bg-gray-300 dark:border-stroke-dark dark:bg-stroke-dark"
                            // }
                            // hover:scale-110`
                        />
                    ))}
                </div>
            </div> */}
        </div>
    );
}

interface ProgressBarProps {
    value: number; // Between 0 and 100
    className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
    return (
        <div
            className={clsx(
                "bg-muted h-3 w-full overflow-hidden rounded-full border border-gray-500",
            )}
        >
            <div
                className={clsx("h-full rounded-md transition-all", className)}
                style={{ width: `${value}%` }}
            />
        </div>
    );
}
