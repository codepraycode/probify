import { makeAutoObservable, toJS } from "mobx";
import mockQuestions from "@/data/questions.json"
import { Question, QuestionAnswer,QuestionReport, QuestionId, QuestionSelectedOption, QuestionType } from "@/types/questions";
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

    submitAnswers({ duration }: { duration: QuestionReport["duration"] }): QuestionReport {
        const total = this.questions.length;
        let score = 0;

        const answers: QuestionReport["answers"] = [];

        for (const question of this.questions) {
            const selection = this.selections.get(question.id);

            const isCorrect = selection?.value === question.answer;
            if (isCorrect) score++;

            answers.push({
                questionId: question.id,
                selection: selection!,
                correct: isCorrect,
                answer: question.answer,
                hint: question.hint,
            });
        }

        const accuracy = Number(((score / total) * 100).toFixed(2));

        // Compute topic breakdown
        const topicCounts = new Map<string, number>();
        // Use question.tags[0] as the primary topic
        for (const question of this.questions) {
            const topic = question.tags?.[0] ?? "General";
            topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
        }

        const breakdown: QuestionReport["breakdown"] = Array.from(topicCounts.entries()).map(
            ([topic, count]) => ({ topic, count })
        );

        // Compute question type distribution
        const typeCounts = new Map<QuestionType, number>();
        for (const question of this.questions) {
            const type = question.type;
            typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
        }

        const questionTypes: QuestionReport["questionTypes"] = Array.from(typeCounts.entries()).map(
            ([type, count]) => ({ type, count })
        );

        const report: QuestionReport = {
            score,
            total,
            accuracy,
            duration,
            breakdown,
            questionTypes,
            answers,
        };

        return report;
    }


}
