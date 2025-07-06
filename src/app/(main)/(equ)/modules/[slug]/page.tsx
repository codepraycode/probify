import { Metadata } from "next";
import { getModuleMeta, loadModule } from "@/actions/modules.action";

import { ActionErrorKind } from "@/utils/errorHandlers";
import { METADATA_BASE_URL, OG_BANNER_URL } from "@/data/framework";
import PageIntro from "@/components/Module/PageIntro";
import path from "path";
import { existsSync, readdirSync } from "fs";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/Common/DocContent";
import { getCurrentSession } from "@/auth";
import ModuleTopicsList from "@/components/Module/ModuleList";


// const docPath = path.join(process.cwd(), "src/data/docs/modules");
// const extention = ".mdx";

const MODULES_PATH = path.join(process.cwd(), "src/data/docs/modules");
const MDX_EXTENSION = ".mdx";


type Props = {
    params: Promise<{
        slug: string;
    }>;
};


export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const result = await getModuleMeta((await params).slug);

    if (!result.success) {
        return {
            title:
                result.kind === ActionErrorKind.ERROR_404
                    ? "Module Not Found - Probify"
                    : "Error Loading Module - Probify",
            description: result.message,
        };
    }

    const { title, slug, description } = result.data;
    const metaDescription = description.slice(0, 160);

    const metadata: Metadata = {
        title: `${title} Module – Probify`,
        description: metaDescription,
        metadataBase: METADATA_BASE_URL,
        openGraph: {
            title: `${title} | Probify`,
            description: metaDescription,
            url: new URL(`/modules/${slug}`, METADATA_BASE_URL).toString(),
            type: "website",
            siteName: "Probify",
            images: {
                url: OG_BANNER_URL,
                width: 1200,
                height: 630,
                alt: `${title} module preview`,
            },
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Probify`,
            description: metaDescription,
            images: [OG_BANNER_URL],
        },
        alternates: {
            canonical: new URL(
                `/modules/${slug}`,
                METADATA_BASE_URL,
            ).toString(),
        },
    };

    return metadata;
}


export async function generateStaticParams() {
    const files = readdirSync(MODULES_PATH);
    return files
        .filter((file) => file.endsWith(MDX_EXTENSION))
        .map((file) => ({
            slug: file.replace(MDX_EXTENSION, ""),
        }));
}


export default async function ClassPage({
    params,
}: Props) {
    

    // if (!session?.user) {
    //     // Handle unauthenticated case
    //     redirect("/login");
    // }

    const { slug } = await params;
    const introPath = path.join(MODULES_PATH, `${slug}${MDX_EXTENSION}`);

    if (!existsSync(introPath)) {
        notFound();
    }

    const moduleResult = await loadModule(slug);

    if (!moduleResult.success) {
        console.error(moduleResult.message);
        notFound();
    }

    return (
        <section className="pb-[120px] pt-[150px]">
            <Container className="max-w-[1020px]">
                <PageIntro contentPath={introPath} />
                <ModuleTopicsList topics={moduleResult.data.topics} />
            </Container>
        </section>
    );
}