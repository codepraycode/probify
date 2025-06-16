
import { ExerciseProvider } from "@/lib/context/ExerciseContext";
import { Metadata } from "next";
import { default_metadata } from "@/data/framework";

export const metadata: Metadata = {
    title: "Exercises - Your exercises",
    description:
        "Master probability with Probify. Gamified lessons, leaderboards, and interactive challenges designed for students aged 13–16.",
    ...default_metadata,
};


export default function ExerciseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ExerciseProvider>
            {children}
        </ExerciseProvider>
    );
}
