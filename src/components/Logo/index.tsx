import { Link } from "../Link";
import { Typography } from "../Typography";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const Logo = () => {
  return (
    <Link
      href="/"
      className={` ${robotoMono.className} md:hover:border-accent-foreground border-b-1 border-transparent transition-all hover:scale-99 hover:opacity-80`}
    >
      <Typography.H2 className={`hidden flex-1 pb-0 md:block`}>
        coffee & vanilla code ☕️
      </Typography.H2>
      <Typography.H3
        className={`min-w-2xs flex-1 pb-0 sm:block md:hidden md:w-full`}
      >
        coffee & <br /> vanilla code ☕️
      </Typography.H3>
    </Link>
  );
};
