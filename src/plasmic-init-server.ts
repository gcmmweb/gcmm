// plasmic-init-server.ts
// This is a SEPARATE, server-only PLASMIC instance, used only inside
// app/[[...catchall]]/page.tsx (a Server Component). It must stay separate
// from src/plasmic-init.ts, which is built on a "use client" module and
// powers browser-side rendering plus the Plasmic Studio visual editor
// (pages/plasmic-host.tsx). Server Components cannot call functions from
// a "use client" module directly, which is why this file exists.
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
