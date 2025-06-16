"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HASH, PRIVACY, TERMS } from "@/data/links";
import Checkbox from "../Common/Form/Checkbox";
import InputField from "../Common/Form/InputField";
import AppNav from "../Common/AppLink";
import { PrimaryButton } from "../ui/Button";
import { showNotImplementedToast } from "@/utils/toast";
import FormError from "../Common/Form/FormError";

const signUpSchema = z
    .object({
        username: z.string().min(3, "Username must be at least 3 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
        agree: z.literal(true, {
            errorMap: () => ({ message: "You must agree to the terms" }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type SignUpFormValues = z.infer<typeof signUpSchema>;


const SignUpAuthForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormValues) => {
        console.debug("Registering:", data);
        // TODO: Submit to backend or Auth service
        showNotImplementedToast();

        setTimeout(reset, 2000);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
                <FormError error={errors.root?.message} />
            </div>
            <div className="mb-8">
                <InputField
                    label="Your Username"
                    name="username"
                    placeholder="Enter a username"
                    type="text"
                    {...register("username")}
                    error={errors.username}
                />
            </div>
            <div className="mb-8">
                <InputField
                    label="Email Address"
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                    {...register("email")}
                    error={errors.email}
                />
            </div>
            <div className="mb-8">
                <InputField
                    label="Your Password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                />
            </div>
            <div className="mb-8">
                <InputField
                    label="Confirm Your Password"
                    name="re-password"
                    placeholder="Enter your password again"
                    type="password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword}
                />
            </div>

            <Checkbox error={errors.agree} {...register("agree")}>
                <span>
                    By creating an account, you agree to the
                    <AppNav
                        href={TERMS}
                        className="text-primary hover:underline"
                    >
                        {" "}
                        Terms and Conditions
                    </AppNav>
                    , and our
                    <AppNav
                        href={PRIVACY}
                        className="text-primary hover:underline"
                    >
                        {" "}
                        Privacy Policy
                    </AppNav>
                </span>
            </Checkbox>

            <div className="mb-6">
                <PrimaryButton
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default SignUpAuthForm;
