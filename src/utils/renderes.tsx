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
