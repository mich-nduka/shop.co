"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Breadcrumb } from "~/components/ui"
import { Brand } from "~/types"

const FEATURED_BRANDS = [
	{
		name: "Versace",
		logo: "/versace.png",
		description: "Italian luxury fashion company known for bold prints and bright colors."
	},
	{
		name: "Zara",
		logo: "/zara.png",
		description: "Spanish fast fashion retailer offering trendy clothing for men and women."
	},
	{
		name: "Gucci",
		logo: "/gucci.png",
		description: "Italian high-end luxury fashion and leather goods brand."
	},
	{
		name: "Prada",
		logo: "/prada.png",
		description: "Italian luxury fashion house specializing in leather handbags and travel accessories."
	},
	{
		name: "Calvin Klein",
		logo: "/calvin-klein.png",
		description: "American fashion house known for minimalist designs and iconic underwear."
	}
]

interface BrandsPageProps {
	brands?: Brand[]
	allProducts?: any
}

export default function BrandsPage({ brands = [] }: BrandsPageProps) {
	const [searchQuery, setSearchQuery] = useState("")

	const filteredBrands = useMemo(() => {
		if (!searchQuery.trim()) return brands
		return brands.filter((brand) =>
			brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}, [brands, searchQuery])

	return (
		<div className="max-w-[1400px] mx-auto px-4 py-8 font-[family-name:var(--font-satoshi)]">
			<Breadcrumb />

			<h1 className="font-[family-name:var(--font-integral)] text-3xl sm:text-4xl md:text-5xl font-black text-center text-black uppercase tracking-tight mb-3">
				OUR BRANDS
			</h1>
			<p className="text-neutral-500 text-center max-w-[600px] mx-auto mb-10 text-sm sm:text-base">
				Discover top international brands and exclusive designers in our curated catalog.
			</p>

			{/* Search box */}
			<div className="max-w-[550px] mx-auto mb-12 relative">
				<Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
				<input
					type="text"
					placeholder="Search brands..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full py-3.5 pl-12 pr-4 bg-neutral-100 rounded-full text-sm outline-none focus:bg-neutral-200 transition-colors border border-transparent focus:border-neutral-300"
				/>
			</div>

			{/* Featured Brands */}
			{!searchQuery && (
				<section className="mb-14">
					<h2 className="font-[family-name:var(--font-integral)] text-xl sm:text-2xl font-black text-black uppercase tracking-tight mb-6">
						FEATURED BRANDS
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{FEATURED_BRANDS.map((brand) => (
							<div
								key={brand.name}
								className="border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
							>
								<div className="h-44 bg-[#000] flex items-center justify-center p-6">
									<img
										src={brand.logo}
										alt={brand.name}
										className="max-w-[160px] max-h-[50px] object-contain invert"
									/>
								</div>
								<div className="p-5 flex-1 flex flex-col justify-between">
									<div>
										<h3 className="font-bold text-lg text-black mb-1">{brand.name}</h3>
										<p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
											{brand.description}
										</p>
									</div>
									<Link
										href="/shop"
										className="mt-4 text-xs font-semibold text-black uppercase tracking-wider underline hover:text-neutral-600"
									>
										Explore Products &rarr;
									</Link>
								</div>
							</div>
						))}
					</div>
				</section>
			)}

			{/* All Brands Grid */}
			<section className="mb-14">
				<h2 className="font-[family-name:var(--font-integral)] text-xl sm:text-2xl font-black text-black uppercase tracking-tight mb-6">
					{searchQuery ? `SEARCH RESULTS (${filteredBrands.length})` : "ALL BRANDS"}
				</h2>

				{filteredBrands.length === 0 ? (
					<div className="text-center py-12 text-neutral-500">
						No brands found matching "{searchQuery}".
					</div>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{filteredBrands.map((brand) => (
							<div
								key={brand.id}
								className="border border-neutral-200 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-white hover:border-black transition-colors group"
							>
								<div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-3 overflow-hidden">
									<img
										src={brand.thumbnail}
										alt={brand.brand}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
									/>
								</div>
								<span className="font-semibold text-sm text-black group-hover:underline">
									{brand.brand}
								</span>
							</div>
						))}
					</div>
				)}
			</section>
		</div>
	)
}
