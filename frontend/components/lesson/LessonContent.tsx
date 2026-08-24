import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

type LessonContentProps = {
  content: string;
};

export function LessonContent({ content }: LessonContentProps) {
  return (
    <article className="space-y-6 text-slate-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: false }]]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-10 text-3xl font-bold tracking-tight text-white">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-8 text-2xl font-semibold text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 text-xl font-semibold text-slate-100">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="leading-7 text-slate-300">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="ml-6 list-disc space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-6 list-decimal space-y-2">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-emerald-300 underline decoration-emerald-400/40 underline-offset-4 hover:text-emerald-200"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-emerald-400/50 bg-emerald-400/5 px-5 py-3 italic text-slate-300">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm leading-6 text-slate-200">
              {children}
            </pre>
          ),
          code: ({ children, className }) => {
            const isCodeBlock = Boolean(className);

            return (
              <code
                className={
                  isCodeBlock
                    ? `font-mono ${className}`
                    : "rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-emerald-200"
                }
              >
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <table className="block w-full overflow-x-auto border-collapse text-left text-sm">
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th className="border border-slate-700 bg-slate-800 px-4 py-3 font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-slate-800 px-4 py-3">{children}</td>
          ),
          hr: () => <hr className="border-slate-800" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
