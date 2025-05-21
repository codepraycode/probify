"use client";

import Checkbox from "../Common/Form/Checkbox";
import InputField from "../Common/Form/InputField";

const SignUpAuthForm = () => {
    return (
        <form>
            <div className="mb-8">
                <InputField
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    type="text"
                />
            </div>
            <div className="mb-8">
                <InputField
                    label="Work Email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
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

            <Checkbox>
                <span>
                    By creating an account, you agree to the
                    <a href="#0" className="text-primary hover:underline">
                        {" "}
                        Terms and Conditions
                    </a>
                    , and our
                    <a href="#0" className="text-primary hover:underline">
                        {" "}
                        Privacy Policy
                    </a>
                </span>
            </Checkbox>

            <div className="mb-6">
                <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                    Sign up
                </button>
            </div>
        </form>
    );
};

export default SignUpAuthForm;
