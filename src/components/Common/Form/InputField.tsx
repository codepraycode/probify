import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import FormError from "./FormError";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: FieldError;
}

export default function InputField({ label, name, error, required, ...rest }: Props) {
    return (
        <div className="mb-8">
            <label
                htmlFor={name}
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <input
                id={name}
                name={name}
                {...rest}
                required={required}
                className={clsx(
                    "w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none",
                    {
                        "border-red-500": Boolean(error),
                        "border-stroke": !Boolean(error),
                    },
                )}
            />

            <FormError error={error?.message} />
        </div>
    );
};
