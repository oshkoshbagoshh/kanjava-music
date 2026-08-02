import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required when Vercel builds from repo root but app lives in apps/web
  outputFileTracingRoot: path.join(__dirname, '../..'),
};

export default nextConfig;
