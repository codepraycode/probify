import ExerciseLoader from "@/components/Exercises/ExercisePreloader";

export default function LoadingExercise() {
    return (
        <ExerciseLoader
            full
            label="Loading Report"
            description="Hold on tight, we are preparing your exercise report... Just a moment!"
        />
    );
}