"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import InputField from "../Common/Form/InputField";
import { PrimaryButton } from "../ui/Button";
import FormError from "../Common/Form/FormError";
import { ERROR_MESSAGES } from "./auth-messages";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormValues, signInSchema } from "@/lib/validation/auth.validator";
import { useNavigate } from "@/hooks/useNavigate";
import { showSuccessToast } from "@/utils/toast";
import { HOME } from "@/data/links";


const SignInAuthForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    });

    const [errorParam, setErrorParam] = useState("");
    const {navigate} = useNavigate();

    let errorMessage = errors.root?.message

    if (errorParam) {
        errorMessage = ERROR_MESSAGES[errorParam] || ERROR_MESSAGES.default;
    }

    const onSubmit = async (data: SignInFormValues) => {

        const {email, password} = data;

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (!res?.ok) {
            setErrorParam(res.error);
            return;
        }

        showSuccessToast("Authenticated!");
        
        setTimeout(() => {
            // reset();
            // window.location.href = "/auth/signin";
            navigate(HOME)
        }, 1200);
    };

    // console.debug("Error msg", errorMsg);
    // console.debug("Error root", errors.root?.message);

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
                <FormError error={errorMessage && `⚠️ ${errorMessage}`}/>
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
                    {...register("password")}
                    error={errors.password}
                />
            </div>

            <div className="mb-6">
                <PrimaryButton
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default SignInAuthForm;
