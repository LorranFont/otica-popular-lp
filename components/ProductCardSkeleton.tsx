export default function ProductCardSkeleton() {
  return (
    <div className="group cursor-pointer flex flex-col items-center font-rubik animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-[4/3] bg-slate-200 rounded-2xl"></div>

      {/* Content Skeleton */}
      <div className="mt-4 text-center w-full space-y-3">
        {/* Brand */}
        <div className="w-16 h-3 bg-slate-200 rounded mx-auto"></div>

        {/* Model */}
        <div className="w-32 h-5 bg-slate-200 rounded mx-auto"></div>

        {/* Price */}
        <div className="space-y-1">
          <div className="w-20 h-3 bg-slate-200 rounded mx-auto"></div>
          <div className="w-24 h-6 bg-slate-200 rounded mx-auto"></div>
        </div>

        {/* Button */}
        <div className="w-full h-10 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  );
}
