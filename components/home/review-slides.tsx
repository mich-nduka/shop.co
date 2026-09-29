"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { CheckCircle, ArrowLeft, ArrowRight, Star } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import { Product } from "~/types"

interface TestimonialCarouselProps {
	products: Product[]
}

export default function TestimonialCarousel({ products = [] }: TestimonialCarouselProps) {
	// Gather all reviews from products
	const testimonials = products.flatMap((product) =>
		(product.reviews || []).map((review) => ({
			...review,
			productTitle: product.title
		}))
	)

	if (testimonials.length === 0) return null

	return (
		<div className="max-w-[1400px] mx-auto px-4 py-12 relative font-[family-name:var(--font-satoshi)]">
			<div className="flex items-center justify-between mb-8">
				<h2 className="font-[family-name:var(--font-integral)] text-2xl sm:text-3xl md:text-4xl font-black text-black uppercase tracking-tight">
					OUR HAPPY CUSTOMERS
				</h2>
				<div className="flex items-center gap-2">
					<button
						className="testimonial-prev w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer"
						aria-label="Previous review"
					>
						<ArrowLeft size={18} />
					</button>
					<button
						className="testimonial-next w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer"
						aria-label="Next review"
					>
						<ArrowRight size={18} />
					</button>
				</div>
			</div>

			<Swiper
				modules={[Navigation]}
				spaceBetween={20}
				slidesPerView={1}
				navigation={{
					prevEl: ".testimonial-prev",
					nextEl: ".testimonial-next"
				}}
				breakpoints={{
					640: {
						slidesPerView: 1
					},
					768: {
						slidesPerView: 2
					},
					1024: {
						slidesPerView: 3
					}
				}}
			>
				{testimonials.map((testimonial, index) => (
					<SwiperSlide key={index}>
						<div className="bg-white border border-neutral-200 rounded-[20px] p-6 h-full flex flex-col gap-3 min-h-[200px]">
							<div className="flex text-[#ffb800]">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={16}
										className={
											i < testimonial.rating
												? "text-[#ffb800] fill-[#ffb800]"
												: "text-neutral-300"
										}
									/>
								))}
							</div>

							<div className="flex items-center gap-1.5 font-bold text-base text-black">
								<span>{testimonial.reviewerName}</span>
								<CheckCircle
									size={16}
									className="text-emerald-500 fill-emerald-500 text-white"
								/>
							</div>

							<p className="text-neutral-600 text-sm leading-relaxed flex-grow">
								"{testimonial.comment}"
							</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
