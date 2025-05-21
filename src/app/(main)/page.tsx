import Blog from "@/components/Blog";
import Sources from "@/components/Home/Sources";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Home/Contact";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import Testimonials from "@/components/Home/Survey";
import Video from "@/components/Home/Intro";
import { Metadata } from "next";
import About from "@/components/Home/About";
import CourseModules from "@/components/Home/CourseModule";
import { APP_LIVE_URL } from "@/data/links";

export const metadata: Metadata = {
    title: "Probify – Learn Probability the Smart Way",
    description:
        "Master probability with Probify. Gamified lessons, leaderboards, and interactive challenges designed for students aged 13–16.",
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
                url: "/og/main.png",
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
        images: ["/og/main.png"],
    },
};


export default function Home() {
    return (
        <>
            <ScrollUp />
            <Hero />
            <Features />
            <Video />
            <Sources />
            <About />
            <Testimonials />
            {/* <Pricing /> */}
            {/* <Blog /> */}
            <CourseModules/>
            <Contact />
        </>
    );
}
