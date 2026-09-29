"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, X, CircleUserRound } from "lucide-react"

export default function NavigationMenu() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-neutral-100">
			<div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-1 text-black"
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
					<Link
						href="/"
						className="font-[family-name:var(--font-integral)] text-2xl font-black tracking-tight text-black"
					>
						SHOP.CO
					</Link>
				</div>

				<div className="hidden md:flex items-center gap-6 font-[family-name:var(--font-satoshi)] font-medium text-sm">
					<Link href="/shop" className="text-black hover:text-neutral-600">Shop</Link>
					<Link href="/shop" className="text-black hover:text-neutral-600">On Sale</Link>
					<Link href="/shop" className="text-black hover:text-neutral-600">New Arrivals</Link>
					<Link href="/brands" className="text-black hover:text-neutral-600">Brands</Link>
				</div>

				<div className="flex items-center gap-4">
					<Link href="/cart" className="p-1 text-black hover:text-neutral-600" aria-label="Cart">
						<ShoppingCart size={22} />
					</Link>
					<Link href="/login" className="p-1 text-black hover:text-neutral-600" aria-label="Account">
						<CircleUserRound size={22} />
					</Link>
				</div>
			</div>
		</nav>
	)
}
