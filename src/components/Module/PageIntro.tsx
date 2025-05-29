import { Fragment } from "react";
import {
    Container,
    Divider,
    Listing,
    Paragraph,
    SubTitle,
    Text,
    Title,
} from "../Common/Content";
import { CalendarIcon, ChatIcon, EyeIcon } from "../Common/Icons";
import { Calendar, Eye, HelpCircle } from "lucide-react";

export default function PageIntro() {
    return (
        <Container>
            <Title> 🎲 Welcome to Probability Basics</Title>

            <SubTitle>
                <span className="font-semibold text-gray-600">
                    Unlock the power of chance and prediction!
                </span>
            </SubTitle>

            <Paragraph>
                Probability is all around us — from flipping a coin to
                predicting the weather. In this topic, you’ll dive into the
                fascinating world of{" "}
                <span className="font-semibold text-purple-600">
                    chance, uncertainty
                </span>
                , and{" "}
                <span className="font-semibold text-blue-600">
                    logical reasoning
                </span>
                . Whether you&apos;re just getting started or reviewing the
                basics, you&apos;ll find clear explanations, real-world
                examples, and interactive practice to guide your journey.
            </Paragraph>

            <Listing
                title="📌 What you'll learn:"
                items={[
                    "What probability means",
                    "How to calculate basic probabilities",
                    "The difference between theoretical and experimental probability",
                    "How to interpret and compare outcomes",
                    "And more…",
                ]}
            />

            <PageMeta date="10-10-2010" attempts={14} questionsCount={12} />

            <Divider />
        </Container>
    );
}

function PageMeta({
    date,
    questionsCount,
    attempts,
    tag,
}: {
    date: string;
    questionsCount: number;
    attempts: number;
    tag?: string;
}) {
    return (
        <div className="flex flex-wrap items-center justify-between px-4 py-3">
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <Text>{new Date(date).toLocaleDateString()}</Text>
                </div>
                <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <Text>{questionsCount} questions</Text>
                </div>
                <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <Text>{attempts} attempts</Text>
                </div>
            </div>

            {tag && (
                <Text className="mt-3 inline-flex items-center rounded-full bg-purple-600/90 px-3 py-1 text-xs font-semibold text-white shadow-sm dark:bg-purple-500/80 md:mt-0">
                </Text>
            )}
        </div>
    );
}