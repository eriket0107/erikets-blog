"use client";

import { Link } from "../Link";
import { Typography } from "../Typography";

import { Roboto_Mono } from "next/font/google";

import { motion } from "motion/react";
import { memo } from "react";
import { Emojis } from "@/constants/emojis";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const Logo = memo(() => {
  return (
    <Link href="/" className={`${robotoMono.className}`}>
      <motion.button
        className="cursor-pointer"
        whileTap={{
          scale: 0.97,
        }}
        whileHover={{
          scale: 0.99,
        }}
        role="button"
        aria-labelledby="Logo button"
      >
        <Typography.H1
          className={`text-primary hidden flex-1 gap-4 pb-0 md:flex`}
          data-testid="desktop-title"
        >
          coffee & vanilla code <Emojis.Coffee />
        </Typography.H1>
        <Typography.H1
          className={`text-primary flex min-w-2xs flex-1 gap-4 pb-0 text-left md:hidden md:w-full`}
          data-testid="mobile-title"
        >
          coffee & <br /> vanilla code
          <Emojis.Coffee
            height={36}
            className="justify-end-end mt-auto h-[36px] md:hidden"
          />
        </Typography.H1>
      </motion.button>
    </Link>
  );
});

Logo.displayName = "Logo";
