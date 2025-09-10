import { Typography } from "@/components/Typography";
import { ReactNode } from "react";

import CodeSnippet from "@/components/CodeSnippet";
import { Link } from "../components/Link";
import { Button } from "../components/ui/button";
import ArticleImage from "../components/ArticleImage";
import YoutubeEmbed from "../components/YoutubeEmbed";
import { CopyButton } from "@/components/CopyButton";

const COMPONENT_MAP = {
  h1: ({ children }: { children: ReactNode }) => (
    <Typography.H1 className="text-primary mt-8 mb-6 text-3xl font-bold">
      {children}
    </Typography.H1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <Typography.H2 className="text-primary mt-6 mb-4 text-2xl font-semibold">
      {children}
    </Typography.H2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <Typography.H3 className="text-primary mt-5 mb-3 text-xl font-semibold">
      {children}
    </Typography.H3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <Typography.P className="text-primary mb-4 w-auto text-base leading-7 text-wrap [button_&]:mt-0 [button_&]:mb-0">
      {children}
    </Typography.P>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a
      href={href}
      className="text-blue-600 transition-all hover:text-blue-800 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="text-primary mb-4 list-inside list-disc space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="text-primary mb-4 list-inside list-decimal space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="text-primary">{children}</li>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="text-muted-foregroun mb-4 max-w-[300px] rounded bg-slate-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <div className="relative">
      <CopyButton clipboard={children} />
      <pre className="text-foreground mb-4 flex overflow-scroll rounded-lg border-1 bg-slate-100 p-4 dark:bg-gray-800">
        {children}
      </pre>
    </div>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="mb-4 border-l-4 border-gray-300 pl-4 text-gray-600 italic">
      {children}
    </blockquote>
  ),

  CodeSnippet,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: (props: any) => <Link target="_blank" {...props} />,
  // TextPopover: TextPopover,
  ArticleImage,
  Button,
  // ExpandableContent: ExpandableContent,
  YoutubeEmbed,
};

export default COMPONENT_MAP;
