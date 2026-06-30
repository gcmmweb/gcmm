// plasmic-init-server.ts
// This is a SEPARATE, server-only PLASMIC instance used only for generating
// per-page metadata (title, description, OG image) in app/[[...catchall]]/page.tsx.
// It must stay separate from src/plasmic-init.ts, which powers the browser-side
// rendering and the Plasmic Studio visual editor (pages/plasmic-host.tsx).
import { initPlasmicLoader } from '@plasmicapp/loader-nextjs/react-server';

export const PLASMIC_SERVER = initPlasmicLoader({
  projects: [
    {
      id: "mYwsAuwZ4JBX1m8yGytoC",
      token: "phqSpmOnAFMf1a3iYfHkE76TvXpddwPn2uToiUcfXOOzLJNCkpkQ91nDpRe8Yh7xxz5VsNn0PHb7FtRcykQ",
    },
  ],
  preview: process.env.NODE_ENV !== 'production',
});
