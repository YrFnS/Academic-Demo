import React from 'react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  CheckCircle2
} from 'lucide-react';

export default function AnalyticsLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="h-9 w-64 bg-slate-800 rounded mb-2"></div>
          <div className="h-5 w-48 bg-slate-800/50 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-slate-800 rounded-lg"></div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex justify-between items-start mb-2">
              <div className="h-4 w-24 bg-slate-800 rounded"></div>
              <div className="w-8 h-8 rounded-lg bg-slate-800"></div>
            </div>
            <div className="h-8 w-16 bg-slate-800 rounded mt-2"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Charts Section Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-[400px]">
             <div className="h-6 w-48 bg-slate-800 rounded mb-6"></div>
             <div className="w-full h-[300px] bg-slate-800/30 rounded"></div>
          </div>
        </div>
        
        {/* Sidebar Skeleton */}
        <div className="space-y-6">
           <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-[200px]">
              <div className="h-6 w-32 bg-slate-800 rounded mb-4"></div>
              <div className="w-32 h-32 rounded-full bg-slate-800/30 mx-auto"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
