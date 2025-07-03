import { PropsWithChildren } from "react";
import { Container } from "../Common/DocContent";
import clsx from "clsx";

type ContainerLayoutProps = PropsWithChildren & {
    className?: string;
}

export default function ContainerLayout({children, className}: ContainerLayoutProps) {
    return <Container className={clsx("space-y-8 py-10", className)}>{children}</Container>;
}