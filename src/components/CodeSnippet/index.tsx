import { Code } from "bright";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface CodeSnippetProps {
  children?: ReactNode;
  lang?: string;
  [key: string]: unknown;
}

const CodeSnippet = ({ children, lang = "js", ...props }: CodeSnippetProps) => {
  return (
    <div className="relative">
      <Button className="absolute top-4 right-4">
        <Copy />
      </Button>
      <Code
        theme="dracula"
        lang={lang}
        className="code-block w-3/4 border border-slate-700 text-sm md:w-auto"
        {...props}
      >
        {children}
      </Code>
    </div>
  );
};

export default CodeSnippet;
