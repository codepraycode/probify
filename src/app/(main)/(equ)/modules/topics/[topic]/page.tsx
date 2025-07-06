
import { Container } from "@/components/Common/DocContent";
import { TopicExerciseItem } from "@/components/Exercises/TopicExercise";
import ClassTextContent from "@/components/Module/Topic/TextContent";
import { existsSync, readdirSync } from "fs";
import { notFound } from "next/navigation";
import path from "path";


const TOPICS_PATH = path.join(process.cwd(), "src/data/docs/topics");
const MDX_EXTENSION = ".mdx";

const docPath = path.join(process.cwd(), "src/data/docs/topics");
const extention = ".mdx"

export async function generateStaticParams() {
    const files = readdirSync(docPath);
    return files.map((file) => ({
        slug: file.replace(extention, ""),
    }));
}

type Props = {
    params: Promise<{
        topic: string;
    }>
}

export default async function ClassTopicPage({params}: Props) {
    const topic = (await params).topic;

    const filePath = path.join(docPath, `${topic}${extention}`);

    if (!existsSync(filePath)) {
        notFound();
    }
    
    return (
        <main className="w-full scroll-smooth pt-[80px]">
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
