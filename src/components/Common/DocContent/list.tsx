import { PropsWithChildren, ReactNode } from "react";


export type ListProps = {
    title?: ReactNode;
    items: ReactNode[];
    type?: "ul" | "ol";
};

export function List({ title, items, type = "ul" }: ListProps) {
    const ListTag = type;

    const baseStyles =
        "list-inside space-y-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg";

    const listStyle = type === "ol" ? "list-decimal" : "list-disc";

    return (
        <div className="mx-auto my-8 rounded-xl border-body-color text-left shadow-sm dark:border-white">
            {title && (
                <h3 className="mb-4 text-xl font-semibold text-body-color">
                    {title}
                </h3>
            )}

            <ListTag className={`${baseStyles} ${listStyle}`}>
                {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ListTag>
        </div>
    );
}

export function ListItem({ children }: PropsWithChildren) {
    return (
        <li
            className={
                "list-inside space-y-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg"
            }
        >
            {children}
        </li>
    );
}