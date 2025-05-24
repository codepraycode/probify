"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { BgDesign5 } from "../Common/Icons";
import InputField from "../Common/Form/InputField";
import { PrimaryButton } from "../ui/Button";
import { showNotImplementedToast } from "@/utils/toast";

const newsletterSchema = z.object({
    name: z.string({required_error: "Name is required"}).min(2, "Please enter your full name"),
    email: z.string({required_error: "Email is required"}).email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsLatterBox = () => {
    const { theme } = useTheme();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<NewsletterFormData>({
        resolver: zodResolver(newsletterSchema),
    });

    const onSubmit = async (data: NewsletterFormData) => {
        console.debug(data);

        showNotImplementedToast();
        // try {
        //     // Simulate API call — replace with your real API logic
        //     await new Promise((res) => setTimeout(res, 1000));

        //     toast.success(`Thanks for subscribing, ${data.name}!`);
        //     reset();
        // } catch (error) {
        //     toast.error("Oops! Something went wrong. Please try again.");
        // }
    };

    return (
        <div
            className="wow fadeInUp relative z-10 rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark sm:p-11 lg:p-8 xl:p-11"
            data-wow-delay=".2s"
        >
            <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
                Stay Informed with Probify
            </h3>

            <p className="mb-5 border-b border-body-color border-opacity-25 pb-5 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-25">
                Subscribe to receive updates on new probability lessons, timed
                challenges, and leaderboard news.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputField
                    label="Your Name"
                    placeholder="Enter your name"
                    name="name"
                    {...register("name")}
                    error={errors.name}
                    required
                />
                <InputField
                    label="Your Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    error={errors.email}
                    required
                />
                <div className="w-full px-4">
                    <PrimaryButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded bg-primary px-6 py-3 text-white hover:bg-primary/90 disabled:opacity-60"
                    >
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </PrimaryButton>
                </div>
                <br/>
                <p className="text-center text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    No spam guaranteed, So please don’t send any spam mail.
                </p>
            </form>

            <BgDesign5 theme={theme} />
        </div>
    );
};

export default NewsLatterBox;
