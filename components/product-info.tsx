"use client"

import { useState } from "react"
import { Star, Minus, Plus, ShoppingCart, Check } from "lucide-react"
import type { Product } from "~/types"
import { useCart } from "~/context/cart-context"

interface ProductInfoProps {
	product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
	const [quantity, setQuantity] = useState(1)
	const [selectedColor, setSelectedColor] = useState(0)
	const [selectedSize, setSelectedSize] = useState("Large")
	const [addedNotification, setAddedNotification] = useState(false)

	const { addToCart } = useCart()

	const colors = ["#4F4631", "#314F4A", "#31344F"]
	const sizes = ["Small", "Medium", "Large", "X-Large"]

	const discountedPrice = product.discountPercentage > 0
		? Math.round(product.price * (1 - product.discountPercentage / 100))
		: null

	const handleAddToCart = () => {
		addToCart({
			id: product.id,
			title: product.title,
			discount: product.discountPercentage,
			price: product.price,
			quantity,
			image: product.images?.[0] || product.thumbnail || "/placeholder.svg"
		})

		setAddedNotification(true)
		setTimeout(() => setAddedNotification(false), 2500)
	}

	return (
		<div className="flex flex-col gap-5 font-[family-name:var(--font-satoshi)]">
			{/* Product Title */}
			<h1 className="font-[family-name:var(--font-integral)] text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight uppercase">
				{product.title}
			</h1>

			{/* Rating */}
			<div className="flex items-center gap-3">
				<div className="flex text-[#ffb800]">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							size={18}
							className={
								i < Math.floor(product.rating)
									? "text-[#ffb800] fill-[#ffb800]"
									: "text-neutral-300"
							}
						/>
					))}
				</div>
				<span className="text-sm text-neutral-600 font-medium">
					{product.rating}/5{" "}
					<span className="text-neutral-400">
						({product.reviews?.length || 0} reviews)
					</span>
				</span>
			</div>

			{/* Price */}
			<div className="flex items-center gap-3">
				<span className="text-2xl sm:text-3xl font-bold text-black">
					${product.price}
				</span>
				{discountedPrice && (
					<>
						<span className="text-xl sm:text-2xl font-bold text-neutral-400 line-through">
							${Math.round(product.price * 1.25)}
						</span>
						<span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-xs sm:text-sm">
							-{Math.round(product.discountPercentage)}%
						</span>
					</>
				)}
			</div>

			{/* Description */}
			<p className="text-neutral-600 text-sm sm:text-base leading-relaxed border-b border-neutral-200 pb-5">
				{product.description}
			</p>

			{/* Select Colors */}
			<div className="flex flex-col gap-2.5 border-b border-neutral-200 pb-5">
				<span className="text-sm text-neutral-600 font-medium">Select Colors</span>
				<div className="flex items-center gap-3">
					{colors.map((color, index) => (
						<button
							key={index}
							onClick={() => setSelectedColor(index)}
							style={{ backgroundColor: color }}
							className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
								selectedColor === index ? "ring-2 ring-black ring-offset-2" : ""
							}`}
							aria-label={`Color option ${index + 1}`}
						>
							{selectedColor === index && <Check size={16} className="text-white" />}
						</button>
					))}
				</div>
			</div>

			{/* Choose Size */}
			<div className="flex flex-col gap-2.5 border-b border-neutral-200 pb-5">
				<span className="text-sm text-neutral-600 font-medium">Choose Size</span>
				<div className="flex flex-wrap gap-2.5">
					{sizes.map((size) => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
								selectedSize === size
									? "bg-black text-white"
									: "bg-[#f0f0f0] text-neutral-600 hover:bg-[#e8e8e8]"
							}`}
						>
							{size}
						</button>
					))}
				</div>
			</div>

			{/* Quantity and Add to Cart */}
			<div className="flex items-center gap-4 pt-2">
				{/* Quantity pill */}
				<div className="flex items-center bg-[#f0f0f0] rounded-full px-3 py-2 gap-3">
					<button
						onClick={() => setQuantity((q) => Math.max(1, q - 1))}
						className="p-1 text-black hover:opacity-70 transition-opacity"
						aria-label="Decrease quantity"
					>
						<Minus size={18} />
					</button>
					<span className="font-semibold text-base min-w-[24px] text-center">
						{quantity}
					</span>
					<button
						onClick={() => setQuantity((q) => q + 1)}
						className="p-1 text-black hover:opacity-70 transition-opacity"
						aria-label="Increase quantity"
					>
						<Plus size={18} />
					</button>
				</div>

				{/* Add to cart */}
				<button
					onClick={handleAddToCart}
					className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-full font-semibold text-sm sm:text-base hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
				>
					<ShoppingCart size={20} />
					Add to Cart
				</button>
			</div>

			{/* Added notification toast */}
			{addedNotification && (
				<div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in duration-200">
					<Check size={16} /> Added {quantity} item(s) to your cart!
				</div>
			)}
		</div>
	)
}
