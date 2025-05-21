import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { Module } from "@/types/module";
import { modulesData } from "@/data/module";

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
                    {modulesData.map((module) => (
                        <div key={module.id} className="w-full">
                            <SingleModule module={module} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const SingleModule = ({ module }: { module: Module }) => {
    const { title, image, description, estimatedTime, level, index } = module;

    return (
        <div
            className="wow fadeInUp group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark"
            data-wow-delay=".1s"
        >
            <div className="relative block aspect-[37/22] w-full">
                <Image src={image} alt={title} fill />
                <span className="absolute left-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                    Module {index}
                </span>
            </div>

            <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl">
                    {title}
                </h3>
                <p className="mb-6 border-b border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                    {description}
                </p>
                <div className="flex justify-between text-sm text-body-color">
                    <span>
                        Level: <strong>{level}</strong>
                    </span>
                    <span>⏱ {estimatedTime} min</span>
                </div>
            </div>
        </div>
    );
};
