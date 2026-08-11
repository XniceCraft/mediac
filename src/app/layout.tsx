import "./globals.css";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Script from "next/script";

import type { Metadata } from "next";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const APP_URL = "https://mediac.xnicecraft.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "MediaC — Fast & Secure Media Converter",
    template: "%s — MediaC",
  },
  description:
    "Convert images, documents, and media files instantly in your browser. 100% client-side — no uploads, no server, full privacy.",
  keywords: [
    "media converter",
    "image converter",
    "document converter",
    "JPG to PNG",
    "WebP converter",
    "PDF converter",
    "HEIC converter",
    "browser converter",
    "client-side converter",
    "free file converter",
  ],
  authors: [{ name: "XniceCraft" }],
  creator: "XniceCraft",
  publisher: "XniceCraft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "index": true,
      "follow": true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "MediaC",
    title: "MediaC — Fast & Secure Media Converter",
    description:
      "Convert images, documents, and media files instantly in your browser. 100% client-side — no uploads, no server, full privacy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediaC — Fast & Secure Media Converter",
    description:
      "Convert images, documents, and media files instantly in your browser. 100% client-side — no uploads, no server, full privacy.",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        plusJakartaSans.variable,
        jetbrainsMono.variable,
        "font-sans"
      )}
    >
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-scan/dist/auto.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        suppressHydrationWarning
        className="bg-background text-foreground flex min-h-full flex-col"
      >
        {children}
      </body>
    </html>
  );
}
