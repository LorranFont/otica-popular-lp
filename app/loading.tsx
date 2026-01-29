export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-otica-roxo border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-otica-roxo mb-1">
            Carregando...
          </h2>
          <p className="text-sm text-slate-500">Preparando sua experiência</p>
        </div>
      </div>
    </div>
  );
}
