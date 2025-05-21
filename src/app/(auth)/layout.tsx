import { BgDesign8 } from "@/components/Common/Icons";
import Logo from "@/components/Common/Logo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-10 lg:pt-[80px] ">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[650px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                            <Logo className="w-1/2 mx-auto"/>
                            <br/>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <BgDesign8 />
        </main>
    );
}
