"use client"
import { HASH } from "@/data/links";
import { showNotImplementedToast } from "@/utils/toast";
import Link from "next/link"
import type { LinkProps } from "next/link"
import { PropsWithChildren } from "react";

type Props = LinkProps & PropsWithChildren & {
    className?: string;
};

export default function AppNav({href, children,onClick, ...rest}: Props) {

    return (
        <Link
            href={href}
            onClick={(e)=>{
                if (href === HASH) {
                    e.preventDefault();

                    showNotImplementedToast();
                    return
                }

                if(onClick) onClick(e);
            }}
            {...rest}
        >
            {children}
        </Link>
    )
}
