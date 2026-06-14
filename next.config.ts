import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 = défaut Next ; 90 = hero plein écran (haute qualité voulue)
    qualities: [75, 90],
  },
};

export default nextConfig;
