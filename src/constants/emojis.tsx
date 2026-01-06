import Coffee from "@/assets/coffee.png";
import WavingHand from "@/assets/waving-hand.png";
import BrazilFlag from "@/assets/flag-brazil.png";
import UnitedStatesFlag from "@/assets/flag-united-states.png";
import Image, { type ImageProps, type StaticImageData } from "next/image";
import { type FC } from "react";

// Custom emoji component props with better defaults and typing
type EmojiProps = Omit<ImageProps, "src" | "alt"> & {
  size?: number;
  className?: string;
  "data-testid"?: string;
};

// Base emoji component factory for consistent behavior
const createEmojiComponent = (
  src: StaticImageData,
  alt: string,
  defaultSize = 36,
): FC<EmojiProps> => {
  const EmojiComponent: FC<EmojiProps> = ({
    size,
    height = size ?? defaultSize,
    width = size ?? defaultSize,
    className = "",
    priority = false,
    "data-testid": testId,
    ...props
  }) => (
    <Image
      src={src}
      height={height}
      width={width}
      alt={alt}
      className={`inline-block ${className}`}
      priority={priority}
      data-testid={testId || `${alt.toLowerCase().replace(/\s+/g, "-")}-emoji`}
      {...props}
    />
  );
  EmojiComponent.displayName = `Emoji${alt.replace(/\s+/g, "")}`;
  return EmojiComponent;
};

export const Emojis = {
  Coffee: createEmojiComponent(Coffee, "Coffee cup", 36),
  WavingHand: createEmojiComponent(WavingHand, "Waving hand", 36),
  BrazilFlag: createEmojiComponent(BrazilFlag, "Brazil flag", 24),
  UnitedStatesFlag: createEmojiComponent(
    UnitedStatesFlag,
    "United States flag",
    24,
  ),
} satisfies Record<string, FC<EmojiProps>>;

export type EmojiKey = keyof typeof Emojis;

export const getEmoji = (key: EmojiKey) => Emojis[key];

export const EmojiSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  "2xl": 48,
} satisfies Record<string, number>;

export type EmojiSize = keyof typeof EmojiSizes;
