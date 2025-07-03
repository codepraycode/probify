"use client";

import { BaseButton, PrimaryButton } from "../ui/Button";
import { PROFILE, SIGNIN, SIGNUP } from "@/data/links";
import ThemeToggler from "../ui/ThemeToggler";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CircleUserRound } from "lucide-react";
import { Skeleton } from "../ui/Skeleton";

export const AuthNav = () => {
    const { data: session, status } = useSession();

    const isLoading = status === "loading";
    const isAuthenticated = status === "authenticated";
    const user = session?.user;

    return (
        <div className="flex items-center justify-end gap-4 lg:pr-0">
            {/* Loading state */}
            {isLoading && (
                <>
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <ThemeToggler />
                </>
            )}

            {/* Not logged in */}
            {!isLoading && !isAuthenticated && (
                <>
                    <div className="hidden items-center gap-2 md:flex">
                        <BaseButton link={SIGNIN}>Sign In</BaseButton>
                        <PrimaryButton link={SIGNUP}>Sign Up</PrimaryButton>
                    </div>
                    <ThemeToggler />
                </>
            )}

            {/* Logged in */}
            {!isLoading && isAuthenticated && user && (
                <>
                    <Link
                        href={PROFILE}
                        className="flex items-center gap-2 text-sm font-medium text-body-color hover:text-primary dark:text-body-color-dark"
                    >
                        {user.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={user.image || "https://i.pravatar.cc/512"}
                                alt={user.name ?? "User Avatar"}
                                className="h-10 w-10 rounded-full object-cover shadow"
                            />
                        ) : (
                            <CircleUserRound className="h-7 w-7 text-muted-foreground" />
                        )}
                        <span className="hidden md:inline">
                            {user.name ?? "User"}
                        </span>
                    </Link>
                    <ThemeToggler />
                </>
            )}
        </div>
    );
};