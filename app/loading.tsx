export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-academic-gold rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-slate-400 font-medium animate-pulse">Loading...</p>
    </div>
  );
}
