"use client";
import { useSession } from "next-auth/react";


export default async function ProtectedPage() {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;

    if (!session) return <p>You are not logged in</p>;

    return <p>Welcome, {session.user?.name}</p>;
}
