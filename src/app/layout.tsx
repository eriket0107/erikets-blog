import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Box } from "@/components/Box";

const robotoMono = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s | Coffe and Vanilla Code",
  },
  description: "Coffe and Vanilla Code",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={robotoMono.className}>
        <Box
          display="flex"
          direction="col"
          justify="center"
          align="center"
          className="bg-accent dark:bg-accent-foreground text-primary dark:text-primary-foreground min-h-screen w-full"
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
