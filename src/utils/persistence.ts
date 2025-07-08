export const saveProgressToLocalStorage = (exerciseId: string, data: {
  selections: Record<string, any>;
  currentIndex: number;
  flaggedQuestions: number[];
}) => {
  try {
    localStorage.setItem(`exercise-progress-${exerciseId}`, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
};

export const loadProgressFromLocalStorage = (exerciseId: string) => {
  try {
    const saved = localStorage.getItem(`exercise-progress-${exerciseId}`);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Failed to load progress:", error);
    return null;
  }
};