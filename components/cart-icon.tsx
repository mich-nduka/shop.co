"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "../context/cart-context"

export default function CartIcon() {
	const { itemCount } = useCart()

	return (
		<Link
			href="/cart"
			className="relative flex items-center justify-center text-black no-underline gap-2 font-[family-name:var(--font-satoshi)] hover:text-neutral-600 transition-colors"
			aria-label="View Cart"
		>
			<span className="hidden md:inline font-medium text-sm">Cart</span>
			<ShoppingCart size={24} />
			{itemCount > 0 && (
				<span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
					{itemCount}
				</span>
			)}
		</Link>
	)
}
