import { Source } from "@/types/source";

export const sourcesData: Source[] = [
    {
        id: 1,
        name: "Khan Academy",
        href: "https://www.khanacademy.org/math/statistics-probability",
        image: "/images/sources/khan-academy.svg",
    },
    {
        id: 2,
        name: "MIT OpenCourseWare",
        href: "https://ocw.mit.edu/courses/res-6-012-introduction-to-probability-spring-2018/",
        image: "/images/sources/mit.svg",
    },
    {
        id: 3,
        name: "Stanford Online",
        href: "https://online.stanford.edu/courses/soe-yprobprobability",
        image: "/images/sources/stanford.svg",
    },
    {
        id: 4,
        name: "Coursera",
        href: "https://www.coursera.org/learn/probability-theory",
        image: "/images/sources/coursera.svg",
    },
    {
        id: 5,
        name: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Probability_theory",
        image: "/images/sources/wikipedia.svg",
    },
];

export default sourcesData;
