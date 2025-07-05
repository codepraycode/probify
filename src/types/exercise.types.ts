import { ExerciseSession, ExerciseReport, Topic as DbTopic, TopicProgress } from "@/db/generated/prisma";
import { SubmittedAnswer } from "@/lib/schema/exerciseSchema";


export type CreateExerciseSessionData = Pick<ExerciseSession, "duration" | "questions" | "topics" | "type">

export type ExerciseDuration = {
    minutes: number;
    seconds: number;
}; 

export type Report = ExerciseReport;
export type ReportData = Omit<ExerciseReport, "id" | "createdAt" | "updatedAt" | "answers"> & { answers: SubmittedAnswer[] };

export type Exercise = ExerciseSession; 
export type ExerciseWithReport = Exercise & {report: Report};

export const QuestionTypes = {
    mcq: "mcq",
    fill: "fill",
} as const;

export type QuestionType = (keyof typeof QuestionTypes);
export type LabelQuestionType = (keyof typeof QuestionTypes) | "both";

export const QUESTION_TYPE_DELIMETER = ",";

export const QuestionTypeLabels: Record<LabelQuestionType, {simple:string; verbose:string; value: string}> = {
    mcq: {
        simple: "📝 MCQ",
        verbose: "Multiple Choice",
        value: QuestionTypes.mcq,
    },
    fill: {
        simple: "✍️ Fill",
        verbose: "Fill in the Blank",
        value: QuestionTypes.fill,
    },
    both: {
        simple: "🔀 Both",
        verbose: "Both",
        value: Object.values(QuestionTypes).join(QUESTION_TYPE_DELIMETER),
    }
};



export type QuestionAnswer = string;
export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionTag = string[];
export type QuestionId = number;
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

export type BreakDown = {
    label: string;
    count: number;
}

// ||||||||||||||||  Modules ||||||||||||

export type Module = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  isLocked?: boolean;
  isPassed?: boolean;
  scorePercent?: number;
};

export type Topic = DbTopic;
export type TopicWithProgress = Topic & {
  progress?: TopicProgress | null;
};
