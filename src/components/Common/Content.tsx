import { PropsWithChildren, ReactNode } from "react";


export function Title({children}:PropsWithChildren) {
    return (
        <h1 className="mb-8 text-5xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
            {children}
        </h1>
    );
}

export function SubTitle({children}:PropsWithChildren) {
    return (
        <h2 className="mb-6 text-2xl md:text-3xl font-semibold">
            {/* <h2 className="mb-6leading-tight text-lg text-black text-gray-600 text-gray-600 dark:text-white sm:text-4xl sm:leading-tight md:text-xl md:text-xl"> */}
            {children}
        </h2>
    );
}

export function Text({children, className}: PropsWithChildren & {className?: string}) {

    return (
        <span className={className}>
            {children}
        </span>

    )
}

export function Paragraph({children}: PropsWithChildren) {

    return (
        <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
            {children}
        </p>

    )
}

export function Divider() {
    return <div className="mt-5 mb-10 border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10"/>
}


export function Listing({title, items}:{title:ReactNode; items:ReactNode[]}) {
    return (
        <div className="mx-auto my-8 rounded-xl border-body-color text-left shadow-sm dark:border-white">
            <h3 className="mb-4 text-xl font-semibold text-body-color">
                {title}
            </h3>
            <ul className="list-inside list-disc space-y-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export function Container({children}: PropsWithChildren) {
    return (
        <div className="w-full px-4 lg:w-8/12">
            {children}
        </div>
    )
}