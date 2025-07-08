"use client";
import React from "react";
import { InlineMath, BlockMath } from "react-katex";

interface MathProps {
    children: string;
    block?: boolean;
    className?: string;
}

export const Math: React.FC<MathProps> = ({
    children,
    block = false,
    className = "",
}) => {
    const Component = block ? BlockMath : InlineMath;

    try {
        return (
            <span className={`math-container ${className}`}>
                <Component math={children} />
            </span>
        );
    } catch (error) {
        console.error("KaTeX rendering error:", error);
        return (
            <span className={`text-red-500 ${block ? "block" : "inline"}`}>
                [Math Error: {children}]
            </span>
        );
    }
};

// Add this to your global CSS (globals.css)
/*

*/
