import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
const isProduction = process.env.VERCEL_ENV === "production";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "Great Commission Media Ministries",
              alternateName: "GCMM",
              url: "https://www.gcmm.ca",
              logo: "https://site-assets.plasmic.app/31c9245dad532df9157360bf8ce8142a.png",
              description:
                "Great Commission Media Ministries shares the Gospel through media, citywide campaigns, outreach in least-reached regions, and humanitarian aid worldwide.",
              email: "info@gcmm.ca",
              telephone: "+1-877-674-5630",
              address: {
                "@type": "PostalAddress",
                postOfficeBoxNumber: "14006",
                addressLocality: "Abbotsford",
                addressRegion: "BC",
                postalCode: "V2T 0B4",
                addressCountry: "CA",
              },
              sameAs: [
                "https://www.facebook.com/greatcommissionmediaministries/",
                "https://www.instagram.com/greatcommissionmediaministries/",
                "https://www.youtube.com/@GreatCommissionMediaMinistries/",
                "https://ca.linkedin.com/company/great-commission-media-ministries",
              ],
            }),
          }}
        />
        {isProduction && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-0HKC43KHEE"
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-0HKC43KHEE');
                gtag('config', 'AW-18314681869');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
