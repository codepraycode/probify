// components/mdx/List.tsx
import clsx from "clsx";
import React, { ReactNode } from "react";


export interface ListProps {
    children?: React.ReactNode;
    className?: string;
    ordered?: boolean;
    title?: string;
    items: ReactNode[];
}

export function List({
    children,
    className = "",
    ordered = false,
    title,
    items,
}: ListProps) {
    const ListTag = ordered ? "ol" : "ul";

    return (
        <div className="mx-auto my-8 rounded-xl text-left shadow-sm ">
            {title && (
                <h3 className="mb-4 px-4 pt-4 text-xl font-semibold text-body-color dark:text-white">
                    {title}
                </h3>
            )}
            <ListTag
                className={clsx(
                    "list-inside space-y-2 px-4 pb-4",
                    "text-base font-medium text-body-color dark:text-gray-300",
                    "sm:text-lg lg:text-base xl:text-lg",
                    ordered ? "list-decimal" : "list-disc",
                    className,
                )}
            >
                
                {!items ? children : items.map((each, idx)=>{
                    return (
                        <ListItem key={idx}>
                            {each}
                        </ListItem>
                    )
                })}
            </ListTag>
        </div>
    );
}

interface ListItemProps {
    children?: React.ReactNode;
    className?: string;
}

export function ListItem({ children, className = "" }: ListItemProps) {
    return (
        <li
            className={clsx(
                "py-2 list-outside",
                "[&>p]:ml-3 [&>p]:inline", // Ensures paragraphs render inline
                className,
            )}
        >
            {children}
        </li>
    );
}
