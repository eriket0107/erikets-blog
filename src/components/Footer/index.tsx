import { Box } from "../Box";
import { Typography } from "../Typography";

export const Footer = () => {
  return (
    <Box
      as="footer"
      justify="between"
      align="center"
      className="shadow-accent bottom-0 flex flex-row border-t-1 px-15 py-4 shadow"
      aria-label="Footer of screen"
    >
      <Typography.Small className="text-muted-foreground">
        by: Erik Oliveira ⓒ - 🇧🇷 - {new Date().getFullYear()}
      </Typography.Small>
    </Box>
  );
};
