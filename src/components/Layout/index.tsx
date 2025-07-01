import { ReactNode } from "react";
import { Box } from "@/components/Box";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      as="main"
      display="flex"
      direction="col"
      align="center"
      className="text-primary dark:text-primary-foreground screen-layout overflow-y-auto p-10 pt-15"
    >
      {children}
    </Box>
  );
};
