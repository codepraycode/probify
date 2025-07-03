/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {headerMenu} from "@/data/framework";
import clsx from "clsx";
import Logo from "./Logo";
import { SIGNIN, SIGNUP } from "@/data/links";
import { CheveronDown } from "./Icons";
import { PrimaryButton, BaseButton } from "../ui/Button";
import AppNav from "./AppLink";
import { AuthNav } from "../Auth/AuthNav";


const Header = () => {
    // Navbar toggle
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarToggleHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    // Sticky Navbar
    const [sticky, setSticky] = useState(false);

    const handleStickyNavbar = useCallback(() => {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
    }, []);

    // submenu handler
    const [openIndex, setOpenIndex] = useState(-1);

    const handleSubmenu = useCallback((index: number) => {
        if (openIndex === index) {
        setOpenIndex(-1);
        } else {
        setOpenIndex(index);
        }
    },[]);

    const usePathName = usePathname();

    return (
        <header
            className={clsx(
                "header left-0 top-0 z-40 flex w-full items-center",
                {
                    "fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark":
                        sticky,
                    "absolute bg-transparent": !sticky,
                },
            )}
        >
            <div className="container">
                <div className="relative -mx-4 flex items-center justify-between">
                    <div className="w-60 max-w-full px-4 xl:mr-12">
                        <Logo className={sticky ? "py-5 lg:py-2" : "py-8"} />
                    </div>

                    <div className="flex w-full items-center justify-between px-4">
                        <div>
                            <button
                                onClick={navbarToggleHandler}
                                id="navbarToggler"
                                aria-label="Mobile Menu"
                                className="absolute right-4 top-1/2 hidden translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                            >
                                <span
                                    className={clsx(
                                        "relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
                                        navbarOpen && "top-[7px] rotate-45",
                                    )}
                                />
                                <span
                                    className={clsx(
                                        "relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
                                        navbarOpen && "opacity-0",
                                    )}
                                />
                                <span
                                    className={clsx(
                                        "relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
                                        navbarOpen && "top-[-8px] -rotate-45",
                                    )}
                                />
                            </button>
                            <nav
                                id="navbarCollapse"
                                className={clsx(
                                    "navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100",
                                    navbarOpen
                                        ? "visibility top-full opacity-100"
                                        : "invisible top-[120%] opacity-0",
                                )}
                            >
                                <ul className="hidlg:flex md:block lg:space-x-12">
                                    {headerMenu.map((menuItem, index) => (
                                        <li
                                            key={index}
                                            className="group relative"
                                        >
                                            {menuItem.path ? (
                                                <AppNav
                                                    href={menuItem.path}
                                                    className={clsx(
                                                        "flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6",
                                                        usePathName ===
                                                            menuItem.path
                                                            ? "text-primary dark:text-white"
                                                            : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white",
                                                    )}
                                                >
                                                    {menuItem.title}
                                                </AppNav>
                                            ) : (
                                                <>
                                                    <p
                                                        onClick={() =>
                                                            handleSubmenu(index)
                                                        }
                                                        className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                                                    >
                                                        {menuItem.title}
                                                        <span className="pl-3">
                                                            <CheveronDown />
                                                        </span>
                                                    </p>
                                                    <div
                                                        className={clsx(
                                                            "submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full",
                                                            openIndex === index
                                                                ? "block"
                                                                : "hidden",
                                                        )}
                                                    >
                                                        {menuItem.submenu.map(
                                                            (
                                                                submenuItem,
                                                                subIndex,
                                                            ) => (
                                                                <Link
                                                                    href={
                                                                        submenuItem.path
                                                                    }
                                                                    key={
                                                                        subIndex
                                                                    }
                                                                    className="block rounded py-2.5 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                                                                >
                                                                    {
                                                                        submenuItem.title
                                                                    }
                                                                </Link>
                                                            ),
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        <AuthNav />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
