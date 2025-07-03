"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HASH, PRIVACY, SIGNIN, TERMS } from "@/data/links";
import Checkbox from "../Common/Form/Checkbox";
import InputField from "../Common/Form/InputField";
import AppNav from "../Common/AppLink";
import { PrimaryButton } from "../ui/Button";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import FormError from "../Common/Form/FormError";
import { SignUpFormValues, signUpSchema } from "@/lib/validation/auth.validator";
import { useNavigate } from "@/hooks/useNavigate";
import { useState } from "react";



const SignUpAuthForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
    });


    const {navigate} = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = async (data: SignUpFormValues) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Something went wrong");
            }

            showSuccessToast("Account created! Redirecting to login...");
            reset();

            setTimeout(() => {
                // window.location.href = "/auth/signin";
                navigate(SIGNIN)
            }, 2000);
        } catch (err: any) {
            showErrorToast(err.message);
            setErrorMsg(err.message);
        }
    };

    const errorMessage = errors.root?.message || errorMsg;

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
                <FormError error={`⚠️ ${errorMessage}`}/>
            </div>

            <div className="mb-8">
                <InputField
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    type="text"
                    {...register("name")}
                    error={errors.name}
                />
            </div>

            <div className="mb-8">
                <InputField
                    label="Username"
                    name="username"
                    placeholder="Choose a username"
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
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password")}
                    error={errors.password}
                />
            </div>

            <div className="mb-8">
                <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    type="password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword}
                />
            </div>

            <div className="mb-8">
                <InputField
                    label="School (optional)"
                    name="school"
                    placeholder="e.g. King's College, Lagos"
                    type="text"
                    {...register("school")}
                    error={errors.school}
                />
            </div>

            <div className="mb-8">
                <InputField
                    label="Grade Level (optional)"
                    name="gradeLevel"
                    placeholder="e.g. SS2"
                    type="text"
                    {...register("gradeLevel")}
                    error={errors.gradeLevel}
                />
            </div>

            <div className="mb-8">
                <InputField
                    label="Country (optional)"
                    name="country"
                    placeholder="e.g. Nigeria"
                    type="text"
                    {...register("country")}
                    error={errors.country}
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
