
import { APP_LIVE_URL, SIGNIN, SIGNUP } from "@/data/links";
import AppNav from "@/components/Common/AppLink";
import SignUpAuthForm from "@/components/Auth/SignupAuth";
import { GoogleOAuth } from "@/components/Auth/OAuth";
import AuthDivider from "@/components/Auth/AuthDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Your Account – Probify",
    description:
        "Join Probify today and start mastering probability through fun, bite-sized lessons.",
    openGraph: {
        title: "Create Your Account – Probify",
        description: "Join Probify and explore probability like never before.",
        url: `${APP_LIVE_URL}${SIGNUP}`,
        siteName: "Probify",
        images: [
            {
                url: "/og/banner.png",
                width: 1200,
                height: 630,
                alt: "Sign Up for Probify",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Create Your Account – Probify",
        description: "Learn probability with gamified tools and challenges.",
        images: ["/og/banner.png"],
    },
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
