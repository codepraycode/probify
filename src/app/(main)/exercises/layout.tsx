import "katex/dist/katex.min.css";
import { ExerciseProvider } from "@/lib/context/ExerciseContext";

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
