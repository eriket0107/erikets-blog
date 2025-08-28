import { cn } from "@/utils";
import Image from "next/image";
import type { ImageProps } from "next/image";

type ArticleImageProps = ImageProps & {
  src: string;
  alt?: string;
  caption?: string;
  height?: number;
  width?: number;
  loading?: "lazy" | "eager";
};

export default function ArticleImage({
  src,
  alt,
  caption,
  className,
  ...props
}: ArticleImageProps) {
  return (
    <figure className="not-prose relative mx-auto my-8 flex flex-col items-center justify-center gap-2 text-center md:w-[90%]">
      <Image
        src={src}
        fill
        alt={alt}
        className={cn("!relative", className)}
        {...props}
      />
      {caption && (
        <figcaption className="text-muted-foreground not-prose text-xs md:text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
