"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export default function Breadcrumb() {
	const pathname = usePathname()

	const generateBreadcrumbs = () => {
		const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean)

		const breadcrumbs = segments.map((segment, index) => {
			const formattedSegment = segment
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ")

			const href = `/${segments.slice(0, index + 1).join("/")}`
			const isCurrentSegment = index === segments.length - 1

			return {
				label: formattedSegment,
				href,
				isCurrentSegment
			}
		})

		return [
			{ label: "Home", href: "/", isCurrentSegment: segments.length === 0 },
			...breadcrumbs
		]
	}

	const breadcrumbs = generateBreadcrumbs()

	return (
		<nav
			aria-label="Breadcrumb"
			className="flex items-center flex-wrap gap-2 mb-8 text-neutral-500 font-[family-name:var(--font-satoshi)] text-sm"
		>
			{breadcrumbs.map((crumb, index) => (
				<span key={crumb.href} className="flex items-center gap-2">
					{crumb.isCurrentSegment ? (
						<span className="text-black font-medium">{crumb.label}</span>
					) : (
						<Link
							href={crumb.href}
							className="hover:text-black transition-colors"
						>
							{crumb.label}
						</Link>
					)}
					{index < breadcrumbs.length - 1 && (
						<ChevronRight size={16} className="text-neutral-400" />
					)}
				</span>
			))}
		</nav>
	)
}
