import { ReactNode } from "react";
import { Box } from "@/components/Box";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      as="main"
      role="main"
      display="flex"
      direction="col"
      align="center"
      className="text-primary dark:text-primary-foreground screen-layout relative h-screen overflow-y-scroll"
    >
      {children}
    </Box>
  );
};
