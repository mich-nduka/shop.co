"use client"

import { useState, useMemo } from "react"
import { Category, Product } from "~/types"
import ProductCard from "~/components/product-card"
import Breadcrumb from "~/components/breadcrumb"
import { DesktopNav, MobileNav } from "~/components/category-navigation-menu"

interface CategoryPageProps {
	currentPath: string
	categories?: Category[]
	initialProducts?: Product[]
	categoryFallbackData?: any
	productsFallbackData?: any
}

export default function CategoryPage({
	currentPath,
	categories = [],
	initialProducts = [],
	categoryFallbackData,
	productsFallbackData
}: CategoryPageProps) {
	const allCategories = useMemo(() => {
		return categories.length > 0 ? categories : (categoryFallbackData ?? [])
	}, [categories, categoryFallbackData])

	const productsList = useMemo(() => {
		return initialProducts.length > 0 ? initialProducts : (productsFallbackData?.products ?? [])
	}, [initialProducts, productsFallbackData])

	const [sort, setSort] = useState("price-low")
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 9

	const sortedProducts = useMemo(() => {
		const list = [...productsList]
		switch (sort) {
			case "price-low":
				return list.sort((a: Product, b: Product) => a.price - b.price)
			case "price-high":
				return list.sort((a: Product, b: Product) => b.price - a.price)
			case "rating":
				return list.sort((a: Product, b: Product) => b.rating - a.rating)
			case "reviews":
			default:
				return list.sort(
					(a: Product, b: Product) => (b.reviews?.length || 0) - (a.reviews?.length || 0)
				)
		}
	}, [productsList, sort])

	const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage))

	const currentProducts = sortedProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const currentCategoryName =
		allCategories.find((c: Category) => c.slug.toLowerCase() === currentPath.toLowerCase())?.name ||
		currentPath

	return (
		<div className="max-w-[1400px] mx-auto px-4 py-8 font-[family-name:var(--font-satoshi)]">
			<Breadcrumb />

			{/* Mobile category select */}
			<MobileNav
				currentCategory={currentPath}
				categories={allCategories}
			/>

			<div className="flex flex-col lg:flex-row gap-8 items-start">
				{/* Desktop sidebar */}
				<DesktopNav
					currentCategory={currentPath}
					categories={allCategories}
				/>

				{/* Products Section */}
				<main className="flex-1 w-full">
					{/* Header */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-100">
						<h1 className="font-[family-name:var(--font-integral)] text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
							{currentCategoryName}
						</h1>
						<div className="flex items-center gap-2 text-sm text-neutral-500">
							<span>Showing {currentProducts.length} of {sortedProducts.length} Products</span>
							<select
								value={sort}
								onChange={(e) => {
									setSort(e.target.value)
									setCurrentPage(1)
								}}
								className="bg-[#f0f0f0] text-black font-medium py-2 px-3 rounded-full border-none outline-none cursor-pointer text-xs sm:text-sm ml-2"
							>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
								<option value="rating">Rating: High to Low</option>
								<option value="reviews">Most Popular</option>
							</select>
						</div>
					</div>

					{/* Product Grid */}
					{currentProducts.length === 0 ? (
						<div className="text-center py-16 text-neutral-500">
							No products found in this category.
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
							{currentProducts.map((product: Product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
					)}

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-between mt-12 pt-6 border-t border-neutral-200">
							<button
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								disabled={currentPage === 1}
								className="py-2 px-4 rounded-lg border border-neutral-300 font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors cursor-pointer"
							>
								Previous
							</button>

							<div className="flex items-center gap-1.5">
								{[...Array(totalPages)].map((_, i) => (
									<button
										key={i + 1}
										onClick={() => setCurrentPage(i + 1)}
										className={`w-9 h-9 rounded-lg font-medium text-sm transition-colors cursor-pointer ${
											currentPage === i + 1
												? "bg-black text-white"
												: "text-neutral-600 hover:bg-neutral-100"
										}`}
									>
										{i + 1}
									</button>
								))}
							</div>

							<button
								onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
								disabled={currentPage === totalPages}
								className="py-2 px-4 rounded-lg border border-neutral-300 font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors cursor-pointer"
							>
								Next
							</button>
						</div>
					)}
				</main>
			</div>
		</div>
	)
}
