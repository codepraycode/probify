import React, { PropsWithChildren } from "react";
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

export function Container({ children, className}: PropsWithChildren & {className?:string}) {
    return <div className={clsx("mx-auto w-full px-4 lg:w-8/12",className )}>{children}</div>;
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
                <h3 className="text-xl text-white my-0 font-semibold">{title}</h3>
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
            <div className="mb-2 flex flex-row items-center gap-2 text-purple-800 dark:text-purple-100">
                <Info className="h-5 w-5" />
                <h3 className="text-xl text-white my-0 font-semibold">{title}</h3>
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


export type ExperimentProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'interactive' | 'visualization';
}

export const Experiment: React.FC<ExperimentProps> = ({
  title,
  children,
  className = '',
  variant = 'default',
}) => {
  return (
    <div
      className={clsx(
        'my-8 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden',
        'shadow-sm bg-white dark:bg-gray-900',
        {
          'border-blue-200 dark:border-blue-800': variant === 'interactive',
          'border-purple-200 dark:border-purple-800': variant === 'visualization',
        },
        className
      )}
    >
      {title && (
        <div
          className={clsx(
            'px-4 py-3 border-b border-gray-200 dark:border-gray-700',
            'bg-gray-50 dark:bg-gray-800',
            {
              'bg-blue-50 dark:bg-blue-900/30': variant === 'interactive',
              'bg-purple-50 dark:bg-purple-900/30': variant === 'visualization',
            }
          )}
        >
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {variant === 'interactive' && (
              <svg
                className="w-5 h-5 text-blue-500 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
            {variant === 'visualization' && (
              <svg
                className="w-5 h-5 text-purple-500 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            )}
            {title}
          </h4>
        </div>
      )}
      <div
        className={clsx('p-4', {
          'bg-gradient-to-br from-blue-50/30 to-white dark:from-blue-900/10 dark:to-gray-900':
            variant === 'interactive',
          'bg-gradient-to-br from-purple-50/30 to-white dark:from-purple-900/10 dark:to-gray-900':
            variant === 'visualization',
        })}
      >
        {children}
      </div>
    </div>
  );
};

interface DefinitionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  badge?: string;
  variant?: 'default' | 'theorem' | 'formula' | 'example';
}

export const Definition: React.FC<DefinitionProps> = ({
  title,
  children,
  className = '',
  badge,
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900',
    theorem: 'border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/20',
    formula: 'border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/20',
    example: 'border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-900/20',
  };

  const badgeColors = {
    default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    theorem: 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100',
    formula: 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100',
    example: 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100',
  };

  return (
    <div
      className={clsx(
        'my-6 rounded-lg border p-4 shadow-xs',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start gap-3">
        {badge && (
          <span
            className={clsx(
              'mt-0.5 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
              badgeColors[variant]
            )}
          >
            {badge}
          </span>
        )}
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h4>
          <div className="mt-2 text-gray-700 dark:text-gray-300 [&>p]:m-0 [&>p]:mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

interface GridProps {
  children: React.ReactNode;
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 2,
  gap = 'md',
  className = '',
  align = 'stretch',
}) => {
  // Handle responsive column definitions
  const getColumnsClass = () => {
    if (typeof columns === 'number') {
      return `grid-cols-1 sm:grid-cols-${Math.min(columns, 2)} md:grid-cols-${Math.min(columns, 3)} lg:grid-cols-${columns}`;
    }
    
    return [
      'grid-cols-1',
      columns.sm && `sm:grid-cols-${columns.sm}`,
      columns.md && `md:grid-cols-${columns.md}`,
      columns.lg && `lg:grid-cols-${columns.lg}`,
      columns.xl && `xl:grid-cols-${columns.xl}`,
    ].filter(Boolean).join(' ');
  };

  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-2 sm:gap-3',
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-10',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  return (
    <div
      className={clsx(
        'grid',
        getColumnsClass(),
        gapClasses[gap],
        alignClasses[align],
        className
      )}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="h-full">
          {child}
        </div>
      ))}
    </div>
  );
};

// Optional GridItem component for more control
interface GridItemProps {
  children: React.ReactNode;
  span?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  span = 1,
  className = '',
}) => {
  const getSpanClass = () => {
    if (typeof span === 'number') {
      return `col-span-1 sm:col-span-${Math.min(span, 2)} md:col-span-${Math.min(span, 3)} lg:col-span-${span}`;
    }
    
    return [
      'col-span-1',
      span.sm && `sm:col-span-${span.sm}`,
      span.md && `md:col-span-${span.md}`,
      span.lg && `lg:col-span-${span.lg}`,
      span.xl && `xl:col-span-${span.xl}`,
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={clsx(getSpanClass(), className)}>
      {children}
    </div>
  );
};