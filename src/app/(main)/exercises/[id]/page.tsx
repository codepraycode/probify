/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import Spacer from "@/components/Common/Spacer";
import { QuestionCard } from "@/components/Exercises/QuestionCard";
import { TimerBar } from "@/components/Exercises/TimeBar";
import { QuestionAnswer, QuestionId } from "@/types/questions";
import ProgressIndicator from "@/components/Exercises/ProgressIndicator";
import { useExercise } from "@/lib/context/ExerciseContext";
import { observer } from "mobx-react-lite";
import { useNavigate } from "@/hooks/useNavigate";
// inside ExercisePlayer.tsx
// import { nanoid } from "nanoid"; // for dummy report id

function ExercisePlayer() {
    const reportId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const store = useExercise();
    const { navigate } = useNavigate();

    const handleAnswer = (id: QuestionId, value: QuestionAnswer) => {
        store.setSelection(id, value);
    };

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

    // timer state
    const timerDuration = 60 * 5; // 5 minutes
    const startTimeRef = useRef<number>(Date.now());

    const handleFinalSubmit = useCallback(() => {
        const endTime = Date.now();
        const totalTime = Math.floor((endTime - startTimeRef.current) / 1000);
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;

        const report = store.submitAnswers({
            duration: { minutes, seconds },
        });

        // const reportId = nanoid(); // You’ll eventually use a backend-generated ID
        // store.saveReport(reportId, report); // Hypothetical store method
        navigate(`/exercises/report?i=${reportId}`);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleFinalSubmit();
    };

    return (
        <>
            <Spacer />

            <section
                className="container min-h-[350px] max-w-2xl space-y-6 py-10"
                ref={containerRef}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            durationInSeconds={timerDuration}
                            className="mb-4 mt-2"
                            onComplete={handleFinalSubmit}
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
                        onAnswer={handleAnswer}
                        sourceAnswer={store.getSelectionOption}
                    />

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
                        <button
                            onClick={() => store.goPrev()}
                            disabled={store.isFirst}
                            className="rounded-xl bg-gray-300 px-4 py-2 text-black disabled:opacity-50 dark:bg-stroke-dark dark:text-white"
                            type="button"
                        >
                            ← Previous
                        </button>

                        {!store.isLast ? (
                            <button
                                onClick={() => store.goNext()}
                                className="rounded-xl bg-primary px-4 py-2 text-white shadow-btn hover:shadow-btn-hover disabled:opacity-50"
                                disabled={!store.canProceed}
                                type="button"
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="rounded-xl bg-green-600 px-4 py-2 text-white shadow-btn hover:bg-green-700"
                            >
                                ✅ Submit
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </>
    );
}

export default observer(ExercisePlayer);
