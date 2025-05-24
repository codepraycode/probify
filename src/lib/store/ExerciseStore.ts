import { makeAutoObservable, toJS } from "mobx";
import mockQuestions from "@/data/questions.json"
import { Question, QuestionAnswer,QuestionReport, QuestionId, QuestionSelectedOption } from "@/types/questions";
export class ExerciseStore {
    questions:Question[] = [];
    currentIndex = 1;
    selections = new Map<QuestionId, QuestionSelectedOption>();

    constructor(questions: Question[]) {
        this.questions = questions;
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
        console.debug("canProceed", this.currentIndex, currentId, this.selections.has(currentId));
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

    submitAnswers({duration }: {duration:QuestionReport["duration"]}) {
        const answerList = Array.from(this.selections.entries()).map(([id, value]) => ({ id, value }));
        alert("Submit answers: " + JSON.stringify(answerList, null, 4));
    }

}
