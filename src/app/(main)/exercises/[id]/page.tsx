"use client";

import { useEffect, useRef, useState } from "react";
import Spacer from "@/components/Common/Spacer";
import { QuestionCard } from "@/components/Exercises/QuestionCard";
import { TimerBar } from "@/components/Exercises/TimeBar";
import mockQuestions from "@/data/questions.json"; // Assuming you have a JSON file with your questions
import { QuestionOption } from "@/types/questions";

// const mockQuestions = [
//     {
//         id: 1,
//         type: "mcq",
//         question:
//             "What is the probability of getting a head in a single coin toss?",
//         options: [
//             "$\\frac{1}{2}$",
//             "$\\frac{1}{3}$",
//             "$\\frac{1}{4}$",
//             "$\\frac{2}{3}$",
//         ],
//     },
//     {
//         id: 2,
//         type: "fill",
//         question: "A standard die has $\\underline{\\quad}$ faces.",
//     },
//     {
//         id: 3,
//         type: "mcq",
//         question: "Which of these is NOT a valid probability?",
//         options: ["$0$", "$1$", "$-0.5$", "$0.8$"],
//     },
// ];


export default function ExercisePlayer() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>(
        Array(mockQuestions.length).fill(""),
    );
    const currentQuestion = mockQuestions[currentIndex];

    const containerRef = useRef<HTMLDivElement>(null);

    const handleAnswer = (answer: QuestionOption) => {
        const updated = [...answers];
        updated[currentIndex] = answer.plain;
        setAnswers(updated);
    };

    const goTo = (dir: "next" | "prev") => {
        setCurrentIndex((prev) => {
            const nextIndex =
                dir === "next"
                    ? Math.min(prev + 1, mockQuestions.length - 1)
                    : Math.max(prev - 1, 0);
            return nextIndex;
        });
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") goTo("next");
        if (e.key === "ArrowLeft") goTo("prev");
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, []);

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentIndex]);

    const isLast = currentIndex === mockQuestions.length - 1;
    const isFirst = currentIndex === 0;

    return (
        <>
            <Spacer />

            <section
                className="container max-w-2xl space-y-6 py-10 min-h-[350px]"
                ref={containerRef}
            >
                <header className="sticky top-0 z-10">
                    <h1 className="text-heading text-2xl font-bold dark:text-white">
                        🧠 Test Your Probability Skills
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Stay focused! Complete all questions within the time
                        limit.
                    </p>
                    <br />
                    <TimerBar durationInSeconds={60 * 5} />
                </header>

                <div className="flex items-center justify-between text-sm text-body-color dark:text-body-color-dark">
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
                </div>

                <QuestionCard
                    // type={currentQuestion.type}
                    question={currentQuestion as any}
                    // options={currentQuestion.options}
                    // selectedOption={answers[currentIndex]}
                    // currentAnswer={answers[currentIndex]}
                    onAnswer={handleAnswer}
                />

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <button
                        onClick={() => goTo("prev")}
                        disabled={isFirst}
                        className="rounded-xl bg-gray-300 px-4 py-2 text-black disabled:opacity-50 dark:bg-stroke-dark dark:text-white"
                    >
                        ← Previous
                    </button>

                    {!isLast ? (
                        <button
                            onClick={() => goTo("next")}
                            className="rounded-xl bg-primary px-4 py-2 text-white shadow-btn hover:shadow-btn-hover disabled:opacity-50"
                            disabled={!answers[currentIndex]} // optional: force answer before next
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                alert(
                                    "Submit answers: " +
                                        JSON.stringify(answers),
                                )
                            }
                            className="rounded-xl bg-green-600 px-4 py-2 text-white shadow-btn hover:bg-green-700"
                        >
                            ✅ Submit
                        </button>
                    )}
                </div>
            </section>
        </>
    );
}
