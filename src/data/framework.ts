import { APP_LIVE_URL } from "./links";

export const headerMenu = [];
export const MIN_EXERCISE_QUESTIONS = 5
export const MIN_EXERCISE_DURATION = 5

export const default_metadata = {
    keywords: [
        "probability",
        "math learning",
        "e-learning",
        "probability app",
        "interactive math",
        "learn probability",
        "Probify",
    ],
    openGraph: {
        title: "Probify – Learn Probability the Smart Way",
        description:
            "Master probability with Probify. Gamified lessons, leaderboards, and interactive challenges designed for students aged 13–16.",
        url: APP_LIVE_URL, // Change this to your real domain
        siteName: "Probify",
        images: [
            {
                url: "/og/banner.png",
                width: 1200,
                height: 630,
                alt: "Probify Home Preview",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Probify – Learn Probability the Smart Way",
        description:
            "Gamified lessons and smart tools for mastering probability.",
        images: ["/og/banner.png"],
    },
}