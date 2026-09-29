"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-black text-white py-2.5 px-4 text-center relative text-xs md:text-sm font-[family-name:var(--font-satoshi)]">
      <p className="m-0">
        Sign up and get 20% off your first order.{" "}
        <Link href="/sign-up" className="underline font-semibold hover:opacity-80 transition-opacity">
          Sign Up Now
        </Link>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white hover:opacity-80 transition-opacity cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  )
}
