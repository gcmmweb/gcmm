import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PLASMIC } from "@/src/plasmic-init";
import PlasmicClientPage from "./client-page";

type Props = {
  params: Promise<{ catchall?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getPathname(catchall?: string[]) {
  return "/" + (catchall ? catchall.join("/") : "");
}

// This runs on the SERVER, before the page is ever sent to a browser or
// a crawler (Google, Facebook, WhatsApp, iMessage, etc). It fetches this
// specific page's Title/Description/OG Image from Plasmic and turns them
// into real Next.js metadata.
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const pathname = getPathname(resolvedParams?.catchall);

  const pageData = await PLASMIC.maybeFetchComponentData(pathname);
  if (!pageData) {
    return {};
  }

  return PLASMIC.unstable__generateMetadata(pageData, {
    params: resolvedParams,
    query: resolvedSearchParams,
  });
}

export default async function CatchallPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const pathname = getPathname(resolvedParams?.catchall);

  const pageData = await PLASMIC.maybeFetchComponentData(pathname);

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
