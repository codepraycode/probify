"use client";

import clsx from "clsx";
import Image from "next/image";
import { LeaderboardReport } from "@/types/user.types";
import { motion, AnimatePresence } from "framer-motion";
import { LeaderboardSkeleton } from "../ui/Skeleton";
import Paginator from "../Common/Pagniator";

type LeaderboardTableProps = {
    data: LeaderboardReport[];
    isLoading?: boolean;
    currentPage: number;
    totalPages: number;
    // onPageAction: (page: number) => void;
};

export function LeaderboardTable({
    data,
    isLoading,
    currentPage,
    totalPages,
    // onPageAction,
}: LeaderboardTableProps) {
    if (isLoading) return <LeaderboardSkeleton />;

    return (
        <div className="rounded-xl border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-bg-color-dark">
            {data.length === 0 ? (
                <EmptyLeaderboardState />
            ) : (
                <>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                            {data.map((user, index) => (
                                <motion.li
                                    key={user.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    }}
                                    className={clsx(
                                        "flex items-center justify-between py-4",
                                        index === 0
                                            ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-500 border-l-4 pl-4"
                                            : "",
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 overflow-hidden rounded-full border shadow-sm">
                                            {user.avatarUrl ? (
                                                <Image
                                                    src={user.avatarUrl}
                                                    alt="avatar"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 dark:bg-zinc-700">
                                                    <span className="text-lg font-bold">
                                                        {user.name?.charAt(0) ??
                                                            "U"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-dark dark:text-white">
                                                {user.name ?? "Anonymous"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                @{user.username ?? "not-set"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground sm:text-sm">
                                        <span title="Rank">🔥 #{user.rank}</span>
                                        <span title="Cumulative Score">
                                            📚 {user.cumulativeScore}
                                        </span>
                                        <span
                                            title="Accuracy"
                                            className="font-semibold text-blue-600 dark:text-blue-400"
                                        >
                                            🎯 {user.scorePercent}
                                        </span>
                                    </div>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                    <div className="pt-6">
                        <Paginator
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageAction={()=>{}}
                        />
                    </div>
                </>
            )}

        </div>
    );
}

function EmptyLeaderboardState() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-4xl">🫥</span>
            <p className="mt-4 text-sm text-muted-foreground">
                No leaderboard entries yet. Participate in exercises to show up
                here.
            </p>
        </div>
    );
}
