import AppNav from "@/components/Common/AppLink";
import { BgDesign7 } from "@/components/Common/Icons";
import { PrimaryButton } from "@/components/ui/Button";
import { HOME } from "@/data/links";
import Image from "next/image";


export default function NotFoundPage() {
    return (
        <main className="relative z-10 pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
            <div className="container">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[530px] text-center">
                            <div className="mx-auto text-center mb-9">
                                <Image
                                    src="/images/404.svg"
                                    alt="Page not found"
                                    width={400}
                                    height={300}
                                    className="mx-auto mb-8"
                                />
                            </div>

                            <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
                                Page not found
                            </h1>

                            <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                                {
                                    "Oops! The page you're looking for doesn't exist or has been moved."
                                }
                            </p>

                            <PrimaryButton
                                link={HOME}
                            >
                                Go back home
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            <BgDesign7 />
        </main>
    );
}
