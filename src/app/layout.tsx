import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

import { Inter } from "next/font/google";
import { Providers } from "@/layout/ThemeLayout";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
                <Providers>
                    {children}
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            duration: 4000,
                            className: "text-xl font-medium",
                        }}
                    />
                </Providers>
            </body>
        </html>
    );
}
