"use client";

import { Link } from "../Link";
import { Typography } from "../Typography";

import { Roboto_Mono } from "next/font/google";

import { motion } from "motion/react";
import { memo } from "react";

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
          scale: 0.95,
        }}
        whileHover={{
          scale: 1.05,
        }}
        role="button"
        aria-labelledby="Logo button"
      >
        <Typography.H2
          className={`text-primary hidden flex-1 pb-0 md:block`}
          data-testid="desktop-title"
        >
          coffee & vanilla code ☕️
        </Typography.H2>
        <Typography.H2
          className={`text-primary min-w-2xs flex-1 pb-0 text-left sm:block md:hidden md:w-full`}
          data-testid="mobile-title"
        >
          coffee & <br /> vanilla code ☕️
        </Typography.H2>
      </motion.button>
    </Link>
  );
});

Logo.displayName = "Logo";
