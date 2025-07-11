import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { SingleModuleCard } from "@/components/Module/SingleModule";
import Paginator from "@/components/Common/Pagniator";
import { default_metadata } from "@/data/framework";
import Link from "next/link";
import { Plus } from "lucide-react";
import { loadModules } from "@/actions/modules.action";
import { EmptyModuleState, ModuleLoadError } from "@/components/Module/ModuleError";

export const metadata: Metadata = {
    title: "Modules - Probify",
    description:
        "Explore our comprehensive modules designed to help you master probability step by step.",
    ...default_metadata,
};

export default async function ModuleListPage({
    searchParams,
}: {
    searchParams?: Promise<{ page?: string }>;
}) {
    const currentPage = Number((await searchParams)?.page) || 1;
    const perPage = 6;

    const result = await loadModules(currentPage, perPage);

    return (
        <>
            <Breadcrumb
                pageName="Modules"
                description="Explore all available modules designed to help you master probability step by step."
                trail={[]}
                // actions={
                //     <Button asChild>
                //         <Link href="/modules/create">
                //             <Plus className="mr-2 h-4 w-4" />
                //             New Module
                //         </Link>
                //     </Button>
                // }
            />

            <section className="pb-[120px] pt-[20px]">
                <div className="container">
                    {!result.success ? (
                       <ModuleLoadError message={result.message}/>
                    ) : result.data.modules.length === 0 ? (
                        <EmptyModuleState />
                    ) : (
                        <>
                            <div className="-mx-4 flex flex-wrap justify-center">
                                {result.data.modules.map((module) => (
                                    <div
                                        key={module.id}
                                        className="mb-8 w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                                    >
                                        <SingleModuleCard
                                            module={module}
                                            // progress={module.progress}
                                        />
                                    </div>
                                ))}
                            </div>
{/* 
                            <Paginator
                                currentPage={currentPage}
                                // totalItems={result.data.total}
                                itemsPerPage={perPage}
                                baseUrl="/modules"
                                className="mt-8"
                            /> */}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

