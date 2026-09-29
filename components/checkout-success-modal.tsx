"use client"

import { X, CheckCircle, ShoppingBag } from "lucide-react"
import Link from "next/link"
import type { CartItem } from "../context/cart-context"

interface CheckoutSuccessModalProps {
  onClose: () => void
  orderDetails: {
    orderNumber: string
    items: CartItem[]
    subtotal: number
    discount: number
    deliveryFee: number
    total: number
  }
}

export default function CheckoutSuccessModal({ onClose, orderDetails }: CheckoutSuccessModalProps) {
  // Generate a delivery date (5-7 days from now)
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 5)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl max-w-[550px] w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative font-[family-name:var(--font-satoshi)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
            <CheckCircle size={40} />
          </div>

          <h2 className="font-[family-name:var(--font-integral)] text-2xl font-black text-black tracking-tight mb-2">
            ORDER SUCCESSFUL!
          </h2>
          <p className="text-neutral-500 text-sm mb-6 max-w-[380px]">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {/* Order Summary Box */}
          <div className="w-full bg-[#f9f9f9] rounded-xl p-4 text-left text-sm mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
              <span className="text-neutral-500">Order Number</span>
              <span className="font-bold text-black">#{orderDetails.orderNumber}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-neutral-500">
              <span>Estimated Delivery</span>
              <span className="text-black font-medium">{formattedDeliveryDate}</span>
            </div>
            <div className="flex justify-between items-center py-1 text-neutral-500">
              <span>Subtotal</span>
              <span className="text-black">${orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-1 text-neutral-500">
              <span>Discount</span>
              <span className="text-red-500">-${orderDetails.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-1 text-neutral-500">
              <span>Delivery Fee</span>
              <span className="text-black">${orderDetails.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-neutral-200 font-bold text-base text-black">
              <span>Total</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Items Purchased */}
          <div className="w-full text-left mb-6">
            <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-3">
              Items Purchased ({orderDetails.items.length})
            </h3>
            <div className="flex flex-col divide-y divide-neutral-100 max-h-[180px] overflow-y-auto">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-2.5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-black truncate">{item.title}</div>
                    <div className="text-xs text-neutral-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-semibold text-sm text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/shop"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-neutral-300 font-semibold text-sm hover:bg-neutral-50 transition-colors"
            >
              <ShoppingBag size={16} />
              Continue Shopping
            </Link>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
