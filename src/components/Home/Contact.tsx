"use client";

import { useForm } from "react-hook-form";
import NewsLatterBox from "../Contact/NewsLatterBox";
import { ContactFormValues, contactSchema } from "@/lib/schema/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import InputField from "../Common/Form/InputField";
import { TextareaField } from "../Common/Form/TextAreaField";
import FormError from "../Common/Form/FormError";
import { PrimaryButton } from "../ui/Button";
import { showNotImplementedToast } from "@/utils/toast";

export default function Contact() {
    return (
        <section
            id="contact"
            className="overflow-hidden py-16 md:py-20 lg:py-28"
        >
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                        <div
                            className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                            data-wow-delay=".15s"
                        >
                            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                Need Help? Open a Ticket
                            </h2>
                            <p className="mb-12 text-base font-medium text-body-color">
                                Our support team will get back to you ASAP via
                                email.
                            </p>

                            <ContactForm/>


                        </div>
                    </div>
                    <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
                        <NewsLatterBox />
                    </div>
                </div>
            </div>
        </section>
    );
}


function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        reset,
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit = async (data: ContactFormValues) => {
        setSubmitError(null);
        console.debug(data);
        showNotImplementedToast();

        setTimeout(reset, 2000);
        // try {
        //     // simulate sending to server
        //     await new Promise((res) => setTimeout(res, 1500));
        //     reset();
        // } catch (err) {
        //     setSubmitError("Failed to send message. Please try again.");
        // }
    };

    return (
        <>
            {isSubmitSuccessful && (
                <div className="mb-6 rounded bg-green-100 p-4 text-green-800">
                    Message sent successfully!
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-8 w-full px-4">
                    <FormError error={submitError} />
                </div>
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                        <InputField
                            label="Your Name"
                            name="name"
                            {...register("name")}
                            error={errors.name}
                            required
                        />
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                        <InputField
                            label="Your Email"
                            name="email"
                            type="email"
                            {...register("email")}
                            error={errors.email}
                            required
                        />
                    </div>

                    <div className="w-full px-4">
                        <TextareaField
                            label="Your Message"
                            name="message"
                            rows={5}
                            {...register("message")}
                            error={errors.message}
                            required
                        />
                    </div>

                    <div className="w-full px-4">
                        <PrimaryButton
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded bg-primary px-6 py-3 text-white hover:bg-primary/90 disabled:opacity-60"
                        >
                            {isSubmitting ? "Sending..." : "Submit Ticket"}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </>
    );
};