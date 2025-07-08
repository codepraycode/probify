"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";
import { useNavigate } from "@/hooks/useNavigate";
import { useExercise } from "@/lib/context/ExerciseContext";
import { Exercise, QuestionAnswer, QuestionId } from "@/types/exercise.types";
import { EXERCISE_REPORT_REF_URL } from "@/data/links";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { calculateExerciseDuration } from "@/utils/functions";
import { TimerBar } from "./TimeBar";
import { QuestionCard } from "./QuestionCard";
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import ProgressIndicator from "./ProgressIndicator";
import { ConfirmationDialog } from "../ui/Dialog";
import {
    saveProgressToLocalStorage,
    loadProgressFromLocalStorage,
} from "@/utils/persistence";

type ExercisePlayerProps = {
    exercise: Exercise;
};

const SAVE_INTERVAL = 15000; // 15 seconds


function saveProgress(id:string,data: any) {
    saveProgressToLocalStorage(id, {
        selections: { ...data.selections},
        currentIndex: data.currentIndex,
        flaggedQuestions: data.flaggedQuestions,
    });
}

const ExercisePlayer = observer(({ exercise }: ExercisePlayerProps) => {
    const toastId = useRef(nanoid());
    const containerRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef(Date.now());
    const saveIntervalRef = useRef<NodeJS.Timeout>();
    const { data: session } = useSession();
    const store = useExercise();
    const { navigate } = useNavigate();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load saved progress on mount
    useEffect(() => {
        const savedProgress = loadProgressFromLocalStorage(exercise.id);
        if (savedProgress) {
            store.loadProgress(savedProgress);
            showSuccessToast("Loaded your previous progress", toastId.current);
        }
    }, [exercise.id, store]);

    // Auto-save progress periodically
    useEffect(() => {
        saveIntervalRef.current = setInterval(() => {
            saveProgress(exercise.id, {
                selections: store.selections,
                currentIndex: store.currentIndex,
                flaggedQuestions: store.flaggedQuestions,
            });
        }, SAVE_INTERVAL);

        return () => {
            clearInterval(saveIntervalRef.current);
        };
    }, [exercise.id, store]);

    const duration = useMemo(
        () => calculateExerciseDuration(exercise.duration),
        [exercise.duration],
    );

    const handleSaveAnswer = useCallback(
        (id: QuestionId, value: QuestionAnswer) => {
            store.setSelection(id, value);
            // Immediately save after answer change
            const data = store.serialize();
            saveProgress(exercise.id, {
                selections: { ...data.selections, [id]: value },
                currentIndex: data.currentIndex,
                flaggedQuestions: data.flaggedQuestions,
            })
        },
        [exercise.id, store],
    );

    const handleFlagQuestion = useCallback(
        (questionId: QuestionId) => {
            store.toggleFlaggedQuestion(questionId);
        },
        [store],
    );

    const confirmSubmit = useCallback(() => {
        setShowConfirmDialog(true);
    }, []);

    const handleSubmit = useCallback(
        async (e?: React.FormEvent) => {
            e?.preventDefault();
            setIsSubmitting(true);

            if (!session?.user?.id) {
                showErrorToast(
                    "You must be logged in to submit",
                    toastId.current,
                );
                setIsSubmitting(false);
                return;
            }

            try {
                const endTime = Date.now();
                const totalTimeSeconds = Math.floor(
                    (endTime - startTimeRef.current) / 1000,
                );

                const {
                    success,
                    message,
                    data: reportId,
                } = await store.submitAnswers({
                    duration: {
                        minutes: Math.floor(totalTimeSeconds / 60),
                        seconds: totalTimeSeconds % 60,
                    },
                    exerciseId: exercise.id,
                    userId: session.user.id,
                });

                if (!success || !reportId) {
                    throw new Error(message || "Submission failed");
                }

                // Clear saved progress on successful submit
                localStorage.removeItem(`exercise-progress-${exercise.id}`);

                showSuccessToast(
                    "Exercise submitted successfully!",
                    toastId.current,
                );
                navigate(EXERCISE_REPORT_REF_URL(reportId));
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred";
                showErrorToast(errorMessage, toastId.current);
            } finally {
                setIsSubmitting(false);
                setShowConfirmDialog(false);
            }
        },
        [exercise.id, navigate, session?.user?.id, store],
    );

    const handleKeydown = useCallback(
        (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowRight":
                    store.goNext();
                    break;
                case "ArrowLeft":
                    store.goPrev();
                    break;
                case "Enter":
                    if (store.isLast) {
                        confirmSubmit();
                    }
                    break;
                case "f":
                    handleFlagQuestion(store.currentQuestion.id);
                    break;
            }
        },
        [confirmSubmit, handleFlagQuestion, store],
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [handleKeydown]);

    useEffect(() => {
        containerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [store.currentIndex]);

    const currentQuestion = store.currentQuestion;
    const currentSelection = store.getSelectionOption(currentQuestion.id);
    const isFlagged = store.checkIsFlagged(currentQuestion.id);

    return (
        <section
            ref={containerRef}
            className="container min-h-[350px] max-w-2xl space-y-6 py-10"
        >
            <form onSubmit={(e)=>{
                e.preventDefault();
                confirmSubmit();
            }} className="space-y-6">
                <div className="sticky top-0 z-20 rounded-md bg-white/80 p-2 shadow-sm backdrop-blur-md dark:bg-gray-900/80">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-heading text-2xl font-bold dark:text-white">
                                🧠 Test Your Probability Skills
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Stay focused! Complete all questions within the
                                time limit.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date().toLocaleTimeString()}
                        </div>
                    </div>

                    <TimerBar
                        durationInSeconds={duration}
                        className="mb-4 mt-2"
                        onCompleteAction={confirmSubmit}
                    />
                </div>

                <ProgressIndicator
                    currentIndex={store.currentIndex + 1}
                    length={store.questions.length}
                    updatedSelection={() => {}}
                    isActive={true}
                    // flaggedQuestions={store.flaggedQuestions}
                />

                <QuestionCard
                    question={currentQuestion}
                    onAnswer={handleSaveAnswer}
                    selectedAnswer={currentSelection}
                    // isFlagged={isFlagged}
                    // onFlagQuestion={() =>
                    //     handleFlagQuestion(currentQuestion.id)
                    // }
                />

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <SecondaryButton
                        onClick={() => store.goPrev()}
                        disabled={store.isFirst}
                        type="button"
                        aria-label="Previous question"
                    >
                        ← Previous
                    </SecondaryButton>

                    {!store.isLast ? (
                        <PrimaryButton
                            onClick={() => store.goNext()}
                            disabled={!store.canProceed}
                            type="button"
                            aria-label="Next question"
                        >
                            Next →
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton
                            type="submit"
                            aria-label="Submit exercise"
                            isLoading={isSubmitting}
                        >
                            ✅ Submit
                        </PrimaryButton>
                    )}
                </div>
            </form>

            <ConfirmationDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleSubmit}
                title="Submit Exercise?"
                message="Are you sure you want to submit your answers? You won't be able to make changes after submission."
                confirmText="Submit"
                cancelText="Continue Editing"
                isLoading={isSubmitting}
            />
        </section>
    );
});

export default ExercisePlayer;
