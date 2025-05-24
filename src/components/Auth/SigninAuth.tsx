"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Common/Form/InputField";
import { PrimaryButton } from "../ui/Button";
import { showNotImplementedToast } from "@/utils/toast";
import FormError from "../Common/Form/FormError";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Infer TypeScript type from schema
type SignInFormValues = z.infer<typeof signInSchema>;


const SignInAuthForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormValues) => {
        console.debug("Submitted:", data);
        // TODO: Call your auth logic here
        showNotImplementedToast()
        setTimeout(()=>reset(), 2000);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
                <FormError error={errors.root?.message}/>
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
