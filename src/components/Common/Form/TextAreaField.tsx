import { TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import FormError from "./FormError";
import clsx from "clsx";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    error?: FieldError;
}

export const TextareaField = ({ label, name, error,required, ...rest }: Props) => {
    return (
        <div className="mb-8">
            <label
                htmlFor={name}
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <textarea
                id={name}
                name={name}
                required={required}
                {...rest}
                className={clsx(
                    "w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none",
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
