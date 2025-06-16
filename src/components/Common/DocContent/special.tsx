import { PropsWithChildren } from "react";
import { BoldText, Text } from "./texts";
import clsx from "clsx";
import { Calendar, Eye, HelpCircle, Info, ScrollText } from "lucide-react";

export function Divider() {
    return (
        <div className="mb-10 mt-5 border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10" />
    );
}

export type ExampleProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
};

export const Example: React.FC<ExampleProps> = ({
    title,
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={
                "my-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-zinc-700 dark:bg-gray-dark"
            }
            {...props}
        >
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <BoldText>{title || "🧠 Example"}</BoldText>
            </h3>
            <div className="prose prose-sm max-w-none dark:prose-invert">
                {children}
            </div>
        </div>
    );
};

export function Note({ children }: PropsWithChildren) {
    return (
        <blockquote className="relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9">
            <div className="text-center text-base font-medium italic text-body-color">
                {children}
            </div>
            <span className="absolute left-0 top-0 z-[-1]">
                <svg
                    width="132"
                    height="109"
                    viewBox="0 0 132 109"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        opacity="0.5"
                        d="M33.0354 90.11C19.9851 102.723 -3.75916 101.834 -14 99.8125V-15H132C131.456 -12.4396 127.759 -2.95278 117.318 14.5117C104.268 36.3422 78.7114 31.8952 63.2141 41.1934C47.7169 50.4916 49.3482 74.3435 33.0354 90.11Z"
                        fill="url(#paint0_linear_111:606)"
                    />
                    <path
                        opacity="0.5"
                        d="M33.3654 85.0768C24.1476 98.7862 1.19876 106.079 -9.12343 108.011L-38.876 22.9988L100.816 -25.8905C100.959 -23.8126 99.8798 -15.5499 94.4164 0.87754C87.5871 21.4119 61.9822 26.677 49.5641 38.7512C37.146 50.8253 44.8877 67.9401 33.3654 85.0768Z"
                        fill="url(#paint1_linear_111:606)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_111:606"
                            x1="94.7523"
                            y1="82.0246"
                            x2="8.40951"
                            y2="52.0609"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="white" stopOpacity="0.06" />
                            <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_111:606"
                            x1="90.3206"
                            y1="58.4236"
                            x2="1.16149"
                            y2="50.8365"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="white" stopOpacity="0.06" />
                            <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </span>
            <span className="absolute bottom-0 right-0 z-[-1]">
                <svg
                    width="53"
                    height="30"
                    viewBox="0 0 53 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        opacity="0.8"
                        cx="37.5"
                        cy="37.5"
                        r="37.5"
                        fill="#4A6CF7"
                    />
                    <mask
                        id="mask0_111:596"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="75"
                        height="75"
                    >
                        <circle
                            opacity="0.8"
                            cx="37.5"
                            cy="37.5"
                            r="37.5"
                            fill="#4A6CF7"
                        />
                    </mask>
                    <g mask="url(#mask0_111:596)">
                        <circle
                            opacity="0.8"
                            cx="37.5"
                            cy="37.5"
                            r="37.5"
                            fill="url(#paint0_radial_111:596)"
                        />
                        <g opacity="0.8" filter="url(#filter0_f_111:596)">
                            <circle
                                cx="40.8089"
                                cy="19.853"
                                r="15.4412"
                                fill="white"
                            />
                        </g>
                    </g>
                    <defs>
                        <filter
                            id="filter0_f_111:596"
                            x="4.36768"
                            y="-16.5881"
                            width="72.8823"
                            height="72.8823"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feGaussianBlur
                                stdDeviation="10.5"
                                result="effect1_foregroundBlur_111:596"
                            />
                        </filter>
                        <radialGradient
                            id="paint0_radial_111:596"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(37.5 37.5) rotate(90) scale(40.2574)"
                        >
                            <stop stopOpacity="0.47" />
                            <stop offset="1" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </span>
        </blockquote>
    );
}

export function Container({ children }: PropsWithChildren) {
    return <div className="mx-auto w-full px-4 lg:w-8/12">{children}</div>;
}

type SummaryProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
};

export const Summary: React.FC<SummaryProps> = ({
    title = "Summary",
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={clsx(
                "my-6 rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20",
                className,
            )}
            {...props}
        >
            <div className="mb-2 flex items-center gap-2 text-green-800 dark:text-green-100">
                <ScrollText className="h-5 w-5" />
                <h3 className="text-base font-semibold">{title}</h3>
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
                {children}
            </div>
        </div>
    );
};

type FactsProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
};

export const Facts: React.FC<FactsProps> = ({
    title = "Did You Know?",
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={clsx(
                "my-6 rounded-lg border border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-900/20",
                className,
            )}
            {...props}
        >
            <div className="mb-2 flex items-center gap-2 text-purple-800 dark:text-purple-100">
                <Info className="h-5 w-5" />
                <h3 className="text-base font-semibold">{title}</h3>
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
                {children}
            </div>
        </div>
    );
};

export function PageMeta({
    date,
    questionsCount,
    attempts,
    tag,
}: {
    date: string;
    questionsCount: number;
    attempts: number;
    tag?: string;
}) {
    return (
        <div className="flex flex-wrap items-center justify-between px-4 py-3 mt-10">
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <Text>{new Date(date).toLocaleDateString()}</Text>
                </div>
                <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <Text>{questionsCount} questions</Text>
                </div>
                <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <Text>{attempts} attempts</Text>
                </div>
            </div>

            {tag && (
                <Text className="mt-3 inline-flex items-center rounded-full bg-purple-600/90 px-3 py-1 text-xs font-semibold text-white shadow-sm dark:bg-purple-500/80 md:mt-0"></Text>
            )}
        </div>
    );
}
