import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { ThemeScript } from "@/scripts/ThemeScript";
import { Layout } from "@/components/Layout";
import { BottomShadow } from "@/components/BottomShadow";

import NextTopLoader from "nextjs-toploader";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cookies } from "next/headers";
import { themeKeyCookie } from "@/constants/cookies";
import { cn } from "@/utils";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s | Coffe & Vanilla Code",
  },
  description: "Coffe and Vanilla Code",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const theme =
    ((await cookies()).get(themeKeyCookie)?.value as
      | "light"
      | "dark"
      | undefined) || "dark";

  return (
    <html lang={locale} data-theme={theme} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={cn(
          `${roboto.className} overflow-x-hiden relative flex h-screen w-full flex-col overflow-y-scroll antialiased`,
        )}
      >
        <NextTopLoader
          color="#3b82f6"
          height={3}
          crawl={true}
          crawlSpeed={200}
          initialPosition={0.08}
          easing="ease"
          speed={200}
          zIndex={1000}
          showAtBottom={false}
        />
        <ThemeScript />
        <NextIntlClientProvider>
          <Layout>
            <Header />
            {children}
            <BottomShadow />
            <Footer />
          </Layout>
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
