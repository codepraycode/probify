import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { SingleModuleCard } from "@/components/Module/SingleModule";
import Paginator from "@/components/Common/Pagniator";
import { default_metadata } from "@/data/framework";
import Link from "next/link";
import { Plus } from "lucide-react";
import { loadModules } from "@/actions/modules.action";

export const metadata: Metadata = {
    title: "Modules - Probify",
    description:
        "Explore our comprehensive modules designed to help you master probability step by step.",
    ...default_metadata,
};

export default async function ModuleListPage({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const currentPage = Number(searchParams?.page) || 1;
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
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <h3 className="mb-4 text-xl font-semibold text-red-500">
                                Failed to load modules
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {result.message}
                            </p>
                        </div>
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

function EmptyModuleState() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mx-auto max-w-md space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    No Modules Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Get started by creating your first learning module.
                </p>
                {/* <Button asChild className="mt-4">
                    <Link href="/modules/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Module
                    </Link>
                </Button> */}
            </div>
        </div>
    );
}
