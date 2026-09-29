"use client"

import { useState } from "react"

interface ProductImagesProps {
	images?: string[]
}

export default function ProductImages({ images = [] }: ProductImagesProps) {
	const [activeImage, setActiveImage] = useState(0)
	const displayImages = images.length > 0 ? images : ["/placeholder.svg"]

	return (
		<div className="flex flex-col-reverse md:grid md:grid-cols-[110px_1fr] gap-4 w-full">
			{/* Thumbnails */}
			<div className="flex md:flex-col items-center justify-start gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-thin">
				{displayImages.map((image, index) => (
					<button
						key={index}
						onClick={() => setActiveImage(index)}
						onMouseEnter={() => setActiveImage(index)}
						className={`shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#f0eeed] ${
							activeImage === index
								? "border-black shadow-sm"
								: "border-transparent hover:border-neutral-300"
						}`}
						aria-label={`Select product image ${index + 1}`}
					>
						<img
							src={image}
							alt={`Product thumbnail ${index + 1}`}
							className="w-full h-full object-cover"
							loading="lazy"
						/>
					</button>
				))}
			</div>

			{/* Main Image */}
			<div className="w-full aspect-square bg-[#f0eeed] rounded-2xl overflow-hidden relative flex items-center justify-center">
				<img
					src={displayImages[activeImage] || displayImages[0]}
					alt="Product image"
					className="w-full h-full object-cover transition-opacity duration-200"
				/>
			</div>
		</div>
	)
}
