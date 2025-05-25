import Link from "next/link";
import clsx from "clsx";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { EXERCISE_SETUP } from "@/data/links";

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
const activeSession = {
    sessionId: "sess-003",
    title: "Conditional Probability",
    durationSeconds: 600,
    progress: "5 / 10 questions answered",
    startedAt: new Date("2025-05-23T09:00:00Z"),
};

function formatDuration(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")} min`;
}

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

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* New Exercise Card */}
                <Link
                    href={EXERCISE_SETUP}
                    className={clsx(
                        "group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary p-8 text-primary transition hover:bg-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-primary/40",
                        "cursor-pointer select-none",
                    )}
                >
                    <div className="mb-4 text-5xl">➕</div>
                    <h2 className="text-xl font-semibold">
                        Create New Exercise
                    </h2>
                </Link>

                {/* Active session card */}
                {activeSession && <ActiveSessionCard session={activeSession} />}

                {/* Completed exercises */}
                {mockExerciseReports.map((report) => (
                    <CompletedExerciseCard
                        key={report.sessionId}
                        report={report}
                    />
                ))}
            </div>
        </section>
    );
}

function ActiveSessionCard({ session }: { session: typeof activeSession }) {
    return (
        <Link
            href={`/exercise/session/${session.sessionId}`}
            className="border-yellow-400 bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200 group rounded-2xl border-2 p-6 shadow-md transition hover:shadow-xl"
        >
            <div className="mb-4 flex items-center space-x-3">
                <span className="text-3xl">⏳</span>
                <h2 className="text-xl font-semibold">Continue Exercise</h2>
            </div>
            <p className="text-yellow-900 dark:text-yellow-300 mb-2 font-semibold">
                {session.title}
            </p>
            <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                {session.progress}
            </p>
            <p className="text-yellow-700 dark:text-yellow-400 text-sm italic">
                Started at {session.startedAt.toLocaleString()}
            </p>
        </Link>
    );
}

function CompletedExerciseCard({
    report,
}: {
    report: (typeof mockExerciseReports)[0];
}) {
    const accuracyColor =
        report.accuracy >= 75
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400";

    return (
        <Link
            href={`/exercise/report/${report.reportId}`}
            className="group rounded-2xl border border-primary bg-white p-6 shadow-lg transition hover:shadow-xl dark:bg-gray-800"
        >
            <div className="mb-3 flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white">
                    🎯 {report.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(report.createdAt).toLocaleDateString()}
                </span>
            </div>

            <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                Duration:{" "}
                <span className="font-medium">
                    {formatDuration(report.durationSeconds)}
                </span>
            </p>

            <p className="mb-4 text-sm">
                Score:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {report.score} / {report.total}
                </span>{" "}
                (
                <span className={accuracyColor}>
                    {report.accuracy.toFixed(1)}%
                </span>
                )
            </p>

            <button
                type="button"
                className="group-hover:bg-primary-dark w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white shadow-md transition focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
                View Report
            </button>
        </Link>
    );
}
