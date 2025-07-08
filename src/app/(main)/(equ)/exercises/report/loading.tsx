import PageLoader from "@/components/ui/PageLoader";

export default function LoadingExercise() {
    return (
        <PageLoader
            icon="📊"
            full
            label="Loading Report"
            description="Hold on tight, we are preparing your exercise report... Just a moment!"
        />
    );
}