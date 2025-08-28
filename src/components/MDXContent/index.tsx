import { MDXRemote } from "next-mdx-remote/rsc";
import COMPONENT_MAP from "@/utils/mdx-components";

interface MDXContentProps {
  content: string;
}

export const MDXContent = ({ content }: MDXContentProps) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote source={content} components={COMPONENT_MAP} />
    </div>
  );
};
