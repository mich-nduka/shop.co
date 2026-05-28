import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	compiler: {
		styledComponents: true
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.dummyjson.com",
				port: "",
				pathname: "/products/images/**"
			}
		]
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true
	}
}

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
