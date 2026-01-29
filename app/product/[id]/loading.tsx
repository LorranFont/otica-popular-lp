export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="w-20 h-6 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-200 rounded-2xl animate-pulse"></div>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-slate-200 rounded-lg animate-pulse"></div>
              <div className="w-20 h-20 bg-slate-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div>
              <div className="w-24 h-4 bg-slate-200 rounded animate-pulse mb-2"></div>
              <div className="w-64 h-8 bg-slate-200 rounded animate-pulse mb-4"></div>
              <div className="w-48 h-5 bg-slate-200 rounded animate-pulse"></div>
            </div>

            {/* Price Skeleton */}
            <div className="space-y-2">
              <div className="w-32 h-8 bg-slate-200 rounded animate-pulse"></div>
              <div className="w-48 h-4 bg-slate-200 rounded animate-pulse"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="space-y-4">
              <div className="w-full h-12 bg-slate-200 rounded-xl animate-pulse"></div>
              <div className="flex gap-3">
                <div className="flex-1 h-12 bg-slate-200 rounded-xl animate-pulse"></div>
                <div className="flex-1 h-12 bg-slate-200 rounded-xl animate-pulse"></div>
              </div>
            </div>

            {/* Details Skeleton */}
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div className="w-32 h-6 bg-slate-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <section>
          <div className="w-48 h-8 bg-slate-200 rounded animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/3] bg-slate-200 rounded-2xl animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-16 h-3 bg-slate-200 rounded animate-pulse"></div>
                  <div className="w-32 h-5 bg-slate-200 rounded animate-pulse"></div>
                  <div className="w-24 h-6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
