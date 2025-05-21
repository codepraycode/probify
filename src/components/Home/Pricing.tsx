import { BgDesign3, BgDesign4, CheckIcon, CrossIcon } from "../Common/Icons";
import SectionTitle from "../Common/SectionTitle";

const OfferList = ({
    text,
    status,
}: {
    text: string;
    status: "active" | "inactive";
}) => {
    return (
        <div className="mb-3 flex items-center">
            <span className="mr-3 flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
                {status === "active" ? <CheckIcon/> : <CrossIcon/>}
            </span>
            <p className="m-0 text-base font-medium text-body-color">{text}</p>
        </div>
    );
};


const PricingBox = (props: {
    price: string;
    duration: string;
    packageName: string;
    subtitle: string;
    children: React.ReactNode;
}) => {
    const { price, duration, packageName, subtitle, children } = props;

    return (
        <div className="w-full">
            <div
                className="wow fadeInUp relative z-10 rounded-sm bg-white px-8 py-10 shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two dark:hover:shadow-gray-dark"
                data-wow-delay=".1s"
            >
                <div className="flex items-center justify-between">
                    <h3 className="price mb-2 text-3xl font-bold text-black dark:text-white">
                        $<span className="amount">{price}</span>
                        <span className="time text-body-color">
                            /{duration}
                        </span>
                    </h3>
                    <h4 className="mb-2 text-xl font-bold text-dark dark:text-white">
                        {packageName}
                    </h4>
                </div>
                <p className="mb-7 text-base text-body-color">{subtitle}</p>
                <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
                    <button className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                        Start Free Trial
                    </button>
                </div>
                <div>{children}</div>
                <BgDesign4/>
            </div>
        </div>
    );
};



export default function Pricing() {
    return (
        <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
            <div className="container">
                <SectionTitle
                    title="Plans for Every Learner"
                    paragraph="Whether you're a student, teacher, or institution, Probify has a plan designed to meet your needs. Pricing details are coming soon."
                    center
                    width="665px"
                />

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    <PricingBox
                        packageName="Starter"
                        price="Coming Soon"
                        duration=""
                        subtitle="Perfect for individuals who want to master probability at their own pace."
                    >
                        <OfferList
                            text="Access to All Lessons"
                            status="active"
                        />
                        <OfferList
                            text="Practice Questions & Quizzes"
                            status="active"
                        />
                        <OfferList text="Progress Tracking" status="active" />
                        <OfferList text="Basic Support" status="active" />
                        <OfferList text="Community Access" status="inactive" />
                        <OfferList text="Teacher Tools" status="inactive" />
                    </PricingBox>

                    <PricingBox
                        packageName="Educator"
                        price="Coming Soon"
                        duration=""
                        subtitle="Designed for tutors and homeschooling parents to guide learners effectively."
                    >
                        <OfferList
                            text="Everything in Starter"
                            status="active"
                        />
                        <OfferList
                            text="Classroom Management"
                            status="active"
                        />
                        <OfferList
                            text="Student Progress Dashboard"
                            status="active"
                        />
                        <OfferList text="Custom Assignments" status="active" />
                        <OfferList text="Email Support" status="active" />
                        <OfferList text="Community Access" status="active" />
                    </PricingBox>

                    <PricingBox
                        packageName="School Plan"
                        price="Coming Soon"
                        duration=""
                        subtitle="Ideal for schools and institutions looking to adopt a scalable solution."
                    >
                        <OfferList
                            text="Everything in Educator"
                            status="active"
                        />
                        <OfferList
                            text="Multiple Teacher Accounts"
                            status="active"
                        />
                        <OfferList
                            text="Bulk Student Onboarding"
                            status="active"
                        />
                        <OfferList text="Advanced Reporting" status="active" />
                        <OfferList text="Priority Support" status="active" />
                        <OfferList text="Admin Controls" status="active" />
                    </PricingBox>
                </div>
            </div>

            <BgDesign3/>
        </section>
    );
};
