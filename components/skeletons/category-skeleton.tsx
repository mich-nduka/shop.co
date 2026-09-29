import { Skeleton } from "~/components/ui"

export default function CategorySkeleton() {
	return (
		<div className="max-w-[1400px] mx-auto px-4 py-8">
			{/* Breadcrumb Skeleton */}
			<div className="flex items-center gap-2 mb-8">
				<Skeleton width={50} height={16} />
				<Skeleton width={12} height={16} />
				<Skeleton width={80} height={16} />
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Sidebar Skeleton */}
				<div className="hidden lg:block w-[240px] shrink-0 border border-neutral-200 rounded-2xl p-5 flex flex-col gap-3">
					<Skeleton width={100} height={24} className="mb-4" />
					{[...Array(10)].map((_, index) => (
						<Skeleton key={index} width={index % 2 === 0 ? "80%" : "60%"} height={20} />
					))}
				</div>

				{/* Products Section Skeleton */}
				<div className="flex-1 flex flex-col gap-6">
					<div className="flex items-center justify-between">
						<Skeleton width={180} height={32} />
						<Skeleton width={120} height={36} className="rounded-full" />
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{[...Array(6)].map((_, index) => (
							<div key={index} className="flex flex-col gap-3">
								<Skeleton width="100%" height={260} className="rounded-[20px]" />
								<Skeleton width="80%" height={20} />
								<Skeleton width="40%" height={16} />
								<Skeleton width="30%" height={24} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
