"use client";
import React, { useState } from "react";
import { BreakDown, ExerciseDuration, Report } from "@/types/exercise.types";
import { Card, CardContent } from "./Card";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Switch } from "./Switch";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { SubmittedAnswer } from "@/lib/schema/exerciseSchema";
import { parseQuestionText } from "@/utils/render-function";
import {
    Flame,
    CheckCircle2,
    AlertTriangle,
    ClockIcon,
    Hourglass,
} from "lucide-react";

import clsx from "clsx";
import { showNotImplementedToast } from "@/utils/toast";
import { EXERCISES } from "@/data/links";
import { ProgressBar } from "../ProgressIndicator";

export function ExerciseReportHeader() {
    return (
        <header className="space-y-2 text-center">
            <h1 className="text-heading text-3xl font-bold">
                📊 Your Performance Report
            </h1>
            <p className="text-body-color dark:text-body-color-dark">
                Here&apos;s how you did in this session. Review the breakdown, analyze your strengths, and revisit missed questions.
            </p>
        </header>
    );
}


export function ExerciseReportFooter() {
    return (
        <footer className="text-center text-sm text-muted-foreground">
            <p>
                Remember, every session is a step towards mastery. Keep practicing and improving!
            </p>
        </footer>
    );
}


type Props = {
    report: Report
}

const COLORS = ["#2563eb", "#4ade80", "#facc15", "#f87171"];

export function ExerciseReport({report}: Props) {
    const {
        score,
        total,
        accuracy,
        duration,
        types,
        topics,
        answers
    } = report;

    const [showCorrections, setShowCorrections] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Total Score */}
                <ScoreCard score={score} total={total} />

                {/* Duration */}
                {/* Accuracy */}
                <Accuracy accuracy={accuracy} />

                {/* Time Taken */}

                <TimeDisplay duration={duration as ExerciseDuration}/>

                <TypeChart data={types as BreakDown[]}/>
            </div>

            <TopicChart data={topics as BreakDown[]}/>

            <Card>
                <CardContent className="space-y-10 p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Answer Progress
                        </h2>
                        <p className="mt-2 text-xs text-muted-foreground">
                            <span className="mr-1 inline-block h-3 w-6 rounded-full bg-green-500"></span>
                            Correct
                            <span className="ml-4 mr-1 inline-block h-3 w-6 rounded-full bg-red-400"></span>
                            Incorrect
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {(answers as SubmittedAnswer[]).map((answer, idx) => (
                            <div
                                key={idx}
                                className={`h-3 w-6 rounded-full transition-colors ${
                                    answer.correct
                                        ? "bg-green-500"
                                        : "bg-red-400"
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
                        <Correction data={answers as SubmittedAnswer[]} />
                    )}
                </CardContent>
            </Card>

            <div className="flex items-center justify-center space-x-2">
                <SecondaryButton
                    onClick={() => showNotImplementedToast()}
                >
                    Download Report
                </SecondaryButton>

                <PrimaryButton
                    link={EXERCISES}
                >
                    Dashboard
                </PrimaryButton>
            </div>
        </>
    );
}

function TopicChart({data}:{data: BreakDown[]}) {

    const COLORS = [
        "#2563eb", // Blue - primary brand color
        "#7c3aed", // Purple - secondary
        "#f59e0b", // Amber - accent
        "#10b981", // Emerald - accent
        "#ef4444", // Red - warning/danger
        "#6366f1", // Indigo - subtle variation
        "#8b5cf6", // Violet - soft highlight
        "#3b82f6", // Light Blue - fresh
    ];

    return (
        <Card className="rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            <CardContent className="space-y-4 p-6">
                <h2 className="dark:text-primary-light mb-4 text-center text-xl font-bold text-primary">
                    🗂️ Topic Breakdown
                </h2>

                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data.map(
                                ({ label, count }) => ({
                                    name: label,
                                    value: count,
                                }),
                            )}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            innerRadius={45} // donut style for better aesthetics
                            paddingAngle={4} // space between slices for clarity
                            label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            labelLine={false}
                            fill="#2563eb"
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    stroke="#1e40af" // dark stroke to separate slices nicely
                                    strokeWidth={1}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number, name: string) => [
                                `${value} questions`,
                                name,
                            ]}
                            contentStyle={{
                                backgroundColor: "#2563eb",
                                borderRadius: "8px",
                                border: "none",
                                color: "#fff",
                            }}
                            cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            wrapperStyle={{ fontWeight: "600", fontSize: 14 }}
                            iconType="circle"
                            iconSize={12}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );

}

function TypeChart({data}:{ data: BreakDown[]}) {
    return (
        <Card className="rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            <CardContent className="space-y-4 p-6">
                <h2 className="dark:text-primary-light mb-4 text-center text-xl font-bold text-primary">
                    📊 Question Type Distribution
                </h2>

                <ResponsiveContainer width="100%" height={180}>
                    <BarChart
                        data={data.map(
                            ({ label, count }) => ({
                                type: label,
                                count,
                            }),
                        )}
                        barCategoryGap={25}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="type"
                            stroke="#2563eb"
                            tick={{ fontWeight: "600", fill: "#1e40af" }}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#2563eb"
                            tick={{ fontWeight: "600", fill: "#1e40af" }}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#2563eb",
                                borderRadius: "8px",
                                border: "none",
                                color: "#fff",
                            }}
                            cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
                            formatter={(value: number) => [
                                `${value} questions`,
                                "Count",
                            ]}
                        />
                        <Bar
                            dataKey="count"
                            fill="#2563eb"
                            radius={[8, 8, 0, 0]}
                            barSize={40}
                            animationDuration={800}
                            animationEasing="ease-out"
                        />
                    </BarChart>
                </ResponsiveContainer>

                <p className="text-center text-sm italic text-muted-foreground">
                    Breakdown of question types tackled during this exercise.
                </p>
            </CardContent>
        </Card>
    );
}


function TimeDisplay({duration}:{duration: ExerciseDuration}) {
    const { minutes, seconds } = duration;
    return (
        <Card
            className={`flex flex-col items-center justify-center rounded-lg border-2 shadow-xl transition-colors duration-500
    ${
        minutes > 10
            ? "border-red-500 bg-red-50 dark:bg-red-900/30"
            : minutes > 5
              ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/30"
              : "border-green-500 bg-green-50 dark:bg-green-900/30"
    }
  `}
        >
            <CardContent className="space-y-3 px-8 py-6 text-center">
                <h2 className="flex items-center justify-center gap-3 text-3xl font-bold">
                    {minutes > 10 ? (
                        <Flame className="animate-flicker text-red-500" />
                    ) : minutes > 5 ? (
                        <Hourglass className="text-yellow-400 animate-pulse" />
                    ) : (
                        <ClockIcon className="animate-bounce text-green-500" />
                    )}
                    Time Taken
                </h2>

                <div
                    className={`text-7xl font-extrabold drop-shadow-md transition-colors duration-500
      ${
          minutes > 10
              ? "text-red-600 dark:text-red-400"
              : minutes > 5
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-green-600 dark:text-green-400"
      } animate-pulse`}
                >
                    {minutes}m {seconds}s
                </div>

                <p
                    className={`text-xs italic transition-colors duration-500
      ${
          minutes > 10
              ? "text-red-700 dark:text-red-300"
              : minutes > 5
                ? "text-yellow-700 dark:text-yellow-300"
                : "text-green-700 dark:text-green-300"
      }`}
                >
                    {minutes > 10
                        ? "🔥 Slow and steady? Let's speed it up!"
                        : minutes > 5
                          ? "⏳ Keep pushing, you’re getting there!"
                          : "⚡ Lightning fast! Great job!"}
                </p>
            </CardContent>
        </Card>
    );
}

function ScoreCard({score, total}:{score: number; total: number}) {
    return (
        <Card
            className={clsx(
                "flex flex-col items-center justify-center shadow-2xl transition-all duration-500",
                score / total < 0.5
                    ? "border-red-400 bg-red-50 dark:bg-red-950/20"
                    : "border-green-400 bg-green-50 dark:bg-green-950/20",
            )}
        >
            <CardContent className="flex flex-col items-center space-y-4 p-6">
                <h2 className="text-center text-3xl font-bold tracking-tight">
                    🧮 Total Score
                </h2>

                {/* Big score display */}
                <div
                    className={clsx(
                        "relative flex items-center justify-center text-6xl font-black drop-shadow-lg transition-all duration-300",
                        score / total < 0.5
                            ? "text-destructive animate-shake"
                            : "animate-bounce text-primary",
                    )}
                >
                    {score}/{total}
                </div>

                {/* Feedback Text */}
                {score / total < 0.5 ? (
                    <p className="text-center text-sm text-red-700 dark:text-red-300">
                        😬 Oof! You’ve got this. Practice makes perfect!
                    </p>
                ) : score / total === 1 ? (
                    <p className="text-center text-sm text-green-700 dark:text-green-300">
                        🎉 Flawless victory! You&apos;re a probability legend.
                    </p>
                ) : (
                    <p className="text-center text-sm text-green-700 dark:text-green-300">
                        👏 Great job! You&apos;re improving steadily.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}


function Accuracy({accuracy}:{accuracy: number}) {
    return (
        <Card
            className={`border-2 transition-colors duration-500 ${
                accuracy < 50
                    ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                    : accuracy < 80
                      ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/30"
                      : "border-green-500 bg-green-50 dark:bg-green-900/30"
            } rounded-lg shadow-lg`}
        >
            <CardContent className="space-y-4 p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                    {accuracy < 50 && (
                        <Flame className="animate-flicker text-red-500" />
                    )}
                    {accuracy >= 50 && accuracy < 80 && (
                        <AlertTriangle className="text-yellow-400 animate-pulse" />
                    )}
                    {accuracy >= 80 && (
                        <CheckCircle2 className="animate-bounce text-green-500" />
                    )}
                    Accuracy
                </h2>

                <ProgressBar
                    value={accuracy}
                    className={`transition-colors duration-500 ${
                        accuracy < 50
                            ? "bg-red-300 border-red-300"
                            : accuracy < 80
                              ? "bg-yellow border-yellow"
                              : "bg-green-300 border-green-300"
                    }`}
                />

                <p
                    className={`text-sm font-semibold transition-colors duration-500 ${
                        accuracy < 50
                            ? "text-red-700 dark:text-red-300"
                            : accuracy < 80
                              ? "text-yellow-700 dark:text-yellow-300"
                              : "text-green-700 dark:text-green-300"
                    }`}
                >
                    {accuracy}% answered correctly
                </p>

                {accuracy < 50 && (
                    <p className="text-xs italic text-red-600 dark:text-red-400">
                        🔥 Warning: Accuracy is low. Time to do way beter
                        hard!
                    </p>
                )}
                {accuracy >= 50 && accuracy < 80 && (
                    <p className="text-yellow-700 dark:text-yellow-400 text-xs italic">
                        ⚠️ Not bad, but there’s room for improvement!
                    </p>
                )}
                {accuracy >= 80 && (
                    <p className="text-xs italic text-green-700 dark:text-green-400">
                        ✅ Excellent work! Keep it up!
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

function Correction({data}:{data: SubmittedAnswer[]}) {
    return (
        <div className="space-y-3">
            {(data as SubmittedAnswer[]).map((answer, idx) => {
                const isCorrect = answer.correct;
                const borderColor = isCorrect
                    ? "border-green-300 bg-green-50 dark:bg-green-900/30"
                    : "border-red-300 bg-red-50 dark:bg-red-900/30";

                return (
                    <div
                        key={idx}
                        className={`rounded-md border p-4 text-sm dark:text-white ${borderColor} space-y-4`}
                    >
                        <div className="mb-1 flex items-center justify-between">
                            <strong className="text-base">
                                Question {idx + 1}
                            </strong>
                            <span className="text-sm">
                                {isCorrect ? "✅" : "❌"}
                            </span>
                        </div>

                        <p className="text-xl text-muted-foreground">
                            {parseQuestionText(answer.question)}
                        </p>

                        <p className="text-sm">
                            <span className="font-medium">Your answer:</span>{" "}
                            {answer.selected ? parseQuestionText(answer.selected) : (
                                <i className="text-muted-foreground">Nothing</i>
                            )}
                        </p>
                        {!isCorrect && (
                            <>
                                <p className="mt-1 text-sm">
                                    <span className="font-medium">
                                        Correct Answer:
                                    </span>{" "}
                                    {parseQuestionText(answer.correctAnswer)}
                                </p>
                                {answer.hint && (
                                    <p className="mt-2 text-xs italic text-muted-foreground">
                                        Explanation: {parseQuestionText(answer.hint)}
                                    </p>
                                )}
                            </>
                        )}

                        {isCorrect && (
                            <p className="mt-2 text-xs text-muted-foreground">
                                Great job! You selected the correct answer.
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}