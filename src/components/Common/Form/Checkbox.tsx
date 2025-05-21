import { PropsWithChildren } from "react";
import { CheckMark } from "../Icons";

const Checkbox = (props: PropsWithChildren) => {
    return (
        <div className="mb-8 flex">
            <label
                htmlFor="checkboxLabel"
                className="flex cursor-pointer select-none text-sm font-medium text-body-color"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id="checkboxLabel"
                        className="sr-only"
                    />
                    <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                        {/* Hidden checkmark (activate with state if needed later) */}
                        <CheckMark/>
                    </div>
                </div>
                {
                    props.children
                }
            </label>
        </div>
    );
};

export default Checkbox;
