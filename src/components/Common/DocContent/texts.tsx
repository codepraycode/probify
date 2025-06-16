import { PropsWithChildren } from "react";

export function BoldText({ children }: PropsWithChildren) {
    return <b className="font-semibold text-blue-600">{children}</b>;
}

export type LinkTextProps = PropsWithChildren & JSX.IntrinsicAttributes;

export function LinkText({ children, ...props }: LinkTextProps) {
    return (
        <a {...props} className="font-semibold text-purple-600">
            {children}
        </a>
    );
}

export function Paragraph({ children }: PropsWithChildren) {
    return (
        <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
            {children}
        </p>
    );
}

export function Text({children, className}: PropsWithChildren & {className?: string}) {

    return (
        <span className={className}>
            {children}
        </span>

    )
}
