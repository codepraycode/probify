"use client";

import clsx from "clsx";

type PaginatorProps = {
    currentPage: number;
    totalPages: number;
    onPageAction: (page: number) => void;
};

export default function Paginator({
    currentPage,
    totalPages,
    onPageAction,
}: PaginatorProps) {
    // Generate compact pagination data like: [1, 2, 3, "...", 12]
    const generatePageNumbers = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (currentPage >= totalPages - 3) {
            pages.push(
                1,
                "...",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            );
        } else {
            pages.push(
                1,
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages,
            );
        }

        return pages;
    };

    const handleClick = (page: number | "...") => {
        if (typeof page === "number" && page !== currentPage) {
            onPageAction(page);
        }
    };

    return (
        <div
            className="wow fadeInUp -mx-4 flex flex-wrap"
            data-wow-delay=".15s"
        >
            <div className="w-full px-4">
                <ul className="flex items-center justify-center pt-8">
                    <li className="mx-1">
                        <button
                            onClick={() =>
                                onPageAction(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            className={clsx(
                                "flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition",
                                currentPage === 1
                                    ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-zinc-700 dark:text-zinc-400"
                                    : "bg-body-color bg-opacity-[15%] text-body-color hover:bg-primary hover:bg-opacity-100 hover:text-white",
                            )}
                        >
                            Prev
                        </button>
                    </li>

                    {generatePageNumbers().map((item, idx) => (
                        <li key={idx} className="mx-1">
                            {typeof item === "number" ? (
                                <button
                                    onClick={() => handleClick(item)}
                                    className={clsx(
                                        "flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition",
                                        item === currentPage
                                            ? "bg-primary text-white"
                                            : "bg-body-color bg-opacity-[15%] text-body-color hover:bg-primary hover:bg-opacity-100 hover:text-white",
                                    )}
                                >
                                    {item}
                                </button>
                            ) : (
                                <span className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[10%] px-4 text-sm text-body-color">
                                    {item}
                                </span>
                            )}
                        </li>
                    ))}

                    <li className="mx-1">
                        <button
                            onClick={() =>
                                onPageAction(
                                    Math.min(totalPages, currentPage + 1),
                                )
                            }
                            disabled={currentPage === totalPages}
                            className={clsx(
                                "flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition",
                                currentPage === totalPages
                                    ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-zinc-700 dark:text-zinc-400"
                                    : "bg-body-color bg-opacity-[15%] text-body-color hover:bg-primary hover:bg-opacity-100 hover:text-white",
                            )}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
