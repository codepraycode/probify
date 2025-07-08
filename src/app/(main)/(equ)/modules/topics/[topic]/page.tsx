
import { getModuleMeta, getTopicMeta } from "@/actions/modules.action";
import { Container } from "@/components/Common/DocContent";
import Spacer from "@/components/Common/Spacer";
import { TopicExerciseItem } from "@/components/Exercises/TopicExercise";
import ClassTextContent from "@/components/Module/Topic/TextContent";
import { METADATA_BASE_URL, OG_BANNER_URL } from "@/data/framework";
import { ActionErrorKind } from "@/utils/errorHandlers";
import { existsSync, readdirSync } from "fs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";


const TOPICS_PATH = path.join(process.cwd(), "src/data/docs/topics");
const MDX_EXTENSION = ".mdx";


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const result = await getTopicMeta((await params).topic);

    if (!result.success) {
        return {
            title:
                result.kind === ActionErrorKind.ERROR_404
                    ? "Topic Not Found - Probify"
                    : "Error Loading topic - Probify",
            description: result.message,
        };
    }

    const { title, slug, description } = result.data;
    const metaDescription = description.slice(0, 160);

    const metadata: Metadata = {
        title: `${title} Topic – Probify`,
        description: metaDescription,
        metadataBase: METADATA_BASE_URL,
        openGraph: {
            title: `${title} | Probify`,
            description: metaDescription,
            url: new URL(`/modules/topics/${slug}`, METADATA_BASE_URL).toString(),
            type: "website",
            siteName: "Probify",
            images: {
                url: OG_BANNER_URL,
                width: 1200,
                height: 630,
                alt: `${title} topic preview`,
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
                `/modules/topics/${slug}`,
                METADATA_BASE_URL,
            ).toString(),
        },
    };

    return metadata;
}

export async function generateStaticParams() {
    const files = readdirSync(TOPICS_PATH);
    return files
        .filter((file) => file.endsWith(MDX_EXTENSION))
        .map((file) => ({
            slug: file.replace(MDX_EXTENSION, ""),
        }));
}


type Props = {
    params: Promise<{
        topic: string;
    }>
}

export default async function ClassTopicPage({params}: Props) {
    const topic = (await params).topic;

    const filePath = path.join(TOPICS_PATH, `${topic}${MDX_EXTENSION}`);

    if (!existsSync(filePath)) {
        notFound();
    }
    
    return (
        <main className="w-full scroll-smooth pt-[80px]">
            <Spacer/>
            <div className="container space-y-10">
                <ClassTextContent contentPath={filePath} />

                <Container>
                    <hr/>

                    
                    <TopicExerciseItem
                        exercise={{
                            createdAt: new Date().toString(),
                            duration: 5,
                            id: "an-Id",
                            questions: 5,
                            topics: [],
                            type: ["fill"],
                        }}
                    />

                </Container>
            </div>

        </main>
    );
}
