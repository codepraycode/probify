import {
    BoldText,
    Divider,
    LinkTextProps,
    LinkText,
    List,
    ListProps,
    Note,
    Paragraph,
    Title,
    Title2,
    Title3,
    ExampleProps,
    Example,
    ListItem,
    TableCell,
    TableHeaderCell,
    TableRow,
    TableHead,
    TableBody,
    Table,
    Summary,
    Facts,
    PageMeta,
    Container,
} from "@/components/Common/DocContent";
import ModuleTopicsList from "@/components/Module/ModuleList";
import { JSX, PropsWithChildren } from "react";
import { InlineMath } from "react-katex";

export function parseQuestionText(katext: string) {
    const parts = katext.split(/(\$[^$]*\$)/g); // Split on $...$
    return parts.map((part, index) => {
        if (part.startsWith("$") && part.endsWith("$")) {
            return <InlineMath key={index} math={part.slice(1, -1)} />;
        }
        return <span key={index}>{part}</span>;
    });
}

type MdxParser = PropsWithChildren & JSX.IntrinsicAttributes;
type MdxListParser = ListProps & JSX.IntrinsicAttributes;
type MdxLinkParser = LinkTextProps;
type MdxExampleParser = ExampleProps;

export const mdxParser = {
    h1: (props: MdxParser) => <Title {...props} />,
    h2: (props: MdxParser) => <Title2 {...props} />,
    h3: (props: MdxParser) => <Title3 {...props} />,
    p: (props: MdxParser) => <Paragraph {...props} />,
    li: (props: MdxParser) => <ListItem {...props} />,
    Bold: (props: MdxParser) => <BoldText {...props} />,
    a: (props: MdxLinkParser) => <LinkText {...props} />,
    Note: (props: MdxParser) => <Note {...props} />,
    blockquote: (props: MdxParser) => <Note {...props} />,
    hr: (props: MdxParser) => <Divider {...props} />,
    Line: (props: MdxParser) => <Divider {...props} />,
    List: (props: MdxListParser) => <List {...props} />,
    Example: (props: MdxExampleParser) => <Example {...props} />,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeaderCell,
    TableCell,
    Summary,
    Facts,
    PageMeta,
    ModuleTopicsList,
    Container,
};