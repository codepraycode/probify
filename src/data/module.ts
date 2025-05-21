import { Module } from "@/types/module";

// 
// <g fill="#4a6cf7">
//     <path d="m0 0c13.8071 0 25 11.1929 25 25h-23c-1.10457 0-2-.8954-2-2z"/><path d="m6 25c0-13.8071 11.1929-25 25-25v23c0 1.1046-.8954 2-2 2z" opacity=".5"/>
//     </g>
export const modulesData: Module[] = [
  {
    id: 1,
    index: 1,
    title: "Introduction to Probability",
    image: "/images/logo/icon.svg",
    description: "Learn the basics of probability, outcomes, and events with interactive examples.",
    estimatedTime: 45,
    level: "Beginner",
  },
  {
    id: 2,
    index: 2,
    title: "Probability Rules & Types",
    image: "/images/logo/icon.svg",
    description: "Explore rules like addition and multiplication, and types like independent/dependent events.",
    estimatedTime: 60,
    level: "Intermediate",
  },
  {
    id: 3,
    index: 3,
    title: "Real-Life Applications",
    image: "/images/logo/icon.svg",
    description: "Apply probability to games, predictions, and everyday decision-making scenarios.",
    estimatedTime: 75,
    level: "Intermediate",
  },
  // Add more modules as needed
];
