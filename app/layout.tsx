import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Navbar, Footer } from "~/components/layout"
import { CartProvider } from "~/context/cart-context"
import { getProducts } from "~/lib/api"

export const metadata: Metadata = {
	title: "Shop.Co",
	description: "Happy shopping"
}

const integralCF = localFont({
	src: "../public/fonts/Integral CF/Fontspring-DEMO-integralcf-regular.woff2",
	display: "swap",
	variable: "--font-integral-cf"
})

const satoshi = localFont({
	src: [
		{
			path: "../public/fonts/Satoshi/Satoshi-Variable.woff2",
			weight: "400",
			style: "normal"
		},
		{
			path: "../public/fonts/Satoshi/Satoshi-Variable.woff2",
			weight: "400",
			style: "italic"
		},
		{
			path: "../public/fonts/Satoshi/Satoshi-Variable.woff2",
			weight: "700",
			style: "normal"
		},
		{
			path: "../public/fonts/Satoshi/Satoshi-Variable.woff2",
			weight: "700",
			style: "italic"
		}
	],
	display: "swap",
	variable: "--font-satoshi"
})

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const productsData = await getProducts({ limit: 100 })

	return (
		<html
			lang="en"
			className={`${integralCF.variable} ${satoshi.variable}`}
		>
			<body className="font-sans antialiased text-black bg-white min-h-screen flex flex-col">
				<CartProvider>
					<Navbar allProducts={productsData.products} />
					<main className="flex-1">{children}</main>
					<Footer />
				</CartProvider>
			</body>
		</html>
	)
}
