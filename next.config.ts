import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.dummyjson.com",
				port: "",
				pathname: "/**"
			},
			{
				protocol: "https",
				hostname: "dummyjson.com",
				port: "",
				pathname: "/**"
			}
		]
	}
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
