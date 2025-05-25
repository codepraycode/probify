import { InputHTMLAttributes, PropsWithChildren, useId } from "react";
import { CheckMark } from "../Icons";
import FormError from "./FormError";
import { FieldError } from "react-hook-form";
import clsx from "clsx";

type CheckboxProps = PropsWithChildren<
    InputHTMLAttributes<HTMLInputElement>
> & {
    error?: FieldError;
};

const Checkbox = ({
    children,
    id,
    className,
    error,
    ...rest
}: CheckboxProps) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
        <div className="mb-8">
            <label
                htmlFor={checkboxId}
                className="flex cursor-pointer select-none text-sm font-medium text-body-color"
            >
                <div className="relative">
                    <input
                        id={checkboxId}
                        type="checkbox"
                        className="peer sr-only"
                        {...rest}
                    />
                    <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                        <CheckMark className="h-3 w-3 text-primary opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
                    </div>
                </div>
                {children}
            </label>

            <FormError error={error?.message} />
        </div>
    );
};

export default Checkbox;

type CheckboxGroupProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    options: string[];
    selectedValues?: string[]; // optional controlled, but we rely on native input checked here
    disabled?: boolean;
    error?: string;
};

export function CheckboxGroup({
    label,
    name,
    options,
    disabled,
    error,
    ...rest
}: CheckboxGroupProps) {
    return (
        <div className="mb-6">
            <span className="mb-3 block text-sm font-medium text-dark dark:text-white">
                {label}
            </span>

            <div className="flex flex-wrap gap-2">
                {options.map((opt, i) => {
                    const inputId = `${name}-${i}`;

                    return (
                        <div
                            key={opt}
                            className="inline-flex shrink-0" // <-- ensures items wrap without overlapping
                        >
                            <input
                                type="checkbox"
                                id={inputId}
                                name={name}
                                value={opt}
                                disabled={disabled}
                                className="peer sr-only"
                                {...rest}
                            />
                            <label
                                htmlFor={inputId}
                                className={clsx(
                                    "cursor-pointer select-none whitespace-nowrap rounded-full border px-4 py-2 text-sm transition",
                                    "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-md",
                                    "border-stroke bg-gray-light text-body-color hover:shadow-md dark:border-stroke-dark dark:bg-bg-color-dark dark:text-body-color-dark",
                                    disabled && "cursor-not-allowed opacity-50",
                                )}
                            >
                                {opt}
                            </label>
                        </div>
                    );
                })}
            </div>

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

type RadioGroupProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    options: { value: string; label: React.ReactNode, hint?: string; }[];
    selectedValue?: string; // for controlled if needed
    disabled?: boolean;
    error?: string;
};

export function RadioGroup({
    label,
    name,
    options,
    disabled,
    error,
    ...rest
}: RadioGroupProps) {
    return (
        <div className="mb-6">
            <span className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {label}
            </span>

            <div className="flex gap-6">
                {options.map(({ value, label: optionLabel, hint }, i) => {
                    const inputId = `${name}-${i}`;
                    return (
                        <div key={value}>
                            <input
                                type="radio"
                                id={inputId}
                                name={name}
                                value={value}
                                disabled={disabled}
                                className="peer sr-only"
                                {...rest}
                            />
                            <label
                                htmlFor={inputId}
                                className={clsx(
                                    "flex cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                                    "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-md",
                                    "border-stroke bg-gray-light text-body-color hover:shadow-md dark:border-stroke-dark dark:bg-bg-color-dark dark:text-body-color-dark",
                                    disabled && "cursor-not-allowed opacity-50",
                                )}
                                title={hint}
                            >
                                {optionLabel}
                            </label>
                        </div>
                    );
                })}
            </div>

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}