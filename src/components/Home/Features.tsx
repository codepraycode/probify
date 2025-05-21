import { featuresData } from "@/data/features";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "../Features/SingleFeature";

const Features = () => {
    return (
        <section id="features" className="py-16 md:py-20 lg:py-28">
            <div className="container">
                <SectionTitle
                    title="Why Probify Works"
                    paragraph="We’ve designed Probify to turn complex probability concepts into an exciting, rewarding, and understandable journey. Here’s what makes it stand out."
                    center
                />
                <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                    {featuresData.map((feature) => (
                        <SingleFeature key={feature.id} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
