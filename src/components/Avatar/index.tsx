import {
  Avatar as AvatarDefault,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

interface AvatarProps {
  imgSrc: string;
  alt: string;
  fallback: string;
}

export const Avatar = ({ imgSrc, alt, fallback }: AvatarProps) => {
  return (
    <AvatarDefault>
      <AvatarImage loading="lazy" src={imgSrc} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarDefault>
  );
};
