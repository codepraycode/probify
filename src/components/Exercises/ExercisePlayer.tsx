"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
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
// import { ProgressIndicator } from "./ProgressIndicator";
import { QuestionCard } from "./QuestionCard";
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import ProgressIndicator from "./ProgressIndicator";

type ExercisePlayerProps = {
    exercise: Exercise;
};

const ExercisePlayer = observer(({ exercise }: ExercisePlayerProps) => {
    const toastId = useRef(nanoid());
    const containerRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef(Date.now());
    const testFormRef = useRef<HTMLFormElement>(null);
    const { data: session } = useSession();
    const store = useExercise();
    const { navigate } = useNavigate();

    const duration = useMemo(
        () => calculateExerciseDuration(exercise.duration),
        [exercise.duration],
    );

    const handleSaveAnswer = (id: QuestionId, value: QuestionAnswer) => {
        store.setSelection(id, value);
    };

    const handleSubmit = useCallback(
        async (e?: React.FormEvent) => {
            e?.preventDefault();

            if (!session?.user?.id) {
                showErrorToast(
                    "You must be logged in to submit",
                    toastId.current,
                );
                return;
            }

            try {
                const endTime = Date.now();
                const totalTime = Math.floor(
                    (endTime - startTimeRef.current) / 1000,
                );
                const minutes = Math.floor(totalTime / 60);
                const seconds = totalTime % 60;

                const {
                    success,
                    message,
                    data: reportId,
                } = await store.submitAnswers({
                    duration: { minutes, seconds },
                    exerciseId: exercise.id,
                    userId: session.user.id,
                });

                if (!success) {
                    showErrorToast(
                        message || "Submission failed",
                        toastId.current,
                    );
                    return;
                }

                showSuccessToast(
                    message || "Exercise submitted!",
                    toastId.current,
                );
                navigate(EXERCISE_REPORT_REF_URL(reportId));
            } catch (error) {
                showErrorToast(
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred",
                    toastId.current,
                );
            }
        },
        [exercise.id, navigate, session?.user?.id, store],
    );

    const handleKeydown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") store.goNext();
            if (e.key === "ArrowLeft") store.goPrev();
        },
        [store],
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [handleKeydown]);

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [store.currentIndex]);

    return (
        <section
            ref={containerRef}
            className="container min-h-[350px] max-w-2xl space-y-6 py-10"
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                ref={testFormRef}
            >
                <div className="sticky top-0 z-20 rounded-md bg-white/80 p-2 shadow-sm backdrop-blur-md dark:bg-gray-900/80">
                    <h1 className="text-heading text-2xl font-bold dark:text-white">
                        🧠 {"Test Your Probability Skills"}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {/* {exercise.description ||
                            "Stay focused! Complete all questions within the time limit."} */}

                        Stay focused! Complete all questions within the time limit.
                    </p>
                    <TimerBar
                        durationInSeconds={duration}
                        className="mb-4 mt-2"
                        onCompleteAction={handleSubmit}
                    />
                </div>

                <ProgressIndicator
                    currentIndex={store.currentIndex}
                    length={store.questions.length}
                    // selections={store.selections}
                    updatedSelection={()=>{}}
                    isActive={true}
                />

                <QuestionCard
                    question={store.currentQuestion}
                    onAnswer={handleSaveAnswer}
                    selectedAnswer={store.getSelectionOption(
                        store.currentQuestion.id,
                    )}
                />

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <SecondaryButton
                        onClick={() => store.goPrev()}
                        disabled={store.isFirst}
                        type="button"
                    >
                        ← Previous
                    </SecondaryButton>

                    {!store.isLast ? (
                        <PrimaryButton
                            onClick={() => store.goNext()}
                            disabled={!store.canProceed}
                            type="button"
                        >
                            Next →
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton type="submit">✅ Submit</PrimaryButton>
                    )}
                </div>
            </form>
        </section>
    );
});

export default ExercisePlayer;
