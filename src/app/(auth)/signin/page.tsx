

import { Metadata } from "next";
import { APP_LIVE_URL, SIGNIN, SIGNUP } from "@/data/links";
import AppNav from "@/components/Common/AppLink";
import SignInAuthForm from "@/components/Auth/SigninAuth";
import { GoogleOAuth } from "@/components/Auth/OAuth";

export const metadata: Metadata = {
    title: "Sign In – Probify",
    description:
        "Access your Probify account to continue learning probability in a fun, interactive way.",
    openGraph: {
        title: "Sign In – Probify",
        description: "Access your Probify account to continue learning.",
        url: `${APP_LIVE_URL}${SIGNIN}`,
        siteName: "Probify",
        images: [
            {
                url: "/og/main.png",
                width: 1200,
                height: 630,
                alt: "Sign In to Probify",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign In – Probify",
        description: "Continue your probability learning journey.",
        images: ["/og/main.png"],
    },
};

const SigninPage = () => {
  return (
      <>
          <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
              Sign in to your account
          </h3>
          <p className="mb-11 text-center text-base font-medium text-body-color">
              Login to your account.
          </p>

          <GoogleOAuth label="Sign in with Google" />

          <div className="mb-8 flex items-center justify-center">
              <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
              <p className="w-full px-5 text-center text-base font-medium text-body-color">
                  Or, register with your email
              </p>
              <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
          </div>
          <SignInAuthForm />

          <p className="text-center text-base font-medium text-body-color">
              Don’t you have an account?{" "}
              <AppNav href={SIGNUP} className="text-primary hover:underline">
                  Sign up
              </AppNav>
          </p>
      </>
  );
};

export default SigninPage;
