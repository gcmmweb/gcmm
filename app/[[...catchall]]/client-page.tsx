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
}: {
  pathname: string;
  pageData: ComponentRenderData;
  query: Record<string, string>;
}) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={pageData}>
      <PageParamsProvider route={pathname} query={query}>
        <PlasmicComponent component={pathname} />
      </PageParamsProvider>
    </PlasmicRootProvider>
  );
}
