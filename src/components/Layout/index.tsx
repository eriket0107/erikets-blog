import { ReactNode } from "react";
import { Box } from "@/components/Box";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      as="main"
      display="flex"
      direction="col"
      align="center"
      className="text-primary dark:text-primary-foreground scroll max-h-full flex-1"
    >
      {children}
    </Box>
  );
};
