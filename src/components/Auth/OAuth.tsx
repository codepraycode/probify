import { HASH } from "@/data/links";
import { BaseButton as Button } from "../ui/Button";
import { GoogleIcon } from "../Common/Icons";
import clsx from "clsx";

type Props = {
    label: string;
}

export function GoogleOAuth(props: Props) {
    return (
        <Button
            link={HASH}
            className={clsx(
                "py- mb-6 flex w-full items-center justify-center rounded-sm border px-6 outline-none transition-all duration-300  dark:border-transparent  dark:shadow-two  dark:hover:shadow-none",
                "border-stroke bg-[#f8f8f8] hover:border-primary hover:bg-primary/5 hover:text-primary dark:bg-[#2C303B] dark:text-body-color-dark dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary ",
                "text-base text-body-color",
            )}
        >
            <span className="mr-3">
                <GoogleIcon />
            </span>
            {props.label}
        </Button>
    );
}