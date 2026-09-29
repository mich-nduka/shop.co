"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowRight, Tag } from "lucide-react"
import { Breadcrumb } from "~/components/ui"
import { type CartItem, useCart } from "~/context/cart-context"
import { CheckoutSuccessModal } from "~/components/cart"

type OrderDetails = {
	orderNumber: string
	items: CartItem[]
	subtotal: number
	discount: number
	deliveryFee: number
	total: number
}

function generateOrderNumber(): string {
	return `${Date.now().toString().slice(-6)}${Math.floor(100 + Math.random() * 900)}`
}

export default function CartPage() {
	const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
	const [promoCode, setPromoCode] = useState("")
	const [promoApplied, setPromoApplied] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [orderDetails, setOrderDetails] = useState<OrderDetails>({
		orderNumber: "",
		items: [],
		subtotal: 0,
		discount: 0,
		deliveryFee: 0,
		total: 0
	})

	const { subtotal, discount, deliveryFee, total } = getCartTotal()

	const handleCheckout = () => {
		const orderNumber = generateOrderNumber()

		setOrderDetails({
			orderNumber,
			items: [...cartItems],
			subtotal,
			discount,
			deliveryFee,
			total
		})

		setShowSuccessModal(true)
		clearCart()
	}

	return (
		<div className="max-w-[1400px] mx-auto px-4 py-8 font-[family-name:var(--font-satoshi)]">
			<Breadcrumb />
			<h1 className="font-[family-name:var(--font-integral)] text-2xl sm:text-4xl font-black text-black uppercase tracking-tight mb-8">
				YOUR CART
			</h1>

			{cartItems.length === 0 ? (
				<div className="text-center py-20 bg-neutral-50 rounded-2xl border border-neutral-200">
					<p className="text-neutral-600 text-lg mb-4">Your shopping cart is empty.</p>
					<Link
						href="/shop"
						className="inline-block bg-black text-white py-3 px-8 rounded-full font-medium text-sm hover:bg-neutral-800 transition-colors"
					>
						Explore Products
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
					{/* Cart Items List */}
					<div className="flex flex-col gap-4 border border-neutral-200 rounded-2xl p-4 sm:p-6 bg-white divide-y divide-neutral-100">
						{cartItems.map((item) => (
							<div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
								<div className="flex items-center gap-4">
									<img
										src={item.image}
										alt={item.title}
										className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-neutral-100 shrink-0"
									/>
									<div>
										<h3 className="font-bold text-base sm:text-lg text-black">{item.title}</h3>
										<div className="text-sm font-semibold text-black mt-1">
											${item.price}
										</div>
										{item.discount > 0 && (
											<span className="text-xs text-red-500 font-medium">
												{Math.round(item.discount)}% off
											</span>
										)}
									</div>
								</div>

								<div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-3 self-stretch sm:self-center">
									<button
										onClick={() => removeFromCart(item.id)}
										className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
										aria-label={`Remove ${item.title} from cart`}
									>
										<Trash2 size={18} />
									</button>

									{/* Quantity selector */}
									<div className="flex items-center bg-[#f0f0f0] rounded-full px-2 py-1 gap-2">
										<button
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
											disabled={item.quantity <= 1}
											className="p-1 text-black hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
											aria-label="Decrease quantity"
										>
											<Minus size={16} />
										</button>
										<span className="font-semibold text-sm min-w-[20px] text-center">
											{item.quantity}
										</span>
										<button
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
											className="p-1 text-black hover:opacity-70"
											aria-label="Increase quantity"
										>
											<Plus size={16} />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className="border border-neutral-200 rounded-2xl p-6 bg-white sticky top-24 shadow-sm flex flex-col gap-4">
						<h2 className="font-bold text-xl text-black">Order Summary</h2>

						<div className="flex flex-col gap-3 text-sm pt-2">
							<div className="flex justify-between items-center text-neutral-500">
								<span>Subtotal</span>
								<span className="font-bold text-black">${subtotal.toFixed(2)}</span>
							</div>

							<div className="flex justify-between items-center text-neutral-500">
								<span>Discount</span>
								<span className="font-bold text-red-500">-${discount.toFixed(2)}</span>
							</div>

							<div className="flex justify-between items-center text-neutral-500">
								<span>Delivery Fee</span>
								<span className="font-bold text-black">${deliveryFee.toFixed(2)}</span>
							</div>

							<div className="pt-3 border-t border-neutral-200 flex justify-between items-center text-base sm:text-lg font-bold text-black">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>
						</div>

						{/* Promo Code input */}
						<div className="flex items-center gap-2 pt-2">
							<div className="relative flex-1">
								<Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
								<input
									type="text"
									placeholder="Add promo code"
									value={promoCode}
									onChange={(e) => setPromoCode(e.target.value)}
									className="w-full py-2.5 pl-10 pr-3 bg-neutral-100 rounded-full text-sm outline-none focus:bg-neutral-200"
								/>
							</div>
							<button
								onClick={() => {
									if (promoCode.trim()) setPromoApplied(true)
								}}
								className="py-2.5 px-5 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
							>
								Apply
							</button>
						</div>
						{promoApplied && (
							<div className="text-xs text-emerald-600 font-medium">Promo code applied successfully!</div>
						)}

						{/* Checkout button */}
						<button
							onClick={handleCheckout}
							className="w-full py-3.5 px-6 bg-black text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer mt-2"
						>
							Go to Checkout
							<ArrowRight size={18} />
						</button>
					</div>
				</div>
			)}

			{/* Checkout Success Modal */}
			{showSuccessModal && (
				<CheckoutSuccessModal
					onClose={() => setShowSuccessModal(false)}
					orderDetails={orderDetails}
				/>
			)}
		</div>
	)
}
