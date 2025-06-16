import { PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
    return (
        <h1 className="mb-8 text-5xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
            {children}
        </h1>
    );
}

export function Title2({ children }: PropsWithChildren) {
    return (
        <h2 className="mb-6 text-2xl font-semibold text-gray-600 md:text-3xl">
            {/* <h2 className="mb-6leading-tight text-lg text-black text-gray-600 text-gray-600 dark:text-white sm:text-4xl sm:leading-tight md:text-xl md:text-xl"> */}
            {children}
        </h2>
    );
}

export function Title3({ children }: PropsWithChildren) {
    return (
        <h2 className="mb-6 text-xl font-semibold text-gray-600 md:text-2xl">
            {/* <h2 className="mb-6leading-tight text-lg text-black text-gray-600 text-gray-600 dark:text-white sm:text-4xl sm:leading-tight md:text-xl md:text-xl"> */}
            {children}
        </h2>
    );
}
