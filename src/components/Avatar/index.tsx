import { cn } from "@/utils/cn";
import {
  Avatar as AvatarDefault,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

interface AvatarProps {
  imgSrc: string;
  alt: string;
  fallback: string;
  className?: string;
}

const Circle = ({ imgSrc, alt, fallback }: AvatarProps) => {
  return (
    <AvatarDefault>
      <AvatarImage loading="eager" src={imgSrc} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarDefault>
  );
};


const Rectangular = ({
  imgSrc,
  alt,
  fallback,
  className
}: AvatarProps) => {
  return (
    <AvatarDefault className={cn(`rounded-lg`, className)}>
      <AvatarImage
        loading="eager"
        src={imgSrc}
        alt={alt}
        className="rounded-lg object-cover"
      />
      <AvatarFallback className="rounded-lg">
        {fallback}
      </AvatarFallback>
    </AvatarDefault>
  );
};

const Avatar = {
  Circle,
  Rectangular,
};

export { Avatar };