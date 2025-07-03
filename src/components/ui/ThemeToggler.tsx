"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../Common/Icons";

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme();
    return (
        <button
            aria-label="theme toggler"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-gray-2 dark:bg-dark-bg flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black dark:text-white md:h-14 md:w-14"
        >
            <SunIcon className="h-5 w-5 stroke-current dark:hidden md:h-6 md:w-6" />
            <MoonIcon className="hidden h-5 w-5 dark:block md:h-6 md:w-6" />
        </button>
    );
};
