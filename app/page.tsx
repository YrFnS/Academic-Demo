'use client';

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { 
  QrCode, 
  TrendingUp, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function Dashboard() {
  const { role, t } = useAppContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-oxford-blue to-oxford-light border border-white/10 p-8 md:p-12 shadow-2xl"
        >
          <div className="absolute top-0 end-0 -mt-16 -me-16 w-64 h-64 bg-academic-gold/20 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-0 start-0 -mb-16 -ms-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t(`greeting.${role}`)}
            </h2>
            <p className="text-slate-300 max-w-xl text-lg">
              {role === 'student' && 'Your next lecture is Data Structures in Hall 4 at 10:00 AM.'}
              {role === 'lecturer' && 'Please submit the final grades for Advanced Algorithms by Thursday.'}
              {role === 'admin' && '2 new official orders require your digital signature.'}
            </p>
            
            <div className="mt-8">
              {role === 'student' ? (
                <Link href="/scan" className="inline-flex items-center gap-2 px-6 py-3 bg-academic-gold hover:bg-amber-500 text-oxford-blue font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md">
                  <QrCode className="w-5 h-5" /> {t('action.scan')}
                </Link>
              ) : (
                <button className="flex items-center gap-2 px-6 py-3 bg-academic-gold hover:bg-amber-500 text-oxford-blue font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md">
                  {role === 'lecturer' && <><QrCode className="w-5 h-5" /> {t('action.generate')}</>}
                  {role === 'admin' && <><FileText className="w-5 h-5" /> {t('action.publish')}</>}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Stats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard 
            variants={itemVariants}
            title={role === 'student' ? t('stat.gpa') : role === 'lecturer' ? 'Average Grade' : 'Dept GPA'}
            value={role === 'student' ? '3.84' : role === 'lecturer' ? '76%' : '3.2'}
            trend="+0.12"
            icon={TrendingUp}
          />
          <StatCard 
            variants={itemVariants}
            title={t('stat.attendance')}
            value={role === 'student' ? '92%' : role === 'lecturer' ? '88%' : '85%'}
            trend={role === 'student' ? "Good" : "-2%"}
            icon={CheckCircle2}
            trendColor={role === 'student' ? 'text-emerald-600' : 'text-rose-600'}
          />
          <StatCard 
            variants={itemVariants}
            title={role === 'student' ? t('stat.credits') : role === 'lecturer' ? 'ECTS Completed' : 'Total Staff'}
            value={role === 'student' ? '104' : role === 'lecturer' ? '24/30' : '42'}
            icon={GraduationCap}
          />
          <StatCard 
            variants={itemVariants}
            title={role === 'student' ? t('stat.lectures') : role === 'lecturer' ? 'Classes Today' : t('stat.pending')}
            value={role === 'student' ? '2' : role === 'lecturer' ? '3' : '12'}
            icon={Clock}
            highlight
          />
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
              {role === 'student' && 'Today\'s Schedule'}
              {role === 'lecturer' && 'Bologna Process Tracker'}
              {role === 'admin' && 'Staff Workload Overview'}
            </h3>
            
            <div className="glass-card rounded-2xl p-1 overflow-hidden">
              {/* Mock Table/List based on role */}
              <div className="space-y-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200 text-academic-gold font-mono text-sm">
                        {role === 'student' ? `10:0${i}` : `CS${300+i}`}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {role === 'student' && (i === 1 ? 'Data Structures' : i === 2 ? 'Computer Networks' : 'Web Development')}
                          {role === 'lecturer' && (i === 1 ? 'Advanced Algorithms' : i === 2 ? 'AI Fundamentals' : 'Database Systems')}
                          {role === 'admin' && (i === 1 ? 'Dr. Ahmed Ali' : i === 2 ? 'Prof. Sarah Hassan' : 'Dr. Omar Zaid')}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {role === 'student' && 'Hall 4 • Dr. Ahmed'}
                          {role === 'lecturer' && 'ECTS: 6 • 45 Students'}
                          {role === 'admin' && '12 Hours/Week • 3 Modules'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-academic-gold transition-colors rtl:rotate-180" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
              Recent Notifications
            </h3>
            <div className="glass-card rounded-2xl p-6 space-y-6">
              {[
                { title: 'Official Order #402', time: '2 hours ago', type: 'alert' },
                { title: 'Grades Published', time: '5 hours ago', type: 'success' },
                { title: 'Holiday Announcement', time: '1 day ago', type: 'info' }
              ].map((notif, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    {notif.type === 'alert' ? <AlertCircle className="w-5 h-5 text-amber-500" /> :
                     notif.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                     <FileText className="w-5 h-5 text-blue-500" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">{notif.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ElementType;
  highlight?: boolean;
  variants?: any;
  trendColor?: string;
}

function StatCard({ title, value, trend, icon: Icon, highlight, variants, trendColor = "text-emerald-600" }: StatCardProps) {
  return (
    <motion.div 
      variants={variants}
      className={`p-6 rounded-2xl ${
        highlight 
          ? 'bg-academic-gold/10 border border-academic-gold/20 hover:bg-academic-gold/20' 
          : 'glass-card hover:-translate-y-1 hover:shadow-lg'
      } relative overflow-hidden group transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`p-2 rounded-lg ${highlight ? 'bg-academic-gold/20 text-academic-gold' : 'bg-slate-50 text-slate-400'}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold ${highlight ? 'text-academic-gold' : 'text-slate-900'}`}>{value}</span>
        {trend && (
          <span className={`text-sm font-medium ${trendColor}`}>
            {trend}
          </span>
        )}
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-6 -end-6 w-24 h-24 bg-gradient-to-br from-transparent to-slate-100 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
    </motion.div>
  );
}
