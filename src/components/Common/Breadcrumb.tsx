import { HOME } from "@/data/links";
import Link from "next/link";
import AppNav from "./AppLink";
import { BgDesign9 } from "./Icons";
import clsx from "clsx";

const trail = [];
const pageName = "Modules"; // This should be dynamic based on the current page




type Props = {
    pageName: string;
    description: string;
    trail: { name: string; href: string }[];
}

const Breadcrumb = ({
    pageName,
    trail,
    description,
}: Props) => {

    const fullTrail = [
        { name: "Home", href: HOME },
        ...trail,
        { name: pageName, href: "#" },
    ];
    
    return (
        <>
            <section
                className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]"
                aria-label="breadcrumb"
            >
                <div className="container">
                    <div className="-mx-4 flex flex-wrap items-center">
                        <div className="w-full px-4 md:w-8/12 lg:w-7/12">
                            <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                                <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                    {pageName}
                                </h1>
                                <p className="text-base font-medium leading-relaxed text-body-color">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-4/12 lg:w-5/12">
                            <nav
                                className="text-end"
                                aria-label="Breadcrumb"
                                itemScope
                                itemType="https://schema.org/BreadcrumbList"
                            >
                                <ul className="flex items-center md:justify-end">
                                    {fullTrail.map((item, idx) => {

                                        const isLastItem = idx === fullTrail.length - 1;

                                        return (
                                            <li
                                                key={idx}
                                                className="flex items-center"
                                                itemProp="itemListElement"
                                                itemScope
                                                itemType="https://schema.org/ListItem"
                                            >
                                                <AppNav
                                                    href={item.href}
                                                    itemProp="item"
                                                    className={clsx(
                                                        "pr-1 text-base font-medium",
                                                        {
                                                            "pointer-events-none text-primary":
                                                                isLastItem,
                                                            "text-body-color hover:text-primary":
                                                                !isLastItem,
                                                        },
                                                    )}
                                                >
                                                    {item.name}
                                                </AppNav>
                                                <meta
                                                    itemProp="position"
                                                    content={(
                                                        idx + 1
                                                    ).toString()}
                                                />
                                                {!isLastItem && <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>}
                                            </li>
                                        );}
                                    )}

                                    {/* <li className="text-base font-medium text-primary">
                                        {pageName}
                                    </li> */}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <BgDesign9 />
            </section>
        </>
    );
};

export default Breadcrumb;
