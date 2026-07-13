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
  metadataBase: new URL("https://www.gcmm.ca"),
  title: "Great Commission Media Ministries",
  description: "Great Commission Media Ministries shares the Gospel through media, citywide campaigns, outreach in least-reached regions, and humanitarian aid worldwide.",
  verification: {
    google: "RIFHKA4jS-8wbQ-SNUbzI0Ise_rD2ui6MkC9nEy_3Xw",
  },
  openGraph: {
    title: "Great Commission Media Ministries",
    description: "Great Commission Media Ministries shares the Gospel through media, citywide campaigns, outreach in least-reached regions, and humanitarian aid worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    url: "https://www.gcmm.ca",
    siteName: "Great Commission Media Ministries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Commission Media Ministries",
    description: "Great Commission Media Ministries shares the Gospel through media, citywide campaigns, outreach in least-reached regions, and humanitarian aid worldwide.",
    images: ["/og-image.png"],
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
            gtag('config', 'AW-18314681869');
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