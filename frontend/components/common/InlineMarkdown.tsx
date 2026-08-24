import ReactMarkdown from "react-markdown";

type InlineMarkdownProps = {
  children: string;
};

export function InlineMarkdown({ children }: InlineMarkdownProps) {
  return (
    <ReactMarkdown
      allowedElements={["p", "code", "strong", "em"]}
      unwrapDisallowed
      components={{
        p: ({ children: paragraphChildren }) => <>{paragraphChildren}</>,
        code: ({ children: codeChildren }) => (
          <code className="rounded border border-emerald-400/20 bg-slate-950 px-1.5 py-0.5 font-mono text-[0.9em] text-emerald-200">
            {codeChildren}
          </code>
        ),
        strong: ({ children: strongChildren }) => (
          <strong className="font-semibold text-white">{strongChildren}</strong>
        ),
        em: ({ children: emphasizedChildren }) => (
          <em className="italic text-slate-200">{emphasizedChildren}</em>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
