import Link from "next/link"
import { ProductCard } from "~/components/product"
import Slider from "./review-slides"
import { Product } from "~/types"

interface MainSectionProps {
	products?: Product[]
	fallbackData?: { products?: Product[] }
}

export default function MainSection({ products = [], fallbackData }: MainSectionProps) {
	const displayProducts = products.length > 0 ? products : fallbackData?.products ?? []

	// Split or duplicate for demo new arrivals and top selling
	const newArrivals = displayProducts.slice(0, 4)
	const topSelling = displayProducts.length > 4 ? displayProducts.slice(4, 8) : displayProducts.slice(0, 4)

	return (
		<div className="py-12 bg-white font-[family-name:var(--font-satoshi)]">
			{/* NEW ARRIVALS */}
			<section className="max-w-[1400px] mx-auto px-4">
				<h2 className="font-[family-name:var(--font-integral)] text-2xl sm:text-4xl md:text-5xl font-black text-center text-black tracking-tight uppercase mb-8">
					NEW ARRIVALS
				</h2>
				<div className="flex overflow-x-auto pb-4 gap-5 justify-start md:justify-center scrollbar-thin">
					{newArrivals.map((product: Product) => (
						<ProductCard key={`new-${product.id}`} product={product} />
					))}
				</div>
				<div className="flex justify-center my-8">
					<Link
						href="/shop"
						className="w-full sm:w-[220px] text-center py-3 px-8 rounded-full border border-neutral-300 text-black font-medium text-sm hover:bg-neutral-50 transition-colors"
					>
						View All
					</Link>
				</div>
			</section>

			<hr className="max-w-[1240px] mx-auto my-12 border-neutral-200" />

			{/* TOP SELLING */}
			<section className="max-w-[1400px] mx-auto px-4">
				<h2 className="font-[family-name:var(--font-integral)] text-2xl sm:text-4xl md:text-5xl font-black text-center text-black tracking-tight uppercase mb-8">
					TOP SELLING
				</h2>
				<div className="flex overflow-x-auto pb-4 gap-5 justify-start md:justify-center scrollbar-thin">
					{topSelling.map((product: Product) => (
						<ProductCard key={`top-${product.id}`} product={product} />
					))}
				</div>
				<div className="flex justify-center my-8">
					<Link
						href="/shop"
						className="w-full sm:w-[220px] text-center py-3 px-8 rounded-full border border-neutral-300 text-black font-medium text-sm hover:bg-neutral-50 transition-colors"
					>
						View All
					</Link>
				</div>
			</section>

			{/* Testimonial slider */}
			<Slider products={displayProducts} />
		</div>
	)
}
