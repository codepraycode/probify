
import { Metadata } from "next";
import { getModuleBySlug } from "@/actions/modules.action";

import { ActionErrorKind } from "@/utils/errorHandlers";
import { METADATA_BASE_URL, OG_BANNER_URL } from "@/data/framework";
import PageIntro from "@/components/Module/PageIntro";
import path from "path";
import { existsSync, readdirSync } from "fs";
import { notFound } from "next/navigation";


export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const {success, kind, data: moduleData} = await getModuleBySlug((await params).slug);

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

const docPath = path.join(process.cwd(), "src/data/docs/modules");
const extention = ".mdx"

export async function generateStaticParams() {
    const files = readdirSync(docPath);
    return files.map((file) => ({
        slug: file.replace(extention, ""),
    }));
}

type Props = {
    params: Promise<{
        slug: string;
    }>
}

export default async function ClassPage({ params }: Props) {
    const slug = (await params).slug;   
    
    const introPath = path.join(docPath, `${slug}${extention}`);

    if (!existsSync(introPath)) {
        notFound();
    }

    return (
        <section className="pb-[120px] pt-[150px]">
            <div className="container">
                <div className="-mx-4 flex flex-wrap justify-center">
                    <PageIntro contentPath={introPath}/>

                    {/* <ModuleTopicsList
                        moduleSlug={slug}
                        topics={dummyTopics}
                    /> */}
                </div>
            </div>
        </section>
    );
}
