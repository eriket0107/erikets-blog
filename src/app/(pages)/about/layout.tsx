import { Layout } from "@/components/Layout";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "About",
    template: "%s | Coffe and Vanilla Code",
  },
  description: "Coffe and Vanilla Code",
  icons: {
    icon: "/favicon.ico",
  },
};

const AboutLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>layout{children}</Layout>;
};

export default AboutLayout;
