"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Category } from "~/types"
import CategoriesNav from "./categories"

export function MobileNav({
	currentCategory = "",
	categories = []
}: {
	currentCategory?: string
	categories?: Category[]
}) {
	const router = useRouter()

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		const url = value ? `/shop/${value.toLowerCase()}` : `/shop`
		router.push(url)
	}

	return (
		<div className="mb-4 block lg:hidden font-[family-name:var(--font-satoshi)]">
			<select
				value={currentCategory.toLowerCase()}
				onChange={handleCategoryChange}
				className="w-full p-3 border border-neutral-200 rounded-xl text-base bg-white text-black outline-none focus:border-black transition-colors"
			>
				<option value="">All Categories</option>
				{categories.map((category: Category) => (
					<option
						key={category.slug}
						value={category.slug.toLowerCase()}
					>
						{category.name}
					</option>
				))}
			</select>
		</div>
	)
}

export function DesktopNav({
	currentCategory = "",
	categories = []
}: {
	currentCategory?: string
	categories?: Category[]
}) {
	return (
		<aside className="hidden lg:block w-[240px] shrink-0 border border-neutral-200 rounded-2xl p-5 bg-white h-fit">
			<CategoriesNav
				categories={categories}
				currentCategory={currentCategory}
			/>
		</aside>
	)
}
