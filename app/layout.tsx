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
const isProduction = process.env.VERCEL_ENV === "production";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* TEMP DIAGNOSTIC (Sep 2026) — remove once the Stripe sitewide-load
            source is confirmed. Must be the very first element in <head> so
            it runs before any other script, including Next's own deferred
            scripts and hydration. Patches document.createElement so that the
            instant anything sets a <script src> containing "stripe", we log
            the full call stack to the browser console with a STRIPE_DIAG
            prefix — that stack trace tells us exactly which module/function
            triggered it, cutting through the minified bundle. */}
        <script
          id="stripe-diag-temp"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var origCreate = document.createElement.bind(document);
    document.createElement = function(tag) {
      var el = origCreate(tag);
      if (String(tag).toLowerCase() === 'script') {
        try {
          Object.defineProperty(el, 'src', {
            configurable: true,
            get: function(){ return el.getAttribute('src'); },
            set: function(v) {
              if (String(v).indexOf('stripe') > -1) {
                console.error('STRIPE_DIAG src=' + v);
                console.error('STRIPE_DIAG stack=' + (new Error()).stack);
              }
              el.setAttribute('src', v);
            }
          });
        } catch(e) {}
      }
      return el;
    };
  } catch(e) {
    console.error('STRIPE_DIAG setup failed', e);
  }
})();
`,
          }}
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
          </>
        )}
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
