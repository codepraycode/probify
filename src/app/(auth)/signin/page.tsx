import Link from "next/link";

import { Metadata } from "next";
import { SIGNUP } from "@/data/links";
import AppNav from "@/components/Common/AppLink";
import { GoogleIcon } from "@/components/Common/Icons";
import SignInAuthForm from "@/components/Auth/SigninAuth";

export const metadata: Metadata = {
  title: "Sign In Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign In Page for Startup Nextjs Template",
  // other metadata
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
          <button className="mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
              <span className="mr-3">
                  <GoogleIcon />
              </span>
              Sign in with Google
          </button>

          <div className="mb-8 flex items-center justify-center">
              <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
              <p className="w-full px-5 text-center text-base font-medium text-body-color">
                  Or, register with your email
              </p>
              <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
          </div>
          <SignInAuthForm/>
          
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
