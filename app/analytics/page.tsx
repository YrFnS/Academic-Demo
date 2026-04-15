'use client';

import React from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Download, 
  TrendingUp, 
  Users, 
  BookOpen, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';

// Mock Data
const workloadData = [
  { name: 'Dr. Ahmed', hours: 12 },
  { name: 'Prof. Sarah', hours: 8 },
  { name: 'Dr. Omar', hours: 15 },
  { name: 'Dr. Noor', hours: 10 },
  { name: 'Mr. Ali', hours: 18 },
];

const passRateData = [
  { name: 'Passed', value: 85 },
  { name: 'Failed', value: 15 },
];

const COLORS = ['#10b981', '#f43f5e']; // Emerald for pass, Rose for fail

const bolognaModules = [
  { id: 'CS401', name: 'Advanced Algorithms', progress: 80, target: 100 },
  { id: 'CS402', name: 'AI Fundamentals', progress: 45, target: 100 },
  { id: 'CS403', name: 'Database Systems', progress: 100, target: 100 },
  { id: 'CS404', name: 'Software Engineering', progress: 20, target: 100 },
];

const auditWatchlist = [
  { id: 'CS402', issue: 'Missing Midterm Grades', lecturer: 'Prof. Sarah', daysOverdue: 2 },
  { id: 'CS404', issue: 'No Syllabus Uploaded', lecturer: 'Mr. Ali', daysOverdue: 5 },
];

export default function AnalyticsDashboard() {
  const { role, t, language } = useAppContext();

  // Protect route
  if (role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p className="text-slate-400">Only the Head of Department can access analytics.</p>
          </div>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-50 mb-2">{t('analytics.title')}</h1>
            <p className="text-slate-400">Computer Science Department Overview</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700">
            <Download className="w-4 h-4" />
            <span>{t('analytics.export_report')}</span>
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Overall GPA" value="3.12" trend="+0.05" icon={TrendingUp} />
          <KPICard title={t('analytics.pass_rate')} value="85%" trend="+2%" icon={CheckCircle2} />
          <KPICard title={t('analytics.active_staff')} value="24" icon={Users} />
          <KPICard title="Total Modules" value="42" icon={BookOpen} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workload Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-slate-200 mb-6">{t('analytics.workload')}</h3>
              <div className="h-[300px] w-full" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workloadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{ fill: '#1e293b', opacity: 0.4 }}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Bar dataKey="hours" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Bologna Tracker */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-slate-200 mb-6">{t('analytics.bologna_tracker')}</h3>
              <div className="space-y-6">
                {bolognaModules.map((mod) => (
                  <div key={mod.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-300">{mod.id} - {mod.name}</span>
                      <span className="text-slate-400">{mod.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${mod.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          mod.progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            {/* Pass Rate Pie Chart */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-slate-200 mb-2">{t('analytics.pass_rate')}</h3>
              <div className="h-[200px] w-full relative" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={passRateData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {passRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-3xl font-bold text-emerald-400">85%</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Passed</span>
                </div>
              </div>
            </motion.div>

            {/* Audit Watchlist */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/50 border border-rose-900/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 end-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl"></div>
              <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {t('analytics.audit_watchlist')}
              </h3>
              
              <div className="space-y-4">
                {auditWatchlist.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded">{item.id}</span>
                      <span className="flex items-center gap-1 text-xs font-medium text-rose-400 bg-rose-500/10 px-2 py-1 rounded">
                        <Clock className="w-3 h-3" />
                        {item.daysOverdue} days late
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-200">{item.issue}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.lecturer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
  );
}

function KPICard({ title, value, trend, icon: Icon }: any) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-50">{value}</span>
        {trend && (
          <span className="text-sm font-medium text-emerald-400">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
