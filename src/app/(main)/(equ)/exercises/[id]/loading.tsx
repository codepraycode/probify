import PageLoader from "@/components/ui/PageLoader";

export default function LoadingExercise() {
    return (
        <PageLoader
            full
            icon="🎯"
            label="Loading Your Exercise"
            description="Getting your probability questions ready... Almost there!"
        />
    );
}