

import Footer from "@/components/Common/Footer";
import ScrollToTop from "@/components/Common/ScrollToTop";
import Header from "@/components/Common/Header";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
        </>
    );
}
