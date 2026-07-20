import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // The app build gates on application code only. Stories and specs have
    // their own type gates (tsc --noEmit and the vitest projects), so a
    // mid-refactor story cannot block the prototype build.
    tsconfigPath: "tsconfig.build.json",
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
