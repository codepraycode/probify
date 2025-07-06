import { SessionProvider } from "@/providers/SessionProvider";
import "../styles/index.css";
// import "@radix-ui/themes/styles.css";

// import { Inter } from "next/font/google";
import ThemeProvider from "@/providers/ThemeLayout";
import { Toaster } from "sonner";


// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <body className={"bg-[#FCFCFC] dark:bg-black"}>
                <ThemeProvider>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                    <Toaster
                        toastOptions={{
                            duration: 4000,
                            className: "text-xl font-medium",
                        }}
                        position="top-right"
                        richColors
                        closeButton
                        expand={true}
                        visibleToasts={3}
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
