import SectionTitle from "../Common/SectionTitle";
import { SingleModuleCard } from "../Module/SingleModule";
import { dummyModules } from "@/data/module";

export default function CourseModules() {
    return (
        <section
            id="modules"
            className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
        >
            <div className="container">
                <SectionTitle
                    title="Explore the Course Modules"
                    paragraph="Each module builds on core probability concepts with interactive lessons, real-life applications, and practice questions."
                    center
                />

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
                    {dummyModules.slice(0,6).map((module) => (
                        <div key={module.id} className="w-full">
                            <SingleModuleCard module={module} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
