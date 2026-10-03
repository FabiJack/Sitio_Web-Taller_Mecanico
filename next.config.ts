import type { NextConfig } from 'next';

// Exportación estática: se publica en cualquier hosting (Vercel, Netlify, GitHub Pages).
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default config;
