import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    twitter: {
      card: "summary_large_image",
      title: meta.title || undefined,
      description: meta.description || undefined,
      images: meta.openGraphImageUrl ? [meta.openGraphImageUrl] : undefined,
    },
  };
}

export default async function CatchallPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const pathname = getPathname(resolvedParams?.catchall);

  const pageData = await PLASMIC_SERVER.maybeFetchComponentData(pathname);

  if (!pageData) {
    notFound();
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