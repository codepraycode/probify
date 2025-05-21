import AppNav from "@/components/Common/AppLink";
import { HOME } from "@/data/links";
import Image from "next/image";


export default function NotFoundPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center dark:bg-gray-900">
            <div className="w-full max-w-md">
                <Image
                    src="/images/404.svg"
                    alt="Page not found"
                    width={400}
                    height={300}
                    className="mx-auto mb-8"
                />

                <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
                    Page not found
                </h1>

                <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                    {
                        "Oops! The page you're looking for doesn't exist or has been moved."
                    }
                </p>

                <AppNav
                    href={HOME}
                    className="inline-block rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-opacity-90"
                >
                    Go back home
                </AppNav>
            </div>
        </main>
    );
}
