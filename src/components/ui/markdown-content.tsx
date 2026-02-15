import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type MarkdownContentProps = {
  markdown: string;
  className?: string;
};

export function MarkdownContent({ markdown, className }: MarkdownContentProps) {
  return (
    <div className={cn("space-y-3 text-sm leading-relaxed text-muted-foreground", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display font-bold text-xl tracking-tight text-foreground">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display font-bold text-lg tracking-tight text-foreground">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display font-bold text-base tracking-tight text-foreground">{children}</h3>
          ),
          p: ({ children }) => <p className="text-sm text-muted-foreground">{children}</p>,
          ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-xs text-foreground">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary/40 pl-3 italic text-muted-foreground">{children}</blockquote>
          ),
          hr: () => <hr className="border-border/70" />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
