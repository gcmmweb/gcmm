// lib/plasmic.ts
import { initPlasmicLoader } from '@plasmicapp/loader-nextjs';
import MainPage from '../components/MainPage'; // Adjust the path as needed
import '../app/globals.css'; // ✅ Tailwind CSS loaded here

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.PLASMIC_PROJECT_ID || 'mYwsAuwZ4JBX1m8yGytoC',
      token:
        process.env.PLASMIC_PROJECT_API_TOKEN ||
        'phqSpmOnAFMf1a3iYfHkE76TvXpddwPn2uToiUcfXOOzLJNCkpkQ91nDpRe8Yh7xxz5VsNn0PHb7FtRcykQ',
    },
  ],
  preview: process.env.NODE_ENV === 'development',
});

// ✅ Register the MainPage code component
PLASMIC.registerComponent(MainPage, {
  name: 'MainPage',
  props: {
    // You can define props here if your component uses any
  },
});