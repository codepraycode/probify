"use client";
import { Topic } from "@/types/exercise.types";
import Link from "next/link";
import { Container, Title2 } from "../Common/DocContent";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { MODULE_TOPIC_PAGE_URL } from "@/data/links";
import { dummyTopics } from "@/data/module";
import { showNotImplementedToast } from "@/utils/toast";

type ModuleTopicsListProps = {
    moduleSlug: string;
    
};

export default function ModuleTopicsList({
    moduleSlug,
}: ModuleTopicsListProps) {
    const topics: Topic[] = dummyTopics;
    return (
        <>
            <div className="mx-auto max-w-4xl">
                {/* <h2 className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl">
                    Topics Covered in This Module
                </h2> */}

                <Title2>Topics Covered in This Module</Title2>
                <br />
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {topics.map((topic, idx) => (
                        <ModuleTopic
                            topic={topic}
                            link={MODULE_TOPIC_PAGE_URL(topic.slug)}
                            key={idx}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export function ModuleTopic({ topic, link }: { topic: Topic; link: string }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const completed = topic.completed;
    const locked = topic.locked;
    const showProgress =
        topic.progress !== undefined &&
        topic.progress <= 100 &&
        topic.progress > 0;

    const formattedDate = topic.completedAt
        ? new Date(topic.completedAt).toLocaleDateString()
        : "";

    return (
        <Link
            href={link}
            onClick={(e)=>{
                if (locked) {
                    e.preventDefault();
                    showNotImplementedToast(topic.slug+'toast')
                }
            }}
            className={("group relative block rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800")}
        >
            {/* Completed badge */}
            {completed && (
                <div
                    className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 shadow-sm transition-opacity duration-300 dark:bg-green-900 dark:text-green-300"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <CheckCircle className="h-4 w-4" />
                    Completed
                    {/* Tooltip */}
                    {showTooltip && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-max max-w-xs rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-md dark:bg-gray-700">
                            {formattedDate
                                ? `Completed on ${formattedDate}`
                                : "Completed"}
                        </div>
                    )}
                </div>
            )}
            { locked && (
                <div
                    className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white shadow-sm transition-opacity duration-300"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <CheckCircle className="h-4 w-4" />
                    Locked
                    {/* Tooltip */}
                    {showTooltip && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-max max-w-xs rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-md dark:bg-gray-700">
                            Complete preceeding topic to unlock
                        </div>
                    )}
                </div>
            )}

            <h3 className="mb-2 text-lg font-semibold text-purple-700 group-hover:text-purple-900 dark:text-purple-300 dark:group-hover:text-purple-100">
                {topic.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {topic.description}
            </p>

            {/* Progress bar */}
            {showProgress && (
                <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Progress</span>
                        <span>{topic.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                            className="h-full rounded-full bg-purple-500 transition-all duration-500"
                            style={{ width: `${topic.progress}%` }}
                        />
                    </div>
                </div>
            )}
        </Link>
    );
}
