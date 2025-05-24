"use client";

import { createContext, useContext } from "react";
import { ExerciseStore } from "@/lib/store/ExerciseStore";
import questions from "@/data/questions.json";
import { QuestionDifficulty, QuestionType } from "@/types/questions";

const exerciseStore = new ExerciseStore(
    questions.map((question) => ({
        ...question,
        type: question.type as QuestionType,
        difficulty: question.type as QuestionDifficulty,
    }))
);

const ExerciseContext = createContext(exerciseStore);

export const useExercise = () => {
    const context = useContext(ExerciseContext)

    if (!context) {
        throw new Error("useExercise must be used within an ExerciseProvider");
    }

    return context;
};

export const ExerciseProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <ExerciseContext.Provider value={exerciseStore}>
        {children}
    </ExerciseContext.Provider>
);
