"use client";

import Image from "next/image";
import clsx from "clsx";
import { dummyUsers } from "@/data/dummy";
import { User, UserProgress } from "@/types/user.types";
import { Container } from "../Common/DocContent";

type UserProfileProps = {
    user: User;
    report: {
        _count?: {
            completedTopics?: number;
            exerciseReports?: number;
        };
        averageScore?: number;
        rank?: number;
    };
};

export default function UserProfileCard({ user, report }: UserProfileProps) {
    return (
        <Container className="space-y-8 py-10">
            {/* Profile Card */}
            <div className="w-full rounded-xl border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-zinc-900">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    {/* Avatar & Basic Info */}
                    <div className="flex items-center gap-4">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border shadow-md">
                            {user.avatarUrl ? (
                                <Image
                                    src={user.avatarUrl}
                                    alt={user.name ?? "User avatar"}
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 dark:bg-zinc-700">
                                    <span className="text-2xl font-semibold">
                                        {user.name?.charAt(0) ?? "U"}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-dark dark:text-white">
                                {user.name ?? "Anonymous"}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {user.email}
                            </p>
                            <p className="mt-1 text-xs text-body-color-dark">
                                @{user.username ?? "not-set"}
                            </p>
                        </div>
                    </div>

                    {/* Meta Stats */}
                    <div className="flex flex-col items-center gap-2 text-sm text-body-color sm:items-end sm:text-right">
                        <div>
                            <span className="font-medium text-muted-foreground">
                                🔥 Streak:
                            </span>{" "}
                            <span className="font-bold text-primary">
                                {user.streak}
                            </span>
                        </div>
                        {report.rank !== undefined && (
                            <div>
                                <span className="font-medium text-muted-foreground">
                                    🏅 Rank:
                                </span>{" "}
                                <span className="font-semibold text-yellow">
                                    {report.rank}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bio */}
                {user.bio && (
                    <div className="mt-6 rounded-md bg-gray-50 p-4 text-sm text-gray-700 dark:bg-zinc-800 dark:text-gray-300">
                        <h3 className="mb-1 font-semibold text-body-color">
                            Bio
                        </h3>
                        <p>{user.bio}</p>
                    </div>
                )}

                {/* Additional Info */}
                <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:grid-cols-3">
                    {user.school && (
                        <InfoCard label="School" value={user.school} />
                    )}
                    {user.gradeLevel && (
                        <InfoCard label="Grade Level" value={user.gradeLevel} />
                    )}
                    {user.country && (
                        <InfoCard label="Country" value={user.country} />
                    )}
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <StatCard
                    label="Exercises Taken"
                    value={report._count?.exerciseReports ?? 0}
                />
                <StatCard
                    label="Completed Topics"
                    value={report._count?.completedTopics ?? 0}
                />
                <StatCard
                    label="Average Score"
                    value={`${Math.round(report.averageScore ?? 0)}%`}
                />
            </div>
        </Container>
    );
}

// Reusable Cards
function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-dark dark:text-white">
                {value}
            </p>
        </div>
    );
}

function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border bg-gray-50 p-3 dark:border-gray-700 dark:bg-zinc-800">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="font-semibold text-dark dark:text-white">{value}</p>
        </div>
    );
}
