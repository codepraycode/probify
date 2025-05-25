import { QuestionType, QuestionTypeLabels, QuestionTypes } from "@/types/exercise.types";
import { z } from "zod";

export const ExerciseSetupSchema = z.object({
    questions: z.coerce.number().min(1).max(50),
    duration: z.coerce.number().min(1).max(60),
    type: z.enum(Object.values(QuestionTypeLabels).map(e=>e.value) as [string, ...string[]]),
    topics: z.string({required_error: "A topic is required"}).array().min(1, "At least one topic is required"),
});

export type ExerciseSetupFormValues = z.infer<typeof ExerciseSetupSchema>;
