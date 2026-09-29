import Link from "next/link"
import Image from "next/image"

export default function Hero() {
	return (
		<section className="bg-[#f2f0f1] overflow-hidden">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 pt-8 md:pt-16 pb-0 flex flex-col md:flex-row items-center justify-between gap-8">
				{/* Text Content */}
				<div className="flex-1 max-w-[600px] z-10">
					<h1 className="font-[family-name:var(--font-integral)] text-3xl sm:text-5xl lg:text-6xl font-black text-black leading-tight tracking-tight uppercase">
						FIND CLOTHES THAT MATCHES YOUR STYLE
					</h1>
					<p className="font-[family-name:var(--font-satoshi)] text-neutral-600 text-sm sm:text-base my-6 leading-relaxed">
						Browse through our diverse range of meticulously crafted garments,
						designed to bring out your individuality and cater to your sense of
						style.
					</p>
					<Link
						href="/shop"
						className="inline-block w-full sm:w-auto text-center bg-black text-white py-3.5 px-12 rounded-full font-medium text-base hover:bg-neutral-800 transition-colors shadow-sm"
					>
						Shop Now
					</Link>

					{/* Stats */}
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mt-10 pt-6 border-t border-neutral-200 sm:border-none font-[family-name:var(--font-satoshi)]">
						<div className="sm:border-r border-neutral-300 sm:pr-6">
							<div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-[family-name:var(--font-satoshi)]">
								200+
							</div>
							<div className="text-xs sm:text-sm text-neutral-500 mt-1">
								International Brands
							</div>
						</div>
						<div className="sm:border-r border-neutral-300 sm:pr-6">
							<div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-[family-name:var(--font-satoshi)]">
								2,000+
							</div>
							<div className="text-xs sm:text-sm text-neutral-500 mt-1">
								High-Quality Products
							</div>
						</div>
						<div className="col-span-2 sm:col-span-1 text-center sm:text-left">
							<div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-[family-name:var(--font-satoshi)]">
								30,000+
							</div>
							<div className="text-xs sm:text-sm text-neutral-500 mt-1">
								Happy Customers
							</div>
						</div>
					</div>
				</div>

				{/* Image Content with decorative stars */}
				<div className="flex-1 relative w-full flex justify-center items-end self-end">
					<Image
						src="/hero-img-2.webp"
						alt="Fashion models showcasing clothes"
						width={550}
						height={489}
						priority
						sizes="(max-width: 768px) 100vw, 550px"
						className="w-full max-w-[550px] h-auto object-contain relative z-10"
					/>
					<Image
						src="/lg-star.png"
						alt=""
						aria-hidden="true"
						width={96}
						height={96}
						className="absolute top-6 right-6 sm:right-12 w-16 sm:w-24 h-16 sm:h-24 z-20 pointer-events-none"
					/>
					<Image
						src="/sm-star.png"
						alt=""
						aria-hidden="true"
						width={56}
						height={56}
						className="absolute top-1/3 left-4 sm:left-8 w-10 sm:w-14 h-10 sm:h-14 z-20 pointer-events-none"
					/>
				</div>
			</div>
		</section>
	)
}
