
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import { HASH, SIGNUP } from "@/data/links";
import { HeroDesign } from "../Common/Icons";

const Hero = () => {
    return (
        <section
            id="home"
            className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
        >
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div
                            className="wow fadeInUp mx-auto max-w-[800px] text-center"
                            data-wow-delay=".2s"
                        >
                            <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                                Learn Probability the Fun and Interactive Way
                            </h1>
                            <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                                Probify helps students aged 13 to 16 master
                                probability through bite-sized lessons,
                                interactive exercises, and a gamified learning
                                system. Track your progress, earn achievements,
                                and rise to the top of the leaderboard—all while
                                building real math skills.
                            </p>
                            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <PrimaryButton
                                    link={SIGNUP}
                                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                                >
                                    🎓 Start Learning
                                </PrimaryButton>
                                <SecondaryButton link={HASH}>
                                    Explore Features
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HeroDesign />
        </section>
    );
};

export default Hero;
