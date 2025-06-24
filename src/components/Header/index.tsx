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
      direction="row"
      gap="4"
      justify="between"
      align="center"
      className="px-50 py-20"
    >
      <Typography.H2 className={`${robotoMono.className}`}>
        coffee and vanilla code ☕️
      </Typography.H2>
      <ThemeButton />
    </Box>
  );
};
