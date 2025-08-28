import { Typography } from "@/components/Typography";
import { ReactNode } from "react";

import CodeSnippet from "@/components/CodeSnippet";
import { Link } from "./components/Link";
import { Button } from "./components/ui/button";
import ArticleImage from "./components/ArticleImage";
import YoutubeEmbed from "./components/YoutubeEmbed";

const components = {
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
    <Typography.P className="text-primary mb-4 text-base leading-7">
      {children}
    </Typography.P>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a
      href={href}
      className="text-blue-600 underline transition-colors hover:text-blue-800"
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
    <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="mb-4 border-l-4 border-gray-300 pl-4 text-gray-600 italic dark:text-gray-400">
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

export function useMDXComponents() {
  return components;
}
