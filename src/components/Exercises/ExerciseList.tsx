"use client";
import { ExerciseCard } from "./ExerciseItem";

const mockExercises = [
    { title: "Basic Probability", duration: 5, status: "completed" },
    { title: "Tree Diagrams", duration: 8, status: "unlocked" },
    { title: "Conditional Prob.", duration: 10, status: "locked" },
];

export function ExerciseList() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockExercises.map((ex, idx) => (
                <ExerciseCard
                    key={idx}
                    title={ex.title}
                    duration={ex.duration}
                    status={ex.status as any}
                    onStart={() => alert(`Starting ${ex.title}`)}
                />
            ))}
        </div>
    );
}
