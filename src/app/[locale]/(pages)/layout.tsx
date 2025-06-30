import { Layout } from "@/components/Layout";

import { ReactNode } from "react";

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default PagesLayout;
