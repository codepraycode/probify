import { loadModules } from "@/actions/modules.action";
import SectionTitle from "../Common/SectionTitle";
import { SingleModuleCard } from "../Module/SingleModule";
import { EmptyModuleState, ModuleLoadError } from "../Module/ModuleError";

export default async function CourseModules() {

    const {success, message, data} = await loadModules(1, 3);

    let template = <EmptyModuleState />;

    
    
    if (!success) {
        template = <ModuleLoadError message={message}/>
    } else if (!data || !data.modules) {
        template = null;
    } else {

        template = (
            <div className="container">
                <SectionTitle
                    title="Explore the Course Modules"
                    paragraph="Each module builds on core probability concepts with interactive lessons, real-life applications, and practice questions."
                    center
                />
    
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
                    {data.modules.map((module) => (
                        <div key={module.id} className="w-full">
                            <SingleModuleCard module={module} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <section
            id="modules"
            className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
        >
         {template}   
        </section>
    );
};
