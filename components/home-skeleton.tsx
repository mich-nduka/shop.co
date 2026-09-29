import Skeleton from "./skeleton"

export default function HomeSkeleton() {
  return (
    <div className="w-full">
      {/* Hero Skeleton */}
      <div className="bg-[#f2f0f1] py-12 px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4">
            <Skeleton width="90%" height={50} />
            <Skeleton width="75%" height={50} />
            <Skeleton width="80%" height={20} />
            <Skeleton width={180} height={48} className="rounded-full mt-4" />
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-neutral-200">
              <div>
                <Skeleton width={80} height={32} />
                <Skeleton width={100} height={16} className="mt-2" />
              </div>
              <div>
                <Skeleton width={80} height={32} />
                <Skeleton width={100} height={16} className="mt-2" />
              </div>
              <div>
                <Skeleton width={80} height={32} />
                <Skeleton width={100} height={16} className="mt-2" />
              </div>
            </div>
          </div>
          <div className="w-full aspect-square max-w-[500px] mx-auto rounded-2xl overflow-hidden">
            <Skeleton width="100%" height="100%" />
          </div>
        </div>
      </div>

      {/* Brand Strip Skeleton */}
      <div className="bg-black py-8 px-4 flex justify-center gap-8 md:gap-16 flex-wrap">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-24 md:w-32 h-7 bg-neutral-800 rounded animate-pulse" />
        ))}
      </div>

      {/* Products Section Skeleton */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <Skeleton width={260} height={40} />
        </div>
        <div className="flex justify-center gap-5 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[260px] shrink-0 flex flex-col gap-3">
              <Skeleton width="100%" height={260} className="rounded-[20px]" />
              <Skeleton width="80%" height={20} />
              <Skeleton width="40%" height={16} />
              <Skeleton width="30%" height={24} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
