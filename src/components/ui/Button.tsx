"use client";

import clsx from "clsx";
import AppNav from "../Common/AppLink";
import { Loader2 } from "lucide-react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    link?: string;
    isLoading?: boolean;
    loadingText?: string;
};

function Button({ link, children, ...props }: Props) {
    if (link) {
        return (
            <AppNav href={link} className={props.className}>
                {children}
            </AppNav>
        );
    }

    return <button {...props}>{children}</button>;
}

export function BaseButton({ children, className, ...props }: Props) {
    const style = clsx(
        "text-base font-medium text-dark dark:text-white ",
        "hover:opacity-70",
        "px-7 py-3 block",
        className,
    );

    return (
        <Button {...props} className={style}>
            {children}
        </Button>
    );
}

export function PrimaryButton({
    children,
    className,
    isLoading = false,
    disabled = false,
    loadingText,
    ...props
}: Props) {
    const buttonClasses = clsx(
        "rounded-sm bg-primary px-8 py-4 text-base font-medium text-white shadow-btn",
        "block md:px-9 lg:px-6 xl:px-9",
        "hover:bg-opacity-90 hover:shadow-btn-hover hover:bg-primary/80",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "transition-all duration-300 ease-in-out",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        {
            "pointer-events-none": isLoading, // Prevent clicks while loading
        },
        className,
    );

    return (
        <Button
            className={buttonClasses}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {loadingText || children}
                </span>
            ) : (
                children
            )}
        </Button>
    );
}

export function SecondaryButton({ children, className, ...props }: Props) {
    const style = clsx(
        "bg-black rounded-sm px-8 py-4",
        "text-base text-white font-medium",
        "block md:px-9 lg:px-6 xl:px-9",
        "hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5",
        "ease-in-out transition duration-300",
        className,
    );

    return (
        <Button {...props} className={style}>
            {children}
        </Button>
    );
}
