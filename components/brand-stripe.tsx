import React from "react"

export function BrandStripe() {
	return (
		<div className="bg-black flex justify-center items-center flex-wrap py-11 px-4 -mt-[160px] md:-mt-[2px] lg:mt-0 gap-x-[34px] gap-y-[23px] lg:gap-x-[6.625rem] w-full z-10 relative">
			<div className="h-[23px] md:h-[33px]">
				<img
					src="/versace.png"
					alt="Versace"
					className="w-full h-full object-contain"
				/>
			</div>
			<div className="h-[23px] md:h-[33px]">
				<img
					src="/zara.png"
					alt="Zara"
					className="w-full h-full object-contain"
				/>
			</div>
			<div className="h-[23px] md:h-[33px]">
				<img
					src="/gucci.png"
					alt="Gucci"
					className="w-full h-full object-contain"
				/>
			</div>
			<div className="h-[23px] md:h-[33px]">
				<img
					src="/prada.png"
					alt="Prada"
					className="w-full h-full object-contain"
				/>
			</div>
			<div className="h-[23px] md:h-[33px]">
				<img
					src="/calvin-klein.png"
					alt="Calvin Klein"
					className="w-full h-full object-contain"
				/>
			</div>
		</div>
	)
}

export default BrandStripe
