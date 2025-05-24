"use client";

import { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { Card, CardContent } from "@/components/Exercises/Report/Card";
import { SecondaryButton } from "@/components/ui/Button";
import Progress from "@/components/Exercises/Report/Progress";
import Spacer from "@/components/Common/Spacer";
import { Switch } from "@/components/Exercises/Report/Switch";
const data = {
    score: 18,
    total: 25,
    duration: "4m 12s",
    accuracy: 72,
    breakdown: [
        { name: "Probability Basics", value: 10 },
        { name: "Combinations", value: 6 },
        { name: "Permutations", value: 5 },
        { name: "Conditional Prob.", value: 4 },
    ],
    questionTypes: [
        { type: "MCQ", count: 15 },
        { type: "Fill", count: 10 },
    ],
    correctness: [
        1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
        1,
    ],
};

const COLORS = ["#2563eb", "#4ade80", "#facc15", "#f87171"];

export default function ReportPage() {
    const [showCorrections, setShowCorrections] = useState(false);

    return (
        <div className="container max-w-4xl space-y-6 py-10">
            <Spacer />
            <header className="space-y-2 text-center">
                <h1 className="text-heading text-3xl font-bold">
                    📊 Your Performance Report
                </h1>
                <p className="text-body-color dark:text-body-color-dark">
                    Here&apos;s how you did in this session. Review the
                    breakdown, analyze your strengths, and revisit missed
                    questions.
                </p>
            </header>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card className="flex flex-col items-center justify-center">
                    <CardContent className="space-y-2 p-4">
                        <h2 className="text-center text-2xl font-semibold">
                            🧮 Total Score
                        </h2>
                        <p className="animate-pulse text-6xl font-extrabold text-primary drop-shadow-md">
                            {data.score}/{data.total}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="space-y-2 p-4">
                        <h2 className="text-lg font-semibold">Accuracy</h2>
                        <Progress value={data.accuracy} />
                        <p className="text-sm">
                            {data.accuracy}% answered correctly
                        </p>
                    </CardContent>
                </Card>
                <Card className="flex flex-col items-center justify-center">
                    <CardContent className="space-y-2 py-4 text-center">
                        <h2 className="text-2xl font-semibold">
                            ⏱️ Time Taken
                        </h2>
                        <div className="animate-pulse text-6xl font-extrabold text-primary drop-shadow-md">
                            {data.duration}
                        </div>
                        <p className="text-muted-foreground text-xs italic">
                            Every second counts!
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="space-y-2 p-4">
                        <h2 className="text-lg font-semibold">
                            Question Type Distribution
                        </h2>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart
                                data={data.questionTypes}
                                barCategoryGap={20}
                                // barSize={30}
                            >
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#2563eb" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </section>

            <Card>
                <CardContent className="space-y-4 p-4">
                    <h2 className="text-lg font-semibold">Topic Breakdown</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data.breakdown}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                                fill="#8884d8"
                                label
                            >
                                {data.breakdown.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-10 p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Answer Progress
                        </h2>
                        <p className="text-muted-foreground mt-2 text-xs">
                            <span className="mr-1 inline-block h-3 w-6 rounded-full bg-green-500"></span>
                            Correct
                            <span className="ml-4 mr-1 inline-block h-3 w-6 rounded-full bg-red-400"></span>
                            Incorrect
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {data.correctness.map((correct, idx) => (
                            <div
                                key={idx}
                                className={`h-3 w-6 rounded-full transition-colors ${
                                    correct ? "bg-green-500" : "bg-red-400"
                                }`}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-6 p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Corrections</h2>
                        <Switch
                            checked={showCorrections}
                            onCheckedChange={setShowCorrections}
                        />
                    </div>

                    {showCorrections && (
                        <div className="space-y-2">
                            {data.correctness.map((correct, idx) => (
                                <div
                                    key={idx}
                                    className={`rounded border p-2 text-sm dark:text-white ${
                                        correct
                                            ? "border-green-300 bg-green-50 dark:bg-green-950/30"
                                            : "border-red-300 bg-red-50 dark:bg-red-950/30"
                                    }`}
                                >
                                    <strong>Question {idx + 1}:</strong>{" "}
                                    {correct ? "✅ Correct" : "❌ Incorrect"}
                                    <div className="text-muted-foreground mt-1 text-xs">
                                        {correct
                                            ? "You selected the correct answer."
                                            : "Here's the correct answer with explanation..."}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="text-center">
                <SecondaryButton
                    onClick={() => alert("Download report coming soon")}
                >
                    Download Report
                </SecondaryButton>
            </div>
        </div>
    );
}