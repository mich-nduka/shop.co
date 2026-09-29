"use client"

import { useState, useMemo } from "react"
import { Star, CheckCircle, MoreHorizontal } from "lucide-react"
import type { Review } from "~/types"

interface ProductReviewsProps {
  reviews?: Review[]
}

export default function ProductReviews({ reviews = [] }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState("latest")
  const [displayCount, setDisplayCount] = useState(6)

  const sortedReviews = useMemo(() => {
    const list = [...reviews]
    switch (sortBy) {
      case "highest":
        return list.sort((a, b) => b.rating - a.rating)
      case "lowest":
        return list.sort((a, b) => a.rating - b.rating)
      case "latest":
      default:
        return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  }, [reviews, sortBy])

  return (
    <div className="flex flex-col gap-6 mt-12 font-[family-name:var(--font-satoshi)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
          All Reviews{" "}
          <span className="text-sm font-normal text-neutral-500">
            ({reviews.length})
          </span>
        </h2>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#f0f0f0] text-sm py-2 px-4 rounded-full border-none outline-none font-medium cursor-pointer"
          >
            <option value="latest">Latest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
          <button className="bg-black text-white text-sm font-semibold py-2 px-5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer">
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedReviews.slice(0, displayCount).map((review, index) => (
          <div
            key={index}
            className="border border-neutral-200 rounded-[20px] p-6 flex flex-col gap-3 bg-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex text-[#ffb800]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(review.rating)
                        ? "text-[#ffb800] fill-[#ffb800]"
                        : "text-neutral-300"
                    }
                  />
                ))}
              </div>
              <button className="text-neutral-400 hover:text-black p-1" aria-label="More options">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="flex items-center gap-1.5 font-bold text-base text-black">
              <span>{review.reviewerName}</span>
              {review.verified !== false && (
                <CheckCircle size={16} className="text-emerald-500 fill-emerald-500 text-white" />
              )}
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              "{review.comment}"
            </p>

            <span className="text-xs text-neutral-400 mt-auto pt-2">
              Posted on {review.date ? review.date.split("T")[0] : "Recently"}
            </span>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {displayCount < sortedReviews.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setDisplayCount((count) => count + 6)}
            className="py-3 px-8 rounded-full border border-neutral-300 font-semibold text-sm hover:border-black transition-colors"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )
}
