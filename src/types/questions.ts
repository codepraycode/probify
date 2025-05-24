export type QuestionAnswer = string;
export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionTag = string[];
export type QuestionId = number;
export type QuestionType = "mcq" | "fill";
export type QuestionOption = {
    plain: string;
    katex: string;
};
export type QuestionSelectedOption = {
    id: QuestionId;
    value: QuestionOption["plain"];
};

export type Question = {
    id: QuestionId,
    type: QuestionType,
    question: QuestionOption,
    options: QuestionOption[],
    answer: QuestionAnswer,
    hint: QuestionOption,
    difficulty: QuestionDifficulty,
    tags: QuestionTag;
}


export type QuestionReport = {
    score: number;
    total: number;
    accuracy: number;
    duration: {
        minutes: number;
        seconds: number;
    };
    breakdown: {
        topic: string;
        count: number;
    }[];
    questionTypes: {
        type: QuestionType;
        count: number;
    }[];
    answers: {
        questionId: QuestionId;
        selection: QuestionSelectedOption;
        correct: boolean;
        answer: QuestionAnswer;
        hint: QuestionOption;
    }[];
}
