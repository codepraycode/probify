
import { readFileSync } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxParser } from "@/utils/render-function";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import matter from "gray-matter";

type Props = {
    contentPath: string;
};

export default function PageIntro({ contentPath }: Props) {
    const fileContent = readFileSync(contentPath, "utf8");

    const { content, data: _frontmatter } = matter(fileContent);

    return (
        <div className="prose max-w-none">
            <MDXRemote
                source={content} // Only pass the content without frontmatter
                components={mdxParser}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkMath],
                        rehypePlugins: [rehypeKatex],
                        development: process.env.NODE_ENV === "development",
                    },
                }}
            />
        </div>
    );

    // return (
    //     <Container>
    //         <Title> </Title>

    //         <Title2>
    //             <span className="font-semibold text-gray-600">
                    
    //             </span>
    //         </Title2>

    //         <Paragraph>
    //             Probability is all around us — from flipping a coin to
    //             predicting the weather. In this topic, you’ll dive into the
    //             fascinating world of{" "}
    //             <span className="font-semibold text-purple-600">
    //                 chance, uncertainty
    //             </span>
    //             , and{" "}
    //             <span className="font-semibold text-blue-600">
    //                 logical reasoning
    //             </span>
    //             . Whether you&apos;re just getting started or reviewing the
    //             basics, you&apos;ll find clear explanations, real-world
    //             examples, and interactive practice to guide your journey.
    //         </Paragraph>

    //         <List
    //             title="📌 What you'll learn:"
    //             items={[
    //                 "What probability means",
    //                 "How to calculate basic probabilities",
    //                 "The difference between theoretical and experimental probability",
    //                 "How to interpret and compare outcomes",
    //                 "And more…",
    //             ]}
    //         />

    //         <PageMeta date="10-10-2010" attempts={14} questionsCount={12} />

    //         <Divider />
    //     </Container>
    // );
}

