import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Great Commission Media Ministries",
  description: "Great Commission Media Ministries (GCMM) shares the Gospel through radio, TV, digital media, and Mega City Media Campaigns in restricted and unreached regions worldwide.",
  verification: {
    google: "RIFHKA4jS-8wbQ-SNUbzI0Ise_rD2ui6MkC9nEy_3Xw",
  },
  openGraph: {
    title: "Great Commission Media Ministries",
    description: "Great Commission Media Ministries (GCMM) shares the Gospel through radio, TV, digital media, and Mega City Media Campaigns in restricted and unreached regions worldwide.",
    images: ["/logo.png"],
    url: "https://gcmm.ca",
    siteName: "Great Commission Media Ministries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Commission Media Ministries",
    description: "Great Commission Media Ministries (GCMM) shares the Gospel through radio, TV, digital media, and Mega City Media Campaigns in restricted and unreached regions worldwide.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0HKC43KHEE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0HKC43KHEE');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}