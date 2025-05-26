/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useNavigate } from "@/hooks/useNavigate";
import { useExercise } from "@/lib/context/ExerciseContext";
import { Exercise, ExerciseWithReport, QuestionAnswer, QuestionId } from "@/types/exercise.types";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { TimerBar } from "./TimeBar";
import ProgressIndicator from "./ProgressIndicator";
import { QuestionCard } from "./QuestionCard";
import { PrimaryButton, SecondaryButton } from "../ui/Button";;
import { EXERCISE_REPORT_REF_URL } from "@/data/links";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { calculateExerciseDuration } from "@/utils/functions";

type Props = {
    exercise: Exercise;
}

function ExercisePlayer(props: Props) {
    const { exercise } = props;

    const toastId = exercise.id;

    const containerRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef<number>(Date.now());
    const testFormRef = useRef<HTMLFormElement>(null);

    const store = useExercise();
    const { navigate } = useNavigate();

    const duration = useMemo(()=>{
        return calculateExerciseDuration(exercise.duration);
    }, [exercise.duration]);

    const handleSaveAnswer = (id: QuestionId, value: QuestionAnswer) => {
        store.setSelection(id, value);
    };

    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        e?.preventDefault();

        const endTime = Date.now();
        const totalTime = Math.floor((endTime - startTimeRef.current) / 1000);
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;

        const {success, message, data: reportId} = await store.submitAnswers({
            duration: { minutes, seconds },
            exerciseId: exercise.id,
        });

        if (!success) {
            // Handle error, show message to user
            showErrorToast(message, toastId);
            return;
        }

        showSuccessToast(message, toastId);
        navigate(EXERCISE_REPORT_REF_URL(reportId));
    }, []);

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") store.goNext();
        if (e.key === "ArrowLeft") store.goPrev();
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, []);

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [store.currentIndex]);

    return (
        <section
            className="container min-h-[350px] max-w-2xl space-y-6 py-10"
            ref={containerRef}
        >
            <form onSubmit={handleSubmit} className="space-y-6" ref={testFormRef}>
                <div className="sticky top-0 z-20 rounded-md p-2 shadow-sm backdrop-blur-md">
                    <h1 className="text-heading text-2xl font-bold dark:text-white">
                        🧠 Test Your Probability Skills
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Stay focused! Complete all questions within the time
                        limit.
                    </p>
                    <br />
                    <TimerBar
                        durationInSeconds={duration}
                        className="mb-4 mt-2"
                        onCompleteAction={handleSubmit}
                    />
                </div>

                <ProgressIndicator
                    currentIndex={store.currentIndex}
                    length={store.questions.length}
                    updatedSelection={() => {}}
                    isActive={false}
                />

                <QuestionCard
                    question={store.currentQuestion}
                    onAnswer={handleSaveAnswer}
                    sourceAnswer={store.getSelectionOption}
                />

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <SecondaryButton
                        onClick={() => store.goPrev()}
                        disabled={store.isFirst}
                        className="rounded-xl bg-gray-300 px-4 py-2 text-black disabled:opacity-50 dark:bg-stroke-dark dark:text-white"
                        type="button"
                    >
                        ← Previous
                    </SecondaryButton>

                    {!store.isLast ? (
                        <PrimaryButton
                            onClick={() => store.goNext()}
                            className="rounded-xl bg-primary px-4 py-2 text-white shadow-btn hover:shadow-btn-hover disabled:opacity-50"
                            disabled={!store.canProceed}
                            type="button"
                        >
                            Next →
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton
                            type="submit"
                            className="rounded-xl bg-green-600 px-4 py-2 text-white shadow-btn hover:bg-green-700"
                        >
                            ✅ Submit
                        </PrimaryButton>
                    )}
                </div>
            </form>
        </section>
    );
}

export default observer(ExercisePlayer);