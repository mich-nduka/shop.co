import { Skeleton } from "~/components/ui"

export default function ShopSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <Skeleton width={280} height={40} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="aspect-square rounded-2xl overflow-hidden relative">
            <Skeleton width="100%" height="100%" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2 bg-gradient-to-t from-black/40 to-transparent">
              <Skeleton width="70%" height={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
