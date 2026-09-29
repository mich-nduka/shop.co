"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { Product } from "~/types"

interface SearchModalProps {
	isOpen: boolean
	onClose: () => void
	products: Product[]
}

export default function SearchModal({ isOpen, onClose, products }: SearchModalProps) {
	const [searchQuery, setSearchQuery] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus()
		}
	}, [isOpen])

	const searchResults = useMemo(() => {
		if (!searchQuery.trim()) {
			return products
		}
		const q = searchQuery.toLowerCase()
		return products.filter((product) =>
			product.title.toLowerCase().includes(q) ||
			product.category?.toLowerCase().includes(q)
		)
	}, [searchQuery, products])

	if (!isOpen) return null

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 z-50 transition-opacity"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Modal Container */}
			<div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[90vh] flex flex-col shadow-2xl font-[family-name:var(--font-satoshi)]">
				<div className="p-4 flex items-center gap-3 border-b border-neutral-100">
					<Search size={20} className="text-neutral-400 shrink-0" />
					<input
						ref={inputRef}
						type="text"
						placeholder="Search for products..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="flex-1 py-2 px-3 bg-neutral-100 rounded-lg text-base outline-none focus:bg-neutral-200 transition-colors"
					/>
					<button
						onClick={onClose}
						className="p-2 text-neutral-500 hover:text-black transition-colors"
						aria-label="Close search"
					>
						<X size={24} />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto p-4 divide-y divide-neutral-100">
					{searchResults.length === 0 ? (
						<div className="text-center py-8 text-neutral-500">
							No products found for "{searchQuery}"
						</div>
					) : (
						searchResults.map((product) => (
							<Link
								key={product.id}
								href={`/shop/${product.category}/${product.id}`}
								onClick={onClose}
								className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-neutral-50 transition-colors"
							>
								<img
									src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
									alt={product.title}
									className="w-14 h-14 object-cover rounded bg-neutral-100 shrink-0"
								/>
								<div className="flex-1 min-w-0">
									<div className="font-medium text-sm truncate text-black">{product.title}</div>
									<div className="text-neutral-500 text-xs mt-0.5">${product.price}</div>
								</div>
							</Link>
						))
					)}
				</div>
			</div>
		</>
	)
}
