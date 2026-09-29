"use client"

import type { Product } from "~/types"
import ProductCard from "./product-card"
import { useProductsByCategory } from "~/queries"

interface RelatedProductsProps {
	currentCategory: string
	initialProducts?: Product[]
	fallbackCategory?: { products?: Product[] }
}

export default function RelatedProducts({
	currentCategory,
	initialProducts,
	fallbackCategory
}: RelatedProductsProps) {
	const queryResult = useProductsByCategory(
		currentCategory,
		0,
		4,
		fallbackCategory as any
	)

	const products = initialProducts ?? queryResult.products

	if (!products || products.length === 0) return null

	return (
		<div className="flex flex-col mt-16 font-[family-name:var(--font-satoshi)]">
			<h2 className="font-[family-name:var(--font-integral)] text-2xl sm:text-3xl md:text-4xl font-black text-center text-black mb-8 uppercase tracking-tight">
				YOU MIGHT ALSO LIKE
			</h2>
			<div className="flex justify-center flex-wrap gap-4 md:gap-6">
				{products.slice(0, 4).map((product: Product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}
