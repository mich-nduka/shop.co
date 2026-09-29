import Link from "next/link"
import { Category } from "~/types"
import Breadcrumb from "~/components/breadcrumb"

interface ShopPageProps {
	categories: Category[]
	thumbnails?: Record<string, string>
}

export default function ShopPage({
	categories = [],
	thumbnails = {}
}: ShopPageProps) {
	return (
		<div className="max-w-[1400px] mx-auto px-4 py-8 font-[family-name:var(--font-satoshi)]">
			<Breadcrumb />
			<h1 className="font-[family-name:var(--font-integral)] text-3xl sm:text-4xl md:text-5xl font-black text-center text-black uppercase tracking-tight mb-10">
				SHOP BY CATEGORY
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{categories.map((category) => {
					const thumbnail = thumbnails[category.slug] || "/placeholder.svg"
					return (
						<Link
							key={category.slug}
							href={`/shop/${category.slug.toLowerCase()}`}
							className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-neutral-100 hover:shadow-md transition-all"
						>
							<img
								src={thumbnail}
								alt={category.name}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
								<h2 className="text-white text-xl sm:text-2xl font-bold capitalize">
									{category.name}
								</h2>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
