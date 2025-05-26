import Breadcrumb from "@/components/Common/Breadcrumb";
import { ExerciseList } from "@/components/Exercises/ExerciseList";
import ExerciseLoader from "@/components/Exercises/ExercisePreloader";
import { Suspense } from "react";


// Dummy data reflecting your models and structure

const mockExerciseReports = [
    {
        sessionId: "sess-001",
        title: "Basic Probability",
        durationSeconds: 300, // 5 minutes
        reportId: "report-001",
        score: 8,
        total: 10,
        accuracy: 80,
        createdAt: new Date("2025-05-20T10:00:00Z"),
    },
    {
        sessionId: "sess-002",
        title: "Tree Diagrams",
        durationSeconds: 480, // 8 minutes
        reportId: "report-002",
        score: 6,
        total: 10,
        accuracy: 60,
        createdAt: new Date("2025-05-22T14:30:00Z"),
    },
    {
        sessionId: "sess-003",
        title: "Tree Diagrams",
        durationSeconds: 480, // 8 minutes
        reportId: "report-002",
        score: 6,
        total: 10,
        accuracy: 60,
        createdAt: new Date("2025-05-22T14:30:00Z"),
    },
    {
        sessionId: "sess-012",
        title: "Tree Diagrams",
        durationSeconds: 480, // 8 minutes
        reportId: "report-002",
        score: 6,
        total: 10,
        accuracy: 60,
        createdAt: new Date("2025-05-22T14:30:00Z"),
    },
    {
        sessionId: "sess-102",
        title: "Tree Diagrams",
        durationSeconds: 480, // 8 minutes
        reportId: "report-002",
        score: 6,
        total: 10,
        accuracy: 60,
        createdAt: new Date("2025-05-22T14:30:00Z"),
    },
];

// Active session with no report yet (in progress)


export default function ExercisePage() {
    return (
        <section className="container space-y-10 py-10">
            {/* <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
                🎯 Exercises Dashboard
            </h1> */}

            <Breadcrumb
                pageName="🎯 Your Exercises"
                description="Practice makes perfect! Here are your exercises to master probability."
            />

            <Suspense fallback={<ExerciseLoader label="Loading your exercises" description="Hold on tight!"/>}>
                <ExerciseList/>
            </Suspense>

            
        </section>
    );
}


