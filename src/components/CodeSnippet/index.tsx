import { Code } from "bright";
import { ReactNode } from "react";

interface CodeSnippetProps {
  children?: ReactNode;
  lang?: string;
  [key: string]: unknown;
}

const CodeSnippet = ({ children, lang = "js", ...props }: CodeSnippetProps) => {
  return (
    <div className="">
      <Code
        theme="dracula"
        lang={lang}
        className="code-block mborder max-w-full overflow-x-auto border-slate-700 text-sm sm:w-[300px]"
        {...props}
      >
        {children}
      </Code>
    </div>
  );
};

export default CodeSnippet;
