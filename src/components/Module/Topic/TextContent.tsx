import { MDXRemote } from "next-mdx-remote/rsc";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { mdxParser } from "@/utils/render-function"; // your MDX component map
import { existsSync, readFileSync } from "fs";
import { notFound } from "next/navigation";
import { Container } from "@/components/Common/DocContent";
import matter from "gray-matter";

// type Props = {
//     source: string;
// };




// type Props = {
//     params: Promise<{ slug: string }>;
// }
type Props = {
    contentPath: string;
}


const content = `
# 🎲 What is Probability?

## Unlock the power of chance and prediction!

Probability is a branch of mathematics that deals with **uncertainty**. It tells us how likely something is to happen.

In simple terms:

Probability is all around us — from flipping a coin to predicting the weather. In this topic, you’ll dive into the fascinating world of <Bold>chance, uncertainty</Bold> and <Bold>logical reasoning</Bold>. 

<Line/>

> **Probability** is a number between 0 and 1 that shows how likely an event is to occur.

<List
  items={[
    "If something is **impossible**, its probability is **0**.",
    "If something is **certain**, its probability is **1**."
  ]}
/>
    
***

### 🔢 Probability Formula

If all outcomes are equally likely, the probability of an event happening is:

$$
P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of outcomes}}
$$

#### Example:

If you roll a fair six-sided die:

$$
P(\\text{rolling a 4}) = \\frac{1}{6}
$$

<Line/>

<List
  title="📌 What you'll learn:"
  items={[
    "What probability means",
    "How to calculate basic probabilities",
    "The difference between theoretical and experimental probability",
    "How to interpret and compare outcomes",
    "And more…",
  ]}
/>
`;

export default function ClassTextContent({contentPath}: Props) {

    const fileContent = readFileSync(contentPath, "utf8");
    
    const { content, data: _frontmatter } = matter(fileContent);
    return (
        <Container>
            <MDXRemote
                source={content}
                components={mdxParser}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkMath],
                        rehypePlugins: [rehypeKatex],
                        development: process.env.NODE_ENV === "development",
                    },
                }}
            />
        </Container>
    );
}
