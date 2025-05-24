import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`dark:bg-muted rounded-2xl p-4 shadow-md ${className}`}
        >
            {children}
        </div>
    );
}


interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
    return (
        <div className={`text-muted-foreground text-sm ${className}`}>
            {children}
        </div>
    );
}

