"use client";

import clsx from "clsx";
import AppNav from "../Common/AppLink";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    link?: string;
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
        " text-base font-medium text-dark dark:text-white ",
        "hover:opacity-70",
        "px-7 py-3 md:block hidden",
        className,
    );

    return (
        <Button {...props} className={style}>
            {children}
        </Button>
    );
}

export function PrimaryButton({ children, className, ...props }: Props) {
    const style = clsx(
        "rounded-sm bg-primary px-8 py-3 text-base font-medium text-white shadow-btn",
        "md:block md:px-9 lg:px-6 xl:px-9",
        "hover:bg-opacity-90 hover:shadow-btn-hover hover:bg-primary/80",
        "ease-in-out hidden transition duration-300",
        className,
    );

    return (
        <Button {...props} className={style}>
            {children}
        </Button>
    );
}

export function SecondaryButton({ children, className, ...props }: Props) {
    const style = clsx(
        "bg-black rounded-sm px-8 py-4",
        "text-base text-white font-semibold",
        "hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5",
        "inline-block duration-300 ease-in-out",
        className,
    );

    return (
        <Button {...props} className={style}>
            {children}
        </Button>
    );
}
