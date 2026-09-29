import React from "react"
import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number // Rating value, range from 0 to 5
}

export default function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={18}
          className={index < Math.floor(rating) ? "text-[#ffb800] fill-[#ffb800]" : "text-neutral-300"}
        />
      ))}
    </div>
  )
}
