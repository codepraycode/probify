"use client";

import {
    EXERCISE_PAGE_URL,
    EXERCISE_REPORT_REF_URL,
    EXERCISE_SETUP,
    EXERCISES,
    HASH,
    SIGNIN,
} from "@/data/links";
import { ExerciseWithReport } from "@/types/exercise.types";
import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import clsx from "clsx";
import { ProgressBar } from "./ProgressIndicator";
import { formatDate, formatDuration } from "@/utils/functions";

type ExerciseListItemProps = {
    exercise: ExerciseWithReport;
};

export function ExerciseListItem({ exercise }: ExerciseListItemProps) {
    const isClickable = Boolean(exercise.reportId);
    const linkHref = isClickable
        ? EXERCISE_REPORT_REF_URL(exercise.reportId!)
        : EXERCISE_PAGE_URL(exercise.id);

    return (
        <Link
            href={linkHref}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : -1}
            aria-disabled={!isClickable}
            aria-label={
                isClickable
                    ? `View report for exercise created on ${formatDate(exercise.createdAt)}`
                    : `Report not available for exercise created on ${formatDate(exercise.createdAt)}`
            }
            className={clsx(
                "group relative flex flex-col gap-3 rounded-xl border bg-white p-5 shadow transition-all duration-200 dark:border-gray-700 dark:bg-gray-900",
                isClickable
                    ? "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    : "cursor-not-allowed opacity-60",
            )}
        >
            {/* Decorative Highlight Stripe */}
            {/* <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl bg-primary transition-all group-hover:h-[90%]" /> */}

            <div className="flex items-center justify-between">
                <h3 className="dark:text-primary-light truncate text-lg font-bold text-primary">
                    Exercise • {exercise.id.slice(0, 8)}
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
                🗓 Taken on {formatDate(exercise.createdAt)}
            </div>

            {!exercise.reportId && (
                <p className="mt-2 rounded-md bg-red-100 px-3 py-2 text-xs font-semibold text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    ⚠️ Report not available yet
                </p>
            )}

            {exercise.report && (
                <div className="mt-auto space-y-4 rounded-md bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold ">
                            ✅ Score: {exercise.report.score}/
                            {exercise.report.total}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400">
                            🎯 Accuracy: {Math.round(exercise.report.accuracy)}%
                        </span>
                    </div>

                    <ProgressBar value={exercise.report.accuracy} />
                </div>
            )}
        </Link>
    );
}

export function ExerciseSetup() {
    return (
        <Link
            href={EXERCISE_SETUP}
            className={clsx(
                "group relative overflow-hidden rounded-2xl border-2 border-dashed border-primary p-8 text-primary transition-all duration-300 ease-in-out",
                "cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-primary/40",
                "flex flex-col items-center justify-center gap-4 hover:bg-primary hover:text-white",
            )}
        >
            {/* Glow + Hover Background Effect */}
            <div className="absolute inset-0 z-0 scale-110 bg-primary/10 opacity-0 blur-lg transition-all duration-300 group-hover:opacity-100" />

            {/* Floating Particles */}
            <div className="pointer-events-none absolute inset-0 z-0 animate-pulse bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="mb-4 text-6xl transition-transform duration-300 group-hover:scale-110">
                    ➕
                </div>
                <h2 className="text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-white">
                    Create New Exercise
                </h2>
                <p className="mt-1 text-sm text-muted-foreground transition-colors group-hover:text-white/80">
                    Start a fresh challenge now!
                </p>
            </div>
        </Link>
    );
}

export function NoExerciseError() {
    return (
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center space-y-4 rounded-lg border p-8 text-center shadow-md">
            <div className="text-6xl">📭</div>
            <h2 className="text-yellow-800 dark:text-yellow-300 text-2xl font-bold">
                No Exercises Found
            </h2>
            <p className="text-yellow-700 dark:text-yellow-200 max-w-xs">
                Looks like you haven’t created any exercises yet. Let’s get
                started and build your first one!
            </p>
            <SecondaryButton
                link={EXERCISE_SETUP}
                className="bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 mt-4 rounded-md px-6 py-2 font-semibold text-white transition focus:outline-none focus:ring-2"
                aria-label="Create new exercise"
            >
                Create Exercise
            </SecondaryButton>
        </div>
    );
}

export function LoadExerciseError({ message }: { message?: string }) {
    return (
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center space-y-4 rounded-lg border border-red-400 bg-red-50 p-8 text-center shadow-md dark:border-red-700 dark:bg-red-900">
            <div className="text-6xl">⚠️</div>
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-300">
                Oops! Something Went Wrong
            </h2>
            <p className="max-w-xs text-red-700 dark:text-red-200">
                {message ??
                    "We encountered an error while trying to load your exercises. Please check your connection or try again."}
            </p>

            <Link
                href={EXERCISES}
                // onClick={onRetry}
                className="mt-4 rounded-md bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Retry loading exercises"
            >
                Retry
            </Link>
        </div>
    );
}

export function AuthRequiredExercisePrompt() {
    return (
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-8 text-center shadow-md dark:border-blue-800 dark:bg-blue-900/20">
            <div className="text-6xl">🔒</div>
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                Exercise History Locked
            </h2>
            <p className="max-w-xs text-blue-700 dark:text-blue-300">
                Please sign in to view your personalized exercise history and
                progress tracking.
            </p>

            <SecondaryButton
                link={SIGNIN}
                className="bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 mt-4 rounded-md px-6 py-2 font-semibold text-white transition focus:outline-none focus:ring-2"
                aria-label="Create new exercise"
            >
                Sign In
            </SecondaryButton>

        </div>
    );
}