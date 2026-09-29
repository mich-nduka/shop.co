import { Skeleton } from "~/components/ui"

export default function BrandsLoading() {
	return (
		<div className="max-w-[1400px] mx-auto px-4 py-8">
			{/* Breadcrumb Skeleton */}
			<div className="flex items-center gap-2 mb-8">
				<Skeleton width={50} height={16} />
				<Skeleton width={12} height={16} />
				<Skeleton width={70} height={16} />
			</div>

			<div className="flex justify-center mb-3">
				<Skeleton width={260} height={40} />
			</div>
			<div className="flex justify-center mb-8">
				<Skeleton width={400} height={20} />
			</div>
			<div className="max-w-[550px] mx-auto mb-12">
				<Skeleton width="100%" height={48} className="rounded-full" />
			</div>

			{/* Featured Skeleton */}
			<div className="mb-14">
				<Skeleton width={200} height={28} className="mb-6" />
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="border border-neutral-200 rounded-2xl overflow-hidden p-4">
							<Skeleton width="100%" height={160} className="rounded-xl mb-4" />
							<Skeleton width="60%" height={24} className="mb-2" />
							<Skeleton width="90%" height={16} />
						</div>
					))}
				</div>
			</div>

			{/* All Brands Skeleton */}
			<div>
				<Skeleton width={160} height={28} className="mb-6" />
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{[...Array(12)].map((_, i) => (
						<div key={i} className="border border-neutral-200 rounded-xl p-4 flex flex-col items-center gap-3">
							<Skeleton width={64} height={64} className="rounded-full" />
							<Skeleton width={80} height={16} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
