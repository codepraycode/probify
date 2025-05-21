import Link from "next/link";

import { Metadata } from "next";
import { HASH, SIGNIN } from "@/data/links";
import AppNav from "@/components/Common/AppLink";
import { GoogleIcon } from "@/components/Common/Icons";
import SignUpAuthForm from "@/components/Auth/SignupAuth";
import { SecondaryButton } from "@/components/ui/Button";
import { GoogleOAuth } from "@/components/Auth/OAuth";
import AuthDivider from "@/components/Auth/AuthDivider";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
  // other metadata
};

const SignupPage = () => {
    return (
        <>
            <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Create your account
            </h3>
            <p className="mb-11 text-center text-base font-medium text-body-color">
                It’s totally free and super easy
            </p>

            <GoogleOAuth label="Sign Up with Google" />

            <AuthDivider/>

            <SignUpAuthForm />

            <p className="text-center text-base font-medium text-body-color">
                Already using Startup?{" "}
                <AppNav href={SIGNIN} className="text-primary hover:underline">
                    Sign in
                </AppNav>
            </p>
        </>
    );
};
export default SignupPage;
