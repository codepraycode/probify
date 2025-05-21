import { InputHTMLAttributes, PropsWithChildren, useId } from "react";
import { CheckMark } from "../Icons";
import FormError from "./FormError";
import { FieldError } from "react-hook-form";

type CheckboxProps = PropsWithChildren<
    InputHTMLAttributes<HTMLInputElement>
> & {
    error?: FieldError;
};

const Checkbox = ({ children, id, className, error, ...rest }: CheckboxProps) => {
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
            
            <FormError error={error?.message}/>
        </div>
    );
};

export default Checkbox;
