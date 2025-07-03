"use client";
import { BgDesign6 } from "./Icons";
import { APP_MAIL, APP_NAME } from "@/data/site";
import Logo from "./Logo";
import AppNav from "./AppLink";
import { COOKIES, HASH, MODULES, PRIVACY, TERMS } from "@/data/links";

const Footer = () => {
    return (
        <footer
            className="wow fadeInUp relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24"
            data-wow-delay=".1s"
        >
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    {/* Logo & Description */}
                    <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
                        <div className="mb-12 max-w-[360px] lg:mb-16">
                            <Logo className="mb-8 inline-block w-[250px]" />
                            <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                                Master probability with clarity and confidence.
                                Probify helps you understand the math behind
                                uncertainty—one concept at a time.
                            </p>
                            <p className="text-sm text-body-color dark:text-body-color-dark">
                                &copy; {new Date().getFullYear()} {APP_NAME}.
                                All rights reserved.
                            </p>
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
                        <div className="mb-12 lg:mb-16">
                            <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">
                                Explore
                            </h2>
                            <ul>
                                {[
                                    { label: "Modules", href: MODULES },
                                    { label: "Resources", href: HASH },
                                    { label: "FAQ", href: HASH },
                                ].map((link, index) => (
                                    <li key={index}>
                                        <AppNav
                                            href={link.href}
                                            className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            {link.label}
                                        </AppNav>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
                        <div className="mb-12 lg:mb-16">
                            <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">
                                Legal
                            </h2>
                            <ul>
                                {[
                                    { label: "Terms of Use", href: TERMS },
                                    {
                                        label: "Privacy Policy",
                                        href: PRIVACY,
                                    },
                                    {
                                        label: "Cookie Policy",
                                        href: COOKIES,
                                    },
                                ].map((link, index) => (
                                    <li key={index}>
                                        <AppNav
                                            href={link.href}
                                            className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            {link.label}
                                        </AppNav>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="w-full px-4 lg:w-3/12 xl:w-3/12">
                        <div className="mb-12 lg:mb-16">
                            <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">
                                Contact Us
                            </h2>
                            <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
                                Have a question or need support? Reach out to
                                our team anytime.
                            </p>
                            <AppNav
                                href={HASH}
                                className="text-base text-primary hover:underline"
                            >
                                {APP_MAIL}
                            </AppNav>
                        </div>
                    </div>
                </div>
            </div>

            <BgDesign6 />
        </footer>
    );
};

export default Footer;
