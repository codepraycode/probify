

import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { SingleModuleCard } from "@/components/Module/SingleModule";
import { dummyModules } from "@/data/module";
import Paginator from "@/components/Common/Pagniator";
import { default_metadata } from "@/data/framework";

export const metadata: Metadata = {
    title: "Modules - Probify",
    description: "Explore our comprehensive modules designed to help you master probability step by step. Each module contains structured lessons, practice questions, and progress tracking.",
    ...default_metadata
};

const ModuleListPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Modules"
                description="Explore all available modules designed to help you master probability step by step. Each module contains structured lessons, practice questions, and progress tracking."
                trail={[]}
            />

            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        {dummyModules.map((eachModule) => (
                            <div
                                key={eachModule.id}
                                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                            >
                                <SingleModuleCard module={eachModule} />
                            </div>
                        ))}
                    </div>

                    {/* <Paginator

                    /> */}
                </div>
            </section>
        </>
    );
};

export default ModuleListPage;

