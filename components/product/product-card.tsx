import Link from "next/link"
import { Star } from "lucide-react"
import type { Product } from "~/types"

interface ProductCardProps {
	product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
	const discountedPrice = product.discountPercentage > 0
		? Math.round(product.price * (1 - product.discountPercentage / 100))
		: null

	return (
		<Link
			href={`/shop/${product.category}/${product.id}`}
			prefetch={false}
			className="group flex flex-col gap-2 font-[family-name:var(--font-satoshi)] w-[200px] sm:w-[240px] md:w-[280px] shrink-0 no-underline text-inherit"
		>
			<div className="w-full aspect-square bg-[#f0eeed] rounded-[20px] overflow-hidden relative flex items-center justify-center">
				<img
					src={product.images?.[0] || product.thumbnail || "/placeholder.svg"}
					alt={product.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					loading="lazy"
				/>
			</div>

			<div className="flex flex-col gap-1 mt-1">
				<h3
					className="font-bold text-sm md:text-base text-black truncate"
					title={product.title}
				>
					{product.title}
				</h3>

				<div className="flex items-center gap-2">
					<div className="flex text-[#ffb800]">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								size={14}
								className={
									i < Math.floor(product.rating)
										? "text-[#ffb800] fill-[#ffb800]"
										: "text-neutral-300"
								}
							/>
						))}
					</div>
					<span className="text-xs text-neutral-500 font-medium">
						{product.rating}/5
					</span>
				</div>

				<div className="flex items-center gap-2 mt-0.5">
					<span className="text-lg md:text-xl font-bold text-black">
						${product.price}
					</span>
					{discountedPrice && (
						<span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold">
							-{Math.round(product.discountPercentage)}%
						</span>
					)}
				</div>
			</div>
		</Link>
	)
}
