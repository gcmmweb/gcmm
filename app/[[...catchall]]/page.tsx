import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PLASMIC_SERVER } from "@/src/plasmic-init-server";
import PlasmicClientPage from "./client-page";

type Props = {
  params: Promise<{ catchall?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getPathname(catchall?: string[]) {
  return "/" + (catchall ? catchall.join("/") : "");
}

// Runs on the SERVER, before the page is ever sent to a browser or crawler
// (Google, Facebook, WhatsApp, iMessage, etc). Plasmic's fetched page data
// already includes each page's Title/Description/OG Image (set in Plasmic
// Studio's Page Settings) inside a "pageMetadata" field — we just read it
// directly and hand it to Next.js, rather than relying on Plasmic's
// unstable__generateMetadata helper, which doesn't exist in this version
// of the library.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const pathname = getPathname(resolvedParams?.catchall);

  const pageData = await PLASMIC_SERVER.maybeFetchComponentData(pathname);
  const meta = pageData?.entryCompMetas?.[0]?.pageMetadata;

  if (!meta) {
    return {};
  }

  return {
    title: meta.title || undefined,
    description: meta.description || undefined,
    alternates: meta.canonical ? { canonical: meta.canonical } : undefined,
    openGraph: {
      title: meta.title || undefined,
      description: meta.description || undefined,
      images: meta.openGraphImageUrl ? [{ url: meta.openGraphImageUrl }] : undefined,
    },
  };
}

export default async function CatchallPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const pathname = getPathname(resolvedParams?.catchall);

  const pageData = await PLASMIC_SERVER.maybeFetchComponentData(pathname);

  if (!pageData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4 text-balance">
                404 - Page Not Found
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                We couldn&apos;t find the page you&apos;re looking for. It
                might have been moved, deleted, or you might have
                accidentally entered the wrong URL.
              </p>
            </div>
            <div className="space-y-4">
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/">Go to Homepage</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const query = Object.fromEntries(
    Object.entries(resolvedSearchParams ?? {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] ?? "" : value ?? "",
    ])
  );

  return (
    <PlasmicClientPage pathname={pathname} pageData={pageData} query={query} />
  );
}
