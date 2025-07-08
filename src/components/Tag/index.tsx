import { cn, truncateString } from "@/utils";

interface TagProps {
  tag: string;
  className?: string;
}

const TAG_LENGTH = 10;

export const Tag = ({ tag, className }: TagProps) => {
  const truncateTag = truncateString(tag, TAG_LENGTH);
  return (
    <span
      className={cn(
        "bg-accent w-auto rounded-md p-1 text-center text-xs font-semibold",
        className,
      )}
    >
      {truncateTag}
    </span>
  );
};
