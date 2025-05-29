import SharePost from "@/components/Module/SharePost";
import TagButton from "@/components/Module/TagButton";
import Image from "next/image";

import { Metadata } from "next";
import { getModuleBySlug } from "@/actions/modules.action";

import { ActionErrorKind } from "@/utils/errorHandlers";
import { METADATA_BASE_URL, OG_BANNER_URL } from "@/data/framework";
import PageIntro from "@/components/Module/PageIntro";
import ModuleTopicsList from "@/components/Module/ModuleList";
import { dummyTopics } from "@/data/module";
import { Container, Divider } from "@/components/Common/Content";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const {success, kind, data: moduleData} = await getModuleBySlug(params.slug);

    if (!success) {

        if (kind === ActionErrorKind.ERROR_404) {
            return {
                title: "Module Not Found - Probify",
                description: "The requested learning module could not be found.",
            };
        } else {
            return {
                title: "Module Not Resolved - Probify",
                description: "The requested learning module could not be resolved.",
            };
        }
    }


    const title = moduleData.title;
    const thumbnail = moduleData.thumbnail || OG_BANNER_URL;
    const level = moduleData.level;
    const slug = moduleData.slug;
    const description = moduleData.description.slice(0,155);



    return {
        title: `${title} | ${level} Module – Probify`,
        description: description,
        openGraph: {
            title: `${title} | Probify`,
            description: description,
            url: `https://probify.com/module/${slug}`,
            type: "article",
            images: [
                {
                    url: thumbnail,
                    width: 1200,
                    height: 630,
                    alt: `${title} thumbnail`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Probify`,
            description: description,
            images: [thumbnail],
        },
        metadataBase: METADATA_BASE_URL,
    };
}

type Props = {
    params: Promise<{
        slug: string;
    }>
}

export default async function ClassPage({ params }: Props) {
    const slug = (await params).slug;

    console.debug("Module slug", slug);

    return (
        <section className="pb-[120px] pt-[150px]">
            <div className="container">
                <div className="-mx-4 flex flex-wrap justify-center">
                    <PageIntro />

                    <ModuleTopicsList
                        moduleSlug={slug}
                        topics={dummyTopics}
                    />
                </div>
            </div>
        </section>
    );
}

function BlogDetailsPage() {
    

    
    return (
        <>
        
            
            <div className="-mx-4 flex flex-wrap justify-center">
                <div className="w-full px-4 lg:w-8/12">
                <div>
                    

                    <div>
                    
                    <div className="mb-10 w-full overflow-hidden rounded">
                        <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                        <Image
                            src="/images/blog/blog-details-02.jpg"
                            alt="image"
                            fill
                            className="object-cover object-center"
                        />
                        </div>
                    </div>
                    <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Quis enim lobortis scelerisque fermentum. Neque
                        sodales ut etiam sit amet. Ligula ullamcorper
                        <strong className="text-primary dark:text-white">
                        malesuada
                        </strong>
                        proin libero nunc consequat interdum varius. Quam
                        pellentesque nec nam aliquam sem et tortor consequat.
                        Pellentesque adipiscing commodo elit at imperdiet.
                    </p>
                    <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        Semper auctor neque vitae tempus quam pellentesque nec.
                        <span className="text-primary underline dark:text-white">
                        Amet dictum sit amet justo
                        </span>
                        donec enim diam. Varius sit amet mattis vulputate enim nulla
                        aliquet porttitor. Odio pellentesque diam volutpat commodo
                        sed.
                    </p>
                    <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                        Digital marketplace for Ui/Ux designers.
                    </h3>
                    <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        consectetur adipiscing elit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        mattis vulputate cupidatat.
                    </p>
                    <ul className="mb-10 list-inside list-disc text-body-color">
                        <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                        Consectetur adipiscing elit in voluptate velit.
                        </li>
                        <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                        Mattis vulputate cupidatat.
                        </li>
                        <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                        Vulputate enim nulla aliquet porttitor odio pellentesque
                        </li>
                        <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                        Ligula ullamcorper malesuada proin
                        </li>
                    </ul>
                    <div className="relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9">
                        <p className="text-center text-base font-medium italic text-body-color">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod incididunt utionals labore et dolore magna
                        aliqua. Quis lobortis scelerisque fermentum, The Neque ut
                        etiam sit amet.
                        </p>
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
                    </div>
                    <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        consectetur adipiscing elit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        mattis vulputate cupidatat.
                    </p>
                    <div className="items-center justify-between sm:flex">
                        <div className="mb-5">
                        <h4 className="mb-3 text-sm font-medium text-body-color">
                            Popular Tags :
                        </h4>
                        <div className="flex items-center">
                            <TagButton text="Design" />
                            <TagButton text="Development" />
                            <TagButton text="Info" />
                        </div>
                        </div>
                        <div className="mb-5">
                        <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                            Share this post :
                        </h5>
                        <div className="flex items-center sm:justify-end">
                            <SharePost />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};
