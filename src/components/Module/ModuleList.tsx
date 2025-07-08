"use client";
import { TopicWithProgress } from "@/types/exercise.types";
import Link from "next/link";
import { Container, Divider, Title2 } from "../Common/DocContent";
import { CheckCircle, Lock } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { MODULE_TOPIC_PAGE_URL } from "@/data/links";
import { dummyTopics } from "@/data/module";
import { showNotImplementedToast } from "@/utils/toast";
import { TopicProgress } from "@/db/generated/prisma";
import clsx from "clsx";
import { Tooltip } from "../ui/Tooltip";
import { Progress } from "../ui/Progress";
import { useToast } from "@/hooks/useToast";
import { ArrowUpIcon, LockIcon } from "../ui/svg";

type ModuleTopicsListProps = {
    topics: TopicWithProgress[];
};


function Wrapper(props: PropsWithChildren){
    return (
        <div className="mx-auto max-w-4xl">
            <Divider />
            {props.children}
        </div>
    );
}

export default function ModuleTopicsList({ topics }: ModuleTopicsListProps) {
    // const topics: Topic[] = dummyTopics;

    let template = (
        <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center shadow-sm dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
            <div className="mb-6 inline-flex rounded-full bg-blue-50 p-4 dark:bg-blue-900/30">
                <LockIcon className="h-10 w-10 text-blue-500 dark:text-blue-400" />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                Module Locked
            </h2>

            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                Complete the previous modules to unlock this content
            </p>

            <div className="inline-flex animate-bounce items-center gap-2 font-medium text-blue-600 dark:text-blue-400">
                <ArrowUpIcon className="h-5 w-5" />
                <span>Keep going - you&apos;re making progress!</span>
            </div>

            {/* <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Currently completed: {completedModules}/{totalModules}{" "}
                    modules
                </p>
                <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{
                            width: `${(completedModules / totalModules) * 100}%`,
                        }}
                    />
                </div>
            </div> */}
        </div>
    );

    if (topics.length >= 1) template = (
        <>
            <Title2>Topics Covered in This Module</Title2>
            <br />
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {topics.map((topic, idx) => (
                    <ModuleTopic topic={topic} key={idx} />
                ))}
            </div>
        </>
    );
    return (
        <Wrapper>
        
            {template}
        </Wrapper>
    );
}

type ModuleTopicProps = {
    topic: TopicWithProgress;
    className?: string;
};
// TODO: FIX!!!!

export function ModuleTopic({ topic, className }: ModuleTopicProps) {
    const [isHovered, setIsHovered] = useState(false);

    // const {toast} = useToast();

    // if (!isTopicWithProgress(topic)) {
    //     console.error("Invalid topic data:", topic);
    //     return null;
    // }

    const { progress = null, locked = false } = topic;
    const completed = progress?.completed ?? false;
    const completionDate = progress?.completedAt
        ? new Date(progress.completedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : null;

    const showProgressBar =
        progress && progress.score > 0 && progress.score <= 100;
    const difficultyColor = {
        Easy: "text-emerald-500",
        Medium: "text-amber-500",
        Hard: "text-rose-500",
    }[topic.difficulty || "Easy"];

    const handleLockedClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // toast({
        //     title: "Topic Locked",
        //     description: "Complete the previous topics to unlock this content.",
        //     variant: "default",
        // });
    };

    return (
        <article
            className={clsx(
                "group relative overflow-hidden rounded-xl border transition-all",
                "border-gray-200 bg-white shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800",
                "hover:-translate-y-1 hover:border-purple-400 hover:shadow-purple-100 dark:hover:border-purple-600 dark:hover:bg-gray-700",
                locked ? "cursor-not-allowed opacity-80" : "cursor-pointer",
                className,
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link
                href={MODULE_TOPIC_PAGE_URL(topic.slug)}
                onClick={locked ? handleLockedClick : undefined}
                className="block h-full p-6"
                aria-disabled={locked}
            >
                {/* Difficulty Badge */}
                <div className="absolute left-4 top-4">
                    <span
                        className={clsx(
                            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                            difficultyColor,
                            "bg-opacity-20 dark:bg-opacity-20",
                            completed
                                ? "bg-emerald-500"
                                : locked
                                  ? "bg-gray-500"
                                  : "bg-purple-500",
                        )}
                    >
                        {topic.difficulty || "Easy"}
                    </span>
                </div>

                {/* Status Indicator */}
                <div className="absolute right-4 top-4 flex items-center gap-2">
                    {locked ? (
                        <Tooltip>
                            <span>Complete previous topics to unlock</span>
                            <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                <Lock className="h-3 w-3" />
                                <span>Locked</span>
                            </div>
                        </Tooltip>
                    ) : // </Tooltip>
                    completed ? (
                        <Tooltip>
                            <span>Completed on ${completionDate}</span>
                            <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                                <CheckCircle className="h-3 w-3" />
                                <span>Completed</span>
                            </div>
                        </Tooltip>
                    ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    )}
                </div>

                {/* Content */}
                <div className="mt-8 space-y-3">
                    <h3
                        className={clsx(
                            "text-lg font-semibold transition-colors",
                            "text-gray-900 group-hover:text-purple-700 dark:text-gray-100 dark:group-hover:text-purple-400",
                            locked && "text-gray-500 dark:text-gray-400",
                        )}
                    >
                        {topic.title}
                    </h3>

                    <p
                        className={clsx(
                            "line-clamp-2 text-sm",
                            locked
                                ? "text-gray-400 dark:text-gray-500"
                                : "text-gray-600 dark:text-gray-400",
                        )}
                    >
                        {topic.description}
                    </p>

                    {/* Tags */}
                    {topic.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {topic.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Progress Bar */}
                    {showProgressBar && (
                        <div className="pt-4">
                            <div className="mb-1.5 flex items-center justify-between text-xs">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Progress
                                </span>
                                <span className="font-medium text-purple-600 dark:text-purple-400">
                                    {Math.round(progress.score)}%
                                </span>
                            </div>
                            <Progress
                                value={progress.score}
                                className="h-2 bg-gray-200 dark:bg-gray-700"
                                style={{ backgroundImage: 'linear-gradient(to right, #a855f7, #9333ea)' }}
                            />
                        </div>
                    )}
                </div>

                {/* Hover Effect */}
                <div
                    className={clsx(
                        "absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 to-transparent opacity-0 transition-opacity",
                        "dark:from-purple-900/20",
                        isHovered && !locked && "opacity-100",
                    )}
                />
            </Link>
        </article>
    );
}