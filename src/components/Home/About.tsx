import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { CheckIcon } from "../Common/Icons";

const AboutSectionTwo = () => {
    return (
        <section className="py-16 md:py-20 lg:py-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap items-center">
                    {/* TEXT SIDE */}
                    <div className="w-full px-4 lg:w-3/5">
                        <div
                            className="wow fadeInUp max-w-[470px]"
                            data-wow-delay=".2s"
                        >
                            <div className="mb-9">
                                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                                    Practice that Builds Confidence
                                </h3>
                                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                                    Each topic is packed with exercises that
                                    reinforce learning through real
                                    problem-solving. From multiple choice to
                                    step-by-step challenges, learners get to
                                    apply what they’ve just learned—right away.
                                </p>
                            </div>

                            <div className="mb-9">
                                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                                    Real-Time Feedback & Scoring
                                </h3>
                                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                                    Answers are checked instantly, with tailored
                                    feedback to guide improvement. Each correct
                                    answer earns points, while mistakes offer
                                    hints and retries—making learning feel like
                                    a game.
                                </p>
                            </div>

                            <div className="mb-1">
                                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                                    Leaderboard & Friendly Competition
                                </h3>
                                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                                    Every learner gets a profile and scorecard.
                                    With weekly leaderboards, users can compete
                                    with friends or classmates and earn
                                    recognition for consistency, accuracy, and
                                    speed.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* IMAGE SIDE */}
                    <div className="w-full px-4 lg:w-2/5">
                        <div
                            className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
                            data-wow-delay=".15s"
                        >
                            <Image
                                src="/images/about/about-image.svg"
                                alt="exercise and leaderboard"
                                fill
                                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
                            />
                            <Image
                                src="/images/about/about-image-dark.svg"
                                alt="exercise and leaderboard dark"
                                fill
                                className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutSectionOne = () => {
    const List = ({ text }: { text: string }) => (
        <p className="mb-5 flex items-center text-lg font-medium text-body-color">
            <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                <CheckIcon />
            </span>
            {text}
        </p>
    );

    return (
        <section id="learning-ui" className="pt-16 md:pt-20 lg:pt-28">
            <div className="container">
                <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
                    <div className="-mx-4 flex flex-wrap items-center">
                        {/* IMAGE SIDE */}
                        <div className="w-full px-4 lg:w-1/2">
                            <div
                                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:ml-0"
                                data-wow-delay=".2s"
                            >
                                <Image
                                    src="/images/about/about-image-2.svg"
                                    alt="about image"
                                    fill
                                    className="drop-shadow-three dark:hidden dark:drop-shadow-none"
                                />
                                <Image
                                    src="/images/about/about-image-2-dark.svg"
                                    alt="about image"
                                    fill
                                    className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
                                />
                            </div>
                        </div>

                        {/* TEXT SIDE */}
                        <div className="w-full px-4 lg:w-1/2">
                            <SectionTitle
                                title="Designed for Deep, Visual Learning"
                                paragraph="Probify’s topic and class pages are built to keep learners engaged and focused. With clean layouts, interactive simulations, and feedback-driven assessments, every page is an invitation to explore probability in a meaningful way."
                                mb="44px"
                            />

                            <div
                                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                                data-wow-delay=".15s"
                            >
                                <div className="mx-[-12px] flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                                        <List text="Structured by topic & sub-topic" />
                                        <List text="Beautiful math formatting" />
                                        <List text="Step-by-step interactive examples" />
                                    </div>

                                    <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                                        <List text="Real-time progress tracking" />
                                        <List text="Visual aids & charts" />
                                        <List text="Minimal, focused layout" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default function About() {
    return (
        <>
            <AboutSectionOne/>
            <AboutSectionTwo/>
        </>
    )
}