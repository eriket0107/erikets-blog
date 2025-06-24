import { Box } from "../Box";
import { ThemeButton } from "../ThemeButton";
import { Typography } from "../Typography";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const Header = () => {
  return (
    <Box
      as="header"
      justify="between"
      align="center"
      className="flex flex-row px-15 py-4 lg:px-25 lg:py-15"
      aria-label="Header of screen"
    >
      <Typography.H2 className={`${robotoMono.className} hidden lg:block`}>
        coffee & vanilla code ☕️
      </Typography.H2>
      <Typography.H3 className={`${robotoMono.className} block lg:hidden`}>
        coffee & <br /> vanilla code ☕️
      </Typography.H3>
      <ThemeButton />
    </Box>
  );
};
