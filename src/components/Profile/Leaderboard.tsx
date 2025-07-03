// components/Leaderboard.tsx
import Image from "next/image";
import clsx from "clsx";

interface Leader {
    id: string;
    name: string | null;
    username: string | null;
    avatarUrl?: string | null;
    streak: number;
    topicCount: number;
    accuracy: number;
}

export function LeaderboardTable({ leaders }: { leaders: Leader[] }) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-zinc-900">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {leaders.map((user, index) => (
                        <li
                            key={user.id}
                            className={clsx(
                                "flex items-center justify-between py-4",
                                index === 0
                                    ? "bg-yellow-50 dark:bg-yellow-900/10"
                                    : "",
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 overflow-hidden rounded-full border">
                                    {user.avatarUrl ? (
                                        <img
                                            src={user.avatarUrl}
                                            alt="avatar"
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 dark:bg-zinc-700">
                                            <span className="text-lg font-bold">
                                                {user.name?.charAt(0) ?? "U"}
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
                                <span>🔥 {user.streak}</span>
                                <span>📚 {user.topicCount} topics</span>
                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                    🎯 {user.accuracy}%
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
    );
}
