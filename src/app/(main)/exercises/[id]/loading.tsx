import ExerciseLoader from "@/components/Exercises/ExercisePreloader";

export default function LoadingExercise() {
    return (
        <ExerciseLoader
            full
            label="Loading Your Exercise"
            description="Getting your probability questions ready... Almost there!"
        />
    );
}