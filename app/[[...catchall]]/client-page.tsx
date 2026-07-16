"use client";

import {
  PlasmicComponent,
  PlasmicRootProvider,
  PageParamsProvider,
  type ComponentRenderData,
} from "@plasmicapp/loader-react";
import { PLASMIC } from "@/src/plasmic-init";

export default function PlasmicClientPage({
  pathname,
  pageData,
  query,
  params,
}: {
  pathname: string;
  pageData: ComponentRenderData;
  query: Record<string, string>;
  // URL path parameters (e.g. { slug: "canada-day-26" } for
  // /test-only-article/[slug] pages), matched by the Plasmic loader.
  params?: Record<string, string>;
}) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={pageData}>
      <PageParamsProvider route={pathname} params={params} query={query}>
        <PlasmicComponent component={pathname} />
      </PageParamsProvider>
    </PlasmicRootProvider>
  );
}
