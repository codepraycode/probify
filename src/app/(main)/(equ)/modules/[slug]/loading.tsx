import ModuleLoader from "@/components/ui/PageLoader";

export default function LoadingModule() {
    return (
        <ModuleLoader
            full
            label="Loading Module Information"
            description="Hold on a sec..."
        />
    );
}