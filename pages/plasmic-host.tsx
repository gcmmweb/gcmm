import * as React from 'react';
import { PlasmicCanvasHost } from '@plasmicapp/loader-nextjs';
import { PLASMIC } from '@/src/plasmic-init';
import '../app/globals.css'; // ✅ Tailwind CSS loaded here

export default function PlasmicHost() {
  return PLASMIC && <PlasmicCanvasHost />;
}