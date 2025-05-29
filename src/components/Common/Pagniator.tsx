"use client";

import { showNotImplementedToast } from "@/utils/toast";
import { MouseEvent } from "react";


export default function Paginator() {
    const data = [1, 2, 3, "...", 12]; // Example data, replace with actual pagination logic

    const toastId = "paginator-not-implemented";

    const handlePagnination = (page: number | `${number}` | "prev" | "next") => {
        // TODO: Implement pagination logic here
        // ?: Likly to be a server-side component;
        console.log(`Navigating to page ${page}`);
        showNotImplementedToast(toastId);
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
                            onClick={() => handlePagnination("prev")}
                            className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                        >
                            Prev
                        </button>
                    </li>

                    {data.map((item, index) => (
                        <li key={index} className="mx-1">
                            {typeof item === "number" ? (
                                <button
                                    onClick={() => handlePagnination(item)}
                                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                                >
                                    {item}
                                </button>
                            ) : (
                                <span className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color">
                                    {item}
                                </span>
                            )}
                        </li>
                    ))}

                    <li className="mx-1">
                        <button
                            onClick={() => handlePagnination("next")}
                            className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

