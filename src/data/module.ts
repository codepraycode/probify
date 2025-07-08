// import { Module, Topic } from "@/types/exercise.types";
import { nanoid } from "nanoid";

export const dummyModules: any[] = [
    {
        id: nanoid(),
        title: "Intro to Probability",
        slug: "intro-to-probability",
        thumbnail: "/images/modules/probability-intro.jpg",
        description: "Understand the basics of probability, outcomes, and simple experiments with engaging visuals and real-world examples.",
        level: "Beginner",
        estimatedTime: "30 mins",
        isLocked: false,
        isPassed: true,
        scorePercent: 72,
    },
    {
        id: nanoid(),
        title: "Events & Sample Space",
        slug: "events-and-sample-space",
        thumbnail: "/images/modules/sample-space.jpg",
        description: "Learn how to list all possible outcomes of an event and calculate basic probabilities using sample space diagrams.",
        level: "Beginner",
        estimatedTime: "45 mins",
        isLocked: true,
        isPassed: false,
        scorePercent: 43,
    },
    {
        id: nanoid(),
        title: "Compound Events",
        slug: "compound-events",
        thumbnail: "/images/modules/compound-events.jpg",
        description: "Master the art of calculating probabilities involving multiple events—independent, dependent, and mutually exclusive.",
        level: "Intermediate",
        estimatedTime: "1 hr",
        isLocked: true,
        isPassed: false,
        scorePercent: 0,
    },
];

export const dummyTopics: any[] = [
    {
        title: "What is Probability?",
        description: "Understand the meaning of probability and why it's important.",
        slug: "what-is-probability",
        completedAt: new Date().toDateString(),
        completed: true,
        progress: 87
    },
    {
        title: "Theoretical vs Experimental",
        description: "Explore how predictions and experiments relate in probability.",
        slug: "theoretical-vs-experimental",
        locked: true,
        // progress: 54,
    },
    {
        title: "Simple Events",
        description: "Learn how to calculate the chance of a single event happening.",
        slug: "simple-events",
        locked: true,
    },
    {
        title: "Complementary Events",
        description: "See how knowing what *won’t* happen helps you predict what *will*.",
        slug: "complementary-events",
        locked: true,
    },
]
