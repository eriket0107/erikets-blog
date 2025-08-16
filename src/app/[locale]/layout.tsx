import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { ThemeScript } from "@/scripts/ThemeScript";
import { Layout } from "@/components/Layout";
import NextTopLoader from "nextjs-toploader";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
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
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${roboto.className} overflow-hiden relative flex h-screen w-full flex-col antialiased`}
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
          <Header />

          <Layout>{children}</Layout>
          <Footer />
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
