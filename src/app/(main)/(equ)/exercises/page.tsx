import Breadcrumb from "@/components/Common/Breadcrumb";
import { ExerciseList } from "@/components/Exercises/ExerciseList";
import PageLoader from "@/components/ui/PageLoader";
import { Suspense } from "react";

export default function ExercisePage() {
    return (
        <section className="container space-y-10 py-10">
            {/* <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
                🎯 Exercises Dashboard
            </h1> */}

            <Breadcrumb
                pageName="🎯 Your Exercises"
                description="Practice makes perfect! Here are your exercises to master probability."
                trail={[]}
            />

            <Suspense
                fallback={
                    <PageLoader
                        icon="🎯"
                        label="Loading your exercises"
                        description="Hold on tight!"
                    />
                }
            >
                <ExerciseList />
            </Suspense>
        </section>
    );
}


