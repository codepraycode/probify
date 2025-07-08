import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Question, QuestionAnswer, QuestionId, QuestionSelectedOption, QuestionType, QUESTION_TYPE_DELIMETER, ExerciseDuration, Report, BreakDown, ReportData } from "@/types/exercise.types";
import { ExerciseSetupFormValues, SubmittedAnswer } from "../schema/exerciseSchema";
import { createTestSession, saveExerciseReport } from "@/actions/exercise.actions";

type ExerciseStoreState = {
  status: 'idle' | 'loading' | 'submitting' | 'error';
  error?: string;
};

export class ExerciseStore {
    questions: Question[] = [];
    currentIndex = 0;
    selections = new Map<QuestionId, QuestionSelectedOption>();
    flaggedQuestions = new Set<QuestionId>();
    state: ExerciseStoreState = { status: 'idle' };
    
    constructor(questions: Question[]) {
        this.questions = questions;
        makeAutoObservable(this);
    }

    // ======================
    // Computed Properties
    // ======================

    get currentQuestion() {
        return this.questions[this.currentIndex];
    }

    get isFirst() {
        return this.currentIndex === 0;
    }

    get isLast() {
        return this.currentIndex === this.questions.length - 1;
    }

    get canProceed() {
        return this.selections.has(this.currentQuestion.id);
    }

    get progress() {
        return {
            current: this.currentIndex + 1,
            total: this.questions.length,
            percentage: Math.round(((this.currentIndex + 1) / this.questions.length) * 100),
        };
    }

    get scorePreview() {
        let correct = 0;
        this.questions.forEach(question => {
            const selection = this.selections.get(question.id);
            if (selection?.value === question.answer) correct++;
        });
        return {
            correct,
            total: this.questions.length,
            percentage: Math.round((correct / this.questions.length) * 100)
        };
    }

    // ======================
    // Actions
    // ======================
    checkIsFlagged(id:number): boolean {

        return this.flaggedQuestions.has(id);
    }

    setSelection(id: QuestionId, value: QuestionAnswer) {
        this.selections.set(id, { id, value });
    }

    toggleFlaggedQuestion(id: QuestionId) {
        if (this.flaggedQuestions.has(id)) {
            this.flaggedQuestions.delete(id);
        } else {
            this.flaggedQuestions.add(id);
        }
    }

  getSelectionOption(id: QuestionId): QuestionSelectedOption | undefined {
    return this.selections.get(id);
  }

  navigateToQuestion(index: number) {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
    }
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

  // ======================
  // API Operations
  // ======================
  async createExerciseSession(data: ExerciseSetupFormValues & { userId: string }) {
    this.state = { status: 'loading' };
    
    try {
      const { duration, questions, topics, type, userId } = data;
      
      const response = await createTestSession({
        duration,
        questions,
        topics,
        type: type.split(QUESTION_TYPE_DELIMETER) as QuestionType[],
        userId
      });

      runInAction(() => {
        this.state = { status: 'idle' };
      });

      return response;
    } catch (error) {
      runInAction(() => {
        this.state = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to create session'
        };
      });
      throw error;
    }
  }

  async submitAnswers(params: { 
    duration: ExerciseDuration, 
    exerciseId: string, 
    userId: string 
  }) {
    this.state = { status: 'submitting' };
    
    try {
      const { duration, exerciseId, userId } = params;
      const total = this.questions.length;
      let score = 0;
      const answers: SubmittedAnswer[] = [];
      const topicCounts = new Map<string, number>();
      const typeCounts = new Map<QuestionType, number>();

      // Calculate results
      this.questions.forEach(question => {
        const selection = this.selections.get(question.id);
        const isCorrect = selection?.value === question.answer;
        if (isCorrect) score++;

        answers.push({
          question: question.question.katex,
          selected: selection?.value || "",
          correct: isCorrect,
          correctAnswer: question.answer,
          hint: question.hint.katex || "",
          questionType: question.type,
        });

        // Track topics
        const topic = question.tags?.[0] ?? "General";
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);

        // Track types
        typeCounts.set(question.type, (typeCounts.get(question.type) || 0) + 1);
      });

      const accuracy = Number(((score / total) * 100).toFixed(2));
      
      const report: ReportData = {
        score,
        total,
        accuracy,
        duration,
        answers,
        topics: Array.from(topicCounts.entries()).map(([label, count]) => ({ label, count })),
        types: Array.from(typeCounts.entries()).map(([label, count]) => ({ label, count })),
        userId
      };

      const response = await saveExerciseReport({ ...report, exerciseId });

      runInAction(() => {
        this.state = { status: 'idle' };
      });

      return response;
    } catch (error) {
      runInAction(() => {
        this.state = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Submission failed'
        };
      });
      throw error;
    }
  }

  // ======================
  // Persistence Methods
  // ======================
  serialize() {
    return {
      questions: toJS(this.questions),
      currentIndex: this.currentIndex,
      selections: Array.from(this.selections.entries()),
      flaggedQuestions: Array.from(this.flaggedQuestions),
      state: toJS(this.state)
    };
  }

    loadProgress(data: {
    questions?: Question[];
    currentIndex?: number;
    selections?: [QuestionId, QuestionSelectedOption][] | Record<QuestionId, QuestionSelectedOption> | Map<QuestionId, QuestionSelectedOption>;
    flaggedQuestions?: QuestionId[] | Set<QuestionId>;
    }) {
    if (data.questions) this.questions = data.questions;
    if (data.currentIndex !== undefined) this.currentIndex = data.currentIndex;
    
    // Handle selections conversion
    if (data.selections) {
        if (data.selections instanceof Map) {
        this.selections = new Map(data.selections);
        } else if (Array.isArray(data.selections)) {
        this.selections = new Map(data.selections);
        } else if (typeof data.selections === 'object') {
        this.selections = new Map(Object.entries(data.selections) as unknown as [QuestionId, QuestionSelectedOption][]);
        } else {
        console.warn('Invalid selections format during loadProgress');
        this.selections = new Map();
        }
    } else {
        this.selections = new Map();
    }

    // Handle flaggedQuestions conversion
    if (data.flaggedQuestions) {
        this.flaggedQuestions = data.flaggedQuestions instanceof Set 
        ? new Set(data.flaggedQuestions) 
        : new Set(data.flaggedQuestions);
    } else {
        this.flaggedQuestions = new Set();
    }
    }

  // ======================
  // Utility Methods
  // ======================
  reset() {
    this.currentIndex = 0;
    this.selections.clear();
    this.flaggedQuestions.clear();
    this.state = { status: 'idle' };
  }
}