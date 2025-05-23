import Breadcrumb from "@/components/Common/Breadcrumb";
import { ExerciseList } from "@/components/Exercises/ExerciseList";

export default function ModulePage() {
    const moduleId = "moduleId"; // Replace with actual module ID logic
    return (
        <>
            <Breadcrumb
                pageName="🎯 Exercises"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
            />
            <section className="container space-y-6 py-10">
                <ExerciseList />
            </section>
        </>
    );
}
