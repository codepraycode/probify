// components/TopicExerciseItem.tsx
import React from "react";
import Link from "next/link";
import { EXERCISE_REPORT_REF_URL, HASH } from "@/data/links";
import { formatDate, formatDuration } from "@/utils/functions";
import clsx from "clsx";
import { ProgressBar } from "./ProgressIndicator";

interface TopicExerciseItemProps {
    exercise: {
        id: string;
        reportId?: string;
        createdAt: string;
        duration: number;
        questions: number;
        type: string[];
        topics: string[];
        report?: {
            score: number;
            total: number;
            accuracy: number;
        };
    };
}

export const TopicExerciseItem: React.FC<TopicExerciseItemProps> = ({
    exercise,
}) => {
    const isClickable = Boolean(exercise.reportId);
    const linkHref = isClickable
        ? EXERCISE_REPORT_REF_URL(exercise.reportId!)
        : HASH;

    const isPassed = exercise.report && exercise.report.accuracy >= 60;

    const date = formatDate(new Date(exercise.createdAt));
    return (
        <Link
            href={linkHref}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : -1}
            aria-disabled={!isClickable}
            aria-label={
                isClickable
                    ? `View report for exercise created on ${date}`
                    : `Report not available for exercise created on ${date}`
            }
            className={clsx(
                "group relative flex flex-col gap-3 rounded-xl border p-5 shadow transition-all duration-200 w-[450px] my-5 mx-auto max-w-full",
                isClickable
                    ? "border-green-500 bg-green-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-green-900/10"
                    : "cursor-not-allowed border-red-300 bg-white opacity-60 dark:border-gray-700 dark:bg-gray-900",
            )}
        >
            <div className="flex items-center justify-between">
                <h3 className="dark:text-primary-light truncate text-lg font-bold text-primary">
                    Required Exercise • {exercise.id.slice(0, 8)}
                </h3>
                <span className="bg-muted rounded-md px-2 py-1 text-xs font-medium text-muted-foreground">
                    {exercise.type.join(" | ").toUpperCase()}
                </span>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    ⏳{" "}
                    <span className="font-medium">
                        {formatDuration(exercise.duration)}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    ❓{" "}
                    <span className="font-medium">
                        {exercise.questions} Questions
                    </span>
                </div>
                <div className="flex items-center gap-1 truncate">
                    📚{" "}
                    <span className="truncate font-medium">
                        {exercise.topics.join(", ")}
                    </span>
                </div>
            </div>

            <div className="mt-1 text-xs italic text-muted-foreground">
                🗓 Taken on {formatDate(new Date(exercise.createdAt))}
            </div>

            {!exercise.reportId && (
                <p className="mt-2 rounded-md bg-red-100 px-3 py-2 text-xs font-semibold text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    ⚠️ Report not available yet
                </p>
            )}

            {exercise.report && (
                <div className="mt-auto space-y-4 rounded-md bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold">
                            ✅ Score: {exercise.report.score}/
                            {exercise.report.total}
                        </span>
                        <span
                            className={clsx(
                                "font-semibold",
                                isPassed
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400",
                            )}
                        >
                            🎯 Accuracy: {Math.round(exercise.report.accuracy)}%
                        </span>
                    </div>

                    <ProgressBar value={exercise.report.accuracy} />
                </div>
            )}
        </Link>
    );
};
