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

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
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
