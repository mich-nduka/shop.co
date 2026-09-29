import type React from "react"

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
}

export default function Skeleton({ className = "", width, height }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-neutral-200 rounded ${className}`}
      style={{
        width: width ? (typeof width === "number" ? `${width}px` : width) : "100%",
        height: height ? (typeof height === "number" ? `${height}px` : height) : "20px"
      }}
    />
  )
}
