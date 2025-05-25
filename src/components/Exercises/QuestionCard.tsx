"use client";

import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import clsx from "clsx";
import { Question, QuestionAnswer, QuestionId, QuestionOption, QuestionSelectedOption } from "@/types/exercise.types";
import { observer } from "mobx-react-lite";

type QuestionCardProps = {
    question: Question;
    sourceAnswer: (id: QuestionId) => QuestionSelectedOption | undefined;
    onAnswer: (id: QuestionId, value: QuestionAnswer) => void;
};

export const QuestionCard = observer(({
    question: questionObj,
    onAnswer,
    sourceAnswer,
}: QuestionCardProps) => {
    const { type, question, options } = questionObj;
    const selectedOption = sourceAnswer(questionObj.id);


    return (
        <div className="space-y-6 rounded-2xl border border-stroke p-6 shadow-two dark:border-stroke-dark dark:bg-dark">
            <div className="font-heading text-lg leading-relaxed text-black dark:text-white">
                {/* Check if question contains LaTeX markers like $...$ */}
                {parseQuestionText(question)}
            </div>

            {type === "mcq" && (
                <div className="grid gap-4 sm:grid-cols-2">
                    {options.map((opt, idx) => {
                        const isSelected = selectedOption?.value === opt.plain;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => onAnswer(
                                    questionObj.id,
                                    opt.plain
                                )}
                                className={clsx(
                                    "rounded-xl border px-4 py-3 text-left transition duration-150",
                                    {
                                        "border-primary bg-primary/10 text-primary shadow-btn": isSelected,
                                        "border-gray-300 bg-white hover:bg-gray-100 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-gray-800": !isSelected
                                    }
                                )}
                            >
                                {/* <InlineMath math={opt} /> */}

                                {parseQuestionText(opt)}
                            </button>
                        );
                    })}
                </div>
            )}

            {type === "fill" && (
                <input
                    type="text"
                    placeholder="Type your answer here..."
                    value={selectedOption?.value || ""}
                    onChange={(e) =>
                        onAnswer(
                            questionObj.id,
                            e.target.value,
                        )
                    }
                    className="w-full rounded-xl border border-stroke px-4 py-3 text-black shadow-sm focus:border-primary focus:outline-none dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                />
            )}
        </div>
    );
})

function parseQuestionText(data: QuestionOption) {
    const {
        katex: unraw
    } = data;
    
    const parts = unraw.split(/(\$[^$]*\$)/g); // Split on $...$
    return parts.map((part, index) => {
        if (part.startsWith("$") && part.endsWith("$")) {
            return <InlineMath key={index} math={part.slice(1, -1)} />;
        }
        return <span key={index}>{part}</span>;
    });
}
