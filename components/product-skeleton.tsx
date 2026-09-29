import Skeleton from "./skeleton"

export default function ProductSkeleton() {
	return (
		<div className="max-w-[1400px] mx-auto px-4 py-8">
			{/* Breadcrumb Skeleton */}
			<div className="flex items-center gap-2 mb-8">
				<Skeleton width={50} height={16} />
				<Skeleton width={12} height={16} />
				<Skeleton width={70} height={16} />
				<Skeleton width={12} height={16} />
				<Skeleton width={120} height={16} />
			</div>

			{/* Main Product Info Skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
				{/* Gallery Skeleton */}
				<div className="flex flex-col-reverse md:grid md:grid-cols-[110px_1fr] gap-4">
					<div className="flex md:flex-col gap-3">
						<Skeleton width={96} height={96} className="rounded-xl" />
						<Skeleton width={96} height={96} className="rounded-xl" />
						<Skeleton width={96} height={96} className="rounded-xl" />
					</div>
					<div className="w-full aspect-square rounded-2xl overflow-hidden">
						<Skeleton width="100%" height="100%" />
					</div>
				</div>

				{/* Info Skeleton */}
				<div className="flex flex-col gap-4">
					<Skeleton width="85%" height={40} />
					<Skeleton width={140} height={20} />
					<Skeleton width={120} height={36} />
					<Skeleton width="100%" height={80} />
					<div className="flex gap-3 my-2">
						<Skeleton width={36} height={36} className="rounded-full" />
						<Skeleton width={36} height={36} className="rounded-full" />
						<Skeleton width={36} height={36} className="rounded-full" />
					</div>
					<div className="flex gap-3 my-2">
						<Skeleton width={80} height={40} className="rounded-full" />
						<Skeleton width={80} height={40} className="rounded-full" />
						<Skeleton width={80} height={40} className="rounded-full" />
					</div>
					<div className="flex gap-4 mt-4">
						<Skeleton width={140} height={48} className="rounded-full" />
						<Skeleton width="100%" height={48} className="rounded-full" />
					</div>
				</div>
			</div>
		</div>
	)
}
