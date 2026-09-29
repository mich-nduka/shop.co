import Link from "next/link"
import { Category } from "~/types"

interface CategoriesNavProps {
	categories: Category[]
	currentCategory?: string
}

export default function CategoriesNav({
	categories = [],
	currentCategory = ""
}: CategoriesNavProps) {
	return (
		<div className="w-full font-[family-name:var(--font-satoshi)]">
			<h2 className="text-lg font-bold text-black mb-4">Categories</h2>
			<div className="flex flex-col">
				{categories.map((category) => {
					const isActive = currentCategory.toLowerCase() === category.slug.toLowerCase()
					return (
						<div
							key={category.slug}
							className="py-2.5 border-b border-neutral-100 flex items-center justify-between"
						>
							<Link
								href={`/shop/${category.slug.toLowerCase()}`}
								prefetch={false}
								className={`text-sm transition-colors capitalize ${
									isActive
										? "text-black font-bold"
										: "text-neutral-500 hover:text-black"
								}`}
							>
								{category.name}
							</Link>
						</div>
					)
				})}
			</div>
		</div>
	)
}
