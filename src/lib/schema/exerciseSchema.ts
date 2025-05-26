import { MIN_EXERCISE_DURATION, MIN_EXERCISE_QUESTIONS } from "@/data/framework";
import { QuestionType, QuestionTypeLabels, QuestionTypes } from "@/types/exercise.types";
import { z } from "zod";


const questionTypeValues = Object.values(QuestionTypeLabels).map(e=>e.value) as [string, ...string[]];


export const ExerciseSetupSchema = z.object({
    questions: z.coerce.number().min(MIN_EXERCISE_QUESTIONS).max(50),
    duration: z.coerce.number().min(MIN_EXERCISE_DURATION).max(60),
    type: z.enum(questionTypeValues),
    topics: z.string({required_error: "A topic is required"}).array().min(1, "At least one topic is required"),
});

export type ExerciseSetupFormValues = z.infer<typeof ExerciseSetupSchema>;

export const SubmittedAnswerSchema = z.object({
    question: z.string({ required_error: "Question is required" }),
    questionType: z.enum(questionTypeValues, {
        required_error: "Question type is required",
    }),
    selected: z.string({ required_error: "Selected answer is required" }),
    correct: z.boolean({ required_error: "Correctness is required" }),
    correctAnswer: z.string({ required_error: "Correct answer is required" }),
    hint: z.string().optional(), // <- the only optional field
});

export type SubmittedAnswer = Required<z.infer<typeof SubmittedAnswerSchema>>;
