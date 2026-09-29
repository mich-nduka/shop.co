"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, User, ChevronDown, X, Menu } from "lucide-react"
import SearchModal from "./search-modal"
import CartIcon from "./cart-icon"
import TopBanner from "./top-banner"
import { Product } from "~/types"

export default function Navbar({ allProducts = [] }: { allProducts?: Product[] }) {
	const [showSearch, setShowSearch] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const [searchResults, setSearchResults] = useState<Product[]>([])
	const [showMobileSearch, setShowMobileSearch] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const searchRef = useRef<HTMLDivElement>(null)

	const handleSearch = (query: string) => {
		setSearchQuery(query)
		if (query.trim() === "") {
			setSearchResults([])
			setShowSearch(false)
			return
		}

		const results = allProducts.filter((product: Product) =>
			product.title.toLowerCase().includes(query.toLowerCase()) ||
			product.category?.toLowerCase().includes(query.toLowerCase())
		).slice(0, 8)

		setSearchResults(results)
		setShowSearch(true)
	}

	// Close search results when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setShowSearch(false)
			}
		}

		document.addEventListener("click", handleClickOutside)
		return () => document.removeEventListener("click", handleClickOutside)
	}, [])

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = ""
		}
		return () => {
			document.body.style.overflow = ""
		}
	}, [mobileMenuOpen])

	return (
		<>
			<TopBanner />
			<header className="sticky top-0 bg-white z-40 shadow-sm border-b border-neutral-100">
				<nav className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						{/* Mobile Hamburger */}
						<button
							onClick={() => setMobileMenuOpen(true)}
							className="md:hidden p-1 text-black hover:text-neutral-600 transition-colors"
							aria-label="Open navigation menu"
						>
							<Menu size={24} />
						</button>

						{/* Logo */}
						<Link
							href="/"
							className="font-[family-name:var(--font-integral)] text-2xl md:text-3xl font-black tracking-tight text-black no-underline"
						>
							SHOP.CO
						</Link>
					</div>

					{/* Desktop Navigation Links */}
					<div className="hidden md:flex items-center gap-6 font-[family-name:var(--font-satoshi)] text-base font-medium">
						<Link
							href="/shop"
							className="flex items-center gap-1 text-black hover:text-neutral-600 transition-colors"
						>
							Shop
							<ChevronDown size={16} />
						</Link>
						<Link
							href="/shop"
							className="text-black hover:text-neutral-600 transition-colors"
						>
							On Sale
						</Link>
						<Link
							href="/shop"
							className="text-black hover:text-neutral-600 transition-colors"
						>
							New Arrivals
						</Link>
						<Link
							href="/brands"
							className="text-black hover:text-neutral-600 transition-colors"
						>
							Brands
						</Link>
					</div>

					{/* Search Box - Desktop */}
					<div ref={searchRef} className="hidden md:block flex-1 max-w-[550px] relative mx-4 font-[family-name:var(--font-satoshi)]">
						<div className="relative">
							<Search
								size={18}
								className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
							/>
							<input
								type="text"
								placeholder="Search for products..."
								value={searchQuery}
								onChange={(e) => handleSearch(e.target.value)}
								onFocus={() => {
									if (searchQuery.trim() !== "") setShowSearch(true)
								}}
								className="w-full py-2.5 pl-11 pr-4 bg-[#f0f0f0] rounded-full text-sm outline-none focus:bg-[#e8e8e8] transition-colors"
							/>
						</div>

						{/* Search Results Dropdown */}
						{showSearch && searchResults.length > 0 && (
							<div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white rounded-xl shadow-xl border border-neutral-100 max-h-[380px] overflow-y-auto z-50 p-2 divide-y divide-neutral-100">
								{searchResults.map((product) => (
									<Link
										key={product.id}
										href={`/shop/${product.category}/${product.id}`}
										onClick={() => setShowSearch(false)}
										className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 rounded-lg transition-colors"
									>
										<img
											src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
											alt={product.title}
											className="w-12 h-12 object-cover rounded bg-neutral-100 shrink-0"
										/>
										<div className="flex-1 min-w-0">
											<div className="text-sm font-medium text-black truncate">{product.title}</div>
											<div className="text-xs text-neutral-500">${product.price}</div>
										</div>
									</Link>
								))}
							</div>
						)}
					</div>

					{/* Right Actions */}
					<div className="flex items-center gap-3 md:gap-4">
						{/* Mobile Search Icon */}
						<button
							onClick={() => setShowMobileSearch(true)}
							className="md:hidden p-1 text-black hover:text-neutral-600 transition-colors"
							aria-label="Search products"
						>
							<Search size={22} />
						</button>

						{/* Cart */}
						<CartIcon />

						{/* Profile */}
						<Link
							href="/login"
							className="p-1 text-black hover:text-neutral-600 transition-colors"
							aria-label="Account Login"
						>
							<User size={22} />
						</Link>
					</div>
				</nav>
			</header>

			{/* Mobile Navigation Drawer */}
			{mobileMenuOpen && (
				<div className="fixed inset-0 z-50 md:hidden">
					<div
						className="fixed inset-0 bg-black/50 transition-opacity"
						onClick={() => setMobileMenuOpen(false)}
						aria-hidden="true"
					/>
					<div className="fixed top-0 bottom-0 left-0 w-[280px] bg-white z-50 p-6 flex flex-col justify-between shadow-2xl">
						<div className="flex flex-col gap-6">
							<div className="flex items-center justify-between">
								<span className="font-[family-name:var(--font-integral)] text-xl font-bold">
									SHOP.CO
								</span>
								<button
									onClick={() => setMobileMenuOpen(false)}
									className="p-1 text-neutral-500 hover:text-black"
									aria-label="Close menu"
								>
									<X size={24} />
								</button>
							</div>

							<div className="flex flex-col gap-4 font-[family-name:var(--font-satoshi)] text-lg font-medium">
								<Link
									href="/shop"
									onClick={() => setMobileMenuOpen(false)}
									className="py-1 text-black hover:text-neutral-600"
								>
									Shop
								</Link>
								<Link
									href="/shop"
									onClick={() => setMobileMenuOpen(false)}
									className="py-1 text-black hover:text-neutral-600"
								>
									On Sale
								</Link>
								<Link
									href="/shop"
									onClick={() => setMobileMenuOpen(false)}
									className="py-1 text-black hover:text-neutral-600"
								>
									New Arrivals
								</Link>
								<Link
									href="/brands"
									onClick={() => setMobileMenuOpen(false)}
									className="py-1 text-black hover:text-neutral-600"
								>
									Brands
								</Link>
							</div>
						</div>

						<div className="pt-6 border-t border-neutral-100 flex flex-col gap-3 font-[family-name:var(--font-satoshi)]">
							<Link
								href="/login"
								onClick={() => setMobileMenuOpen(false)}
								className="w-full text-center py-2.5 px-4 bg-black text-white rounded-full font-medium text-sm"
							>
								Sign In
							</Link>
							<Link
								href="/sign-up"
								onClick={() => setMobileMenuOpen(false)}
								className="w-full text-center py-2.5 px-4 border border-neutral-300 text-black rounded-full font-medium text-sm"
							>
								Create Account
							</Link>
						</div>
					</div>
				</div>
			)}

			{/* Mobile Search Modal */}
			<SearchModal
				isOpen={showMobileSearch}
				onClose={() => setShowMobileSearch(false)}
				products={allProducts}
			/>
		</>
	)
}
