export type QuestionAnswer = string;
export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionTag = string[];
export type QuestionType = "mcq" | "fill";
export type QuestionOption = {
    plain: string;
    katex: string;
};

export type Question = {
    id: number,
    type: QuestionType,
    question: QuestionOption,
    options: QuestionOption[],
    answer: QuestionAnswer,
    hint: QuestionOption,
    difficulty: QuestionDifficulty,
    tags: QuestionTag;
}