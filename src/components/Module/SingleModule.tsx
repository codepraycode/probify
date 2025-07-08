"use client";
import { MODULE_PAGE_URL } from "@/data/links";
import { ModuleMeta as Module } from "@/types/exercise.types";
import Link from "next/link";
import { ImageWithFallback } from "../Common/ImageWithFallback";
import clsx from "clsx";
import { CheckCircle, Lock } from "lucide-react";
import { showErrorToast } from "@/utils/toast";
import { ModuleWithProgress } from "@/types/exercise.types";

export const SingleModuleCard = ({ module }: { module: ModuleWithProgress }) => {
    const {
        id,
        title,
        slug,
        // thumbnail,
        description,
        // level,
        // estimatedTime,
        // isLocked,
        // isPassed,
        // scorePercent,
        
        locked: isLocked,
    } = module;


    const level="available";

    const isPassed = false;

    const scorePercent = 0;
    const estimatedTime = "10 minutes";

    const thumbnail = "/images/modules/probability-intro.jpg";

    return (
        <div
            className={clsx(
                "group relative overflow-hidden rounded-xl bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark",
                "transition-all",
            )}
            data-wow-delay=".1s"
        >
            <Link
                href={MODULE_PAGE_URL(slug)}
                onClick={(e) => {
                    if (!isLocked) return;

                    e.preventDefault();
                    showErrorToast(
                        "This module is locked. Please complete previous modules to unlock it.",
                        id,
                    );
                }}
                className="relative block aspect-[37/22] w-full"
            >
                <span className="absolute right-4 top-4 z-20 inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-xs font-semibold capitalize text-white">
                    {level}
                </span>

                <ImageWithFallback
                    src={thumbnail}
                    alt={title}
                    fill
                    className={clsx("object-contain", isLocked && "opacity-30")}
                />

                {isLocked && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 text-white">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <Lock className="h-4 w-4" />
                            Locked
                        </div>
                    </div>
                )}

                {isPassed && !isLocked && (
                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 rounded-full bg-green-600 px-3 py-1.5 text-xs font-medium text-white shadow">
                        <CheckCircle className="h-4 w-4" />
                        {`Passed${scorePercent ? ` • ${scorePercent}%` : ""}`}
                    </div>
                )}
            </Link>

            <div className="p-6 sm:p-8">
                <h3>
                    <Link
                        href={MODULE_PAGE_URL(slug)}
                        onClick={(e) => {
                            if (!isLocked) return;

                            e.preventDefault();
                            showErrorToast(
                                "This module is locked. Please complete previous modules to unlock it.",
                                id,
                            );
                        }}
                        className={clsx(
                            "mb-3 block text-xl font-bold text-black   ",
                            {
                                "hover:text-primary dark:hover:text-primary":
                                    !isLocked,
                                "dark:text-white": !isLocked,
                                "dark:text-muted-foreground": isLocked,
                            },
                        )}
                    >
                        {title}
                    </Link>
                </h3>
                <p
                    className={clsx(
                        "mb-5 line-clamp-3 text-sm text-body-color ",
                        {
                            "dark:text-body-color-dark": !isLocked,
                            "dark:text-muted-foreground": isLocked,
                        },
                    )}
                >
                    {description}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <svg
                        className="h-4 w-4 text-body-color"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                        />
                    </svg>
                    <span>{estimatedTime}</span>
                </div>
            </div>
        </div>
    );
};
