export default function MapLoading() {
  return (
    <div className="h-[calc(100vh-6rem)] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-slate-400">
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-academic-gold animate-spin" />
        <p className="text-sm font-medium animate-pulse">Loading Campus Map...</p>
      </div>
    </div>
  );
}
