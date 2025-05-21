import SectionTitle from "../Common/SectionTitle";
import { BgDesign2 } from "../Common/Icons";

const surveyInsights = [
    {
        id: 1,
        stat: "92%",
        highlight: "of learners",
        description:
            "said they finally understood probability concepts that had confused them for years.",
    },
    {
        id: 2,
        stat: "87%",
        highlight: "reported",
        description:
            "that interactive exercises helped them learn faster than with traditional notes.",
    },
    {
        id: 3,
        stat: "4x",
        highlight: "faster retention",
        description:
            "when compared to passive reading, thanks to visual and hands-on learning.",
    },
    {
        id: 4,
        stat: "9/10",
        highlight: "users",
        description:
            "said they'd recommend Probify to friends preparing for math or standardized tests.",
    },
];

const Testimonials = () => {
    return (
        <section className="relative z-10 bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
            <div className="container">
                <SectionTitle
                    title="Why Probify Matters"
                    paragraph="Based on recent surveys from our early learners"
                    center
                />

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {surveyInsights.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-dark dark:text-white"
                        >
                            <h4 className="mb-2 text-4xl font-bold text-primary">
                                {item.stat}
                            </h4>
                            <p className="text-lg font-semibold text-body-color dark:text-gray-300">
                                {item.highlight}
                            </p>
                            <p className="mt-2 text-base text-body-color dark:text-gray-400">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="mt-12 text-center text-sm text-body-color dark:text-gray-400">
                    *Survey conducted with 120+ students from schools and
                    self-study groups across Nigeria.
                </p>
            </div>

            <BgDesign2 />
        </section>
    );
};
export default Testimonials;
