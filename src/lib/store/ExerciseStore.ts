import { makeAutoObservable, toJS } from "mobx";
import mockQuestions from "@/data/questions.json"
import { Question, QuestionAnswer, QuestionId, QuestionSelectedOption, QuestionType, QUESTION_TYPE_DELIMETER, ExerciseDuration, Report, BreakDown, ReportData } from "@/types/exercise.types";
import { ExerciseSetupFormValues, SubmittedAnswer } from "../schema/exerciseSchema";
import { wait } from "@/utils/functions";
import { EXERCISE_SETUP } from "@/data/links";
import { createTestSession, saveExerciseReport } from "@/actions/exercise.actions";

// TODO: Make this option user specific
export const topicOptions = [
    "All",
    "Probability",
    "Permutations",
    "Combinations",
    "Events",
    "Experiments",
];

export class ExerciseStore {
    questions:Question[] = [];
    currentIndex = 1;
    selections = new Map<QuestionId, QuestionSelectedOption>();



    constructor(questions: Question[]) {
        this.questions = questions.slice(1,5);
        // this.selections = [];
        makeAutoObservable(this);
    }

    get currentQuestion() {
        return toJS(this.questions[this.currentIndex]);
    }

    get isFirst() {
        return this.currentIndex === 0;
    }

    get isLast() {
        return this.currentIndex === this.questions.length - 1;
    }

    get canProceed() {
        const currentId = this.questions[this.currentIndex]?.id;
        // console.debug("canProceed", this.currentIndex, currentId, this.selections.has(currentId));
        return this.selections.has(currentId);
    }


    setSelection(id: QuestionId, value: QuestionAnswer) {
        this.selections.set(id, {
            id,
            value,
        });
    }

    getIsSelected = (id: QuestionId) => {
        return this.selections.has(id);
    }

    getSelectionOption = (id: QuestionId): QuestionSelectedOption | undefined => {
        return this.selections.get(id)
    }


    goNext() {
        if (!this.isLast) {
            this.currentIndex += 1;
        }
    }

    goPrev() {
        if (!this.isFirst) {
            this.currentIndex -= 1;
        }
    }

    async createExerciseSession(data: ExerciseSetupFormValues & {userId: string;}) {
        const {
            duration,
            questions,
            topics,
            type,
            userId
        } = data;

        // await wait(2);

        const dataToSubmit = {
            duration,
            questions,
            topics,
            type: type.split(QUESTION_TYPE_DELIMETER) as QuestionType[],
            userId

        }

        // console.debug("Session Data", dataToSubmit);

        return await createTestSession(dataToSubmit);
    }

    async submitAnswers({ duration, exerciseId, userId }: { duration: ExerciseDuration, exerciseId: string, userId:string; }) {
        const total = this.questions.length;
        let score = 0;

        const answers: SubmittedAnswer[] = [];
        // Compute topic breakdown
        const topicCounts = new Map<string, number>();

        for (const questionObj of this.questions) {
            const selection = this.selections.get(questionObj.id);

            const isCorrect = selection?.value === questionObj.answer;

            if (isCorrect) score++;

            answers.push({
                question: questionObj.question.katex,
                selected: selection?.value || "",
                correct: isCorrect,
                correctAnswer: questionObj.answer,
                hint: questionObj.hint.katex || "",
                questionType: questionObj.type,
            });


            // Use question.tags[0] as the primary topic

            const topic = questionObj.tags?.[0] ?? "General";
            topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
        }

        const accuracy = Number(((score / total) * 100).toFixed(2));

        const topics: BreakDown[] = Array.from(topicCounts.entries()).map(
            ([topic, count]) => ({ label:topic, count })
        );

        // Compute question type distribution
        const typeCounts = new Map<QuestionType, number>();
        for (const question of this.questions) {
            const type = question.type;
            typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
        }

        const types: BreakDown[] = Array.from(typeCounts.entries()).map(
            ([type, count]) => ({ label:type, count })
        );

        const report: ReportData = {
            score,
            total,
            accuracy,
            duration,
            answers,
            topics,
            types,
            userId
        };

        return await saveExerciseReport({...report, exerciseId})
    }


}
