import { Typography } from "../Typography";
import Link from "next/link";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <Typography.H2
        className={`${robotoMono.className} hidden flex-1 md:block`}
      >
        coffee & vanilla code ☕️
      </Typography.H2>
      <Typography.H3
        className={`${robotoMono.className} sm: block min-w-2xs flex-1 md:hidden md:w-full`}
      >
        coffee & <br /> vanilla code ☕️
      </Typography.H3>
    </Link>
  );
};
