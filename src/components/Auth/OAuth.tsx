import { HASH } from "@/data/links";
import { SecondaryButton } from "../ui/Button";
import { GoogleIcon } from "../Common/Icons";

type Props = {
    label: string;
}

export function GoogleOAuth(props: Props) {
    return (
        <SecondaryButton
            link={HASH}
            className="mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        >
            <span className="mr-3">
                <GoogleIcon />
            </span>
            {props.label}
        </SecondaryButton>
    );
}