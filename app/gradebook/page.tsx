'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { 
  Download, 
  UploadCloud, 
  AlertTriangle, 
  CheckCircle2, 
  Search,
  QrCode,
  MoreVertical
} from 'lucide-react';

// Mock Data for the Gradebook
const mockStudents = [
  { id: '2023001', nameEn: 'Ahmed Ali Hassan', nameAr: 'أحمد علي حسن', attendance: 92, quizzes: 8, midterm: 18, final: 0 },
  { id: '2023002', nameEn: 'Sarah Mohammed', nameAr: 'سارة محمد', attendance: 85, quizzes: 7, midterm: 15, final: 0 },
  { id: '2023003', nameEn: 'Omar Zaid', nameAr: 'عمر زيد', attendance: 60, quizzes: 4, midterm: 9, final: 0 }, // At risk
  { id: '2023004', nameEn: 'Noor Hussein', nameAr: 'نور حسين', attendance: 98, quizzes: 9, midterm: 19, final: 0 },
  { id: '2023005', nameEn: 'Ali Yasser', nameAr: 'علي ياسر', attendance: 70, quizzes: 5, midterm: 12, final: 0 },
];

export default function Gradebook() {
  const { role, language, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'daily' | 'final'>('daily');
  const [searchQuery, setSearchQuery] = useState('');

  // Protect route in a real app, but for demo we just show a message if not lecturer/admin
  if (role === 'student') {
    return (
      <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p className="text-slate-400">Students cannot access the gradebook.</p>
          </div>
        </div>
    );
  }

  const filteredStudents = mockStudents.filter(s => 
    s.id.includes(searchQuery) || 
    s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nameAr.includes(searchQuery)
  );

  const atRiskStudents = mockStudents.filter(s => s.attendance < 75 || (s.quizzes + s.midterm) < 15);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-50 mb-2">{t('gradebook.title')}</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {t('gradebook.module')}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium">
                {t('gradebook.ects')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{t('gradebook.export')}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <UploadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">{t('gradebook.publish_grades')}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Grade Sheet */}
          <div className="lg:col-span-3 space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 bg-slate-900/50 p-2 rounded-xl border border-slate-800 backdrop-blur-sm">
              <div className="flex p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button 
                  onClick={() => setActiveTab('daily')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'daily' ? 'bg-slate-800 text-slate-50 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {t('gradebook.daily')}
                </button>
                <button 
                  onClick={() => setActiveTab('final')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'final' ? 'bg-slate-800 text-slate-50 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {t('gradebook.final')}
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search student ID or name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-lg py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* The Sheet (Table) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4 font-medium">ID</th>
                      <th className="px-6 py-4 font-medium">{t('gradebook.student')}</th>
                      <th className="px-6 py-4 font-medium text-center">{t('gradebook.attendance')} (10)</th>
                      <th className="px-6 py-4 font-medium text-center">{t('gradebook.quizzes')} (10)</th>
                      <th className="px-6 py-4 font-medium text-center">{t('gradebook.midterm')} (20)</th>
                      <th className="px-6 py-4 font-medium text-center text-amber-500">{t('gradebook.total')} (40)</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, idx) => {
                      const total = Math.round((student.attendance / 10) + student.quizzes + student.midterm);
                      const isAtRisk = student.attendance < 75 || total < 15;
                      
                      return (
                        <motion.tr 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          key={student.id} 
                          className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group"
                        >
                          <td className="px-6 py-4 font-mono text-slate-400">{student.id}</td>
                          <td className="px-6 py-4 font-medium text-slate-200">
                            <div className="flex items-center gap-2">
                              {language === 'ar' ? student.nameAr : student.nameEn}
                              {isAtRisk && <span className="w-2 h-2 rounded-full bg-rose-500" title="At Risk"></span>}
                            </div>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <input 
                              type="text" 
                              defaultValue={Math.round(student.attendance / 10)} 
                              className="w-12 text-center bg-transparent border border-transparent hover:border-slate-700 focus:border-amber-500 focus:bg-slate-950 rounded py-1 outline-none transition-all"
                            />
                          </td>
                          <td className="px-6 py-3 text-center">
                            <input 
                              type="text" 
                              defaultValue={student.quizzes} 
                              className="w-12 text-center bg-transparent border border-transparent hover:border-slate-700 focus:border-amber-500 focus:bg-slate-950 rounded py-1 outline-none transition-all"
                            />
                          </td>
                          <td className="px-6 py-3 text-center">
                            <input 
                              type="text" 
                              defaultValue={student.midterm} 
                              className="w-12 text-center bg-transparent border border-transparent hover:border-slate-700 focus:border-amber-500 focus:bg-slate-950 rounded py-1 outline-none transition-all"
                            />
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-amber-500">
                            {total}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h3>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors border border-slate-700 group">
                <QrCode className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span>{t('action.generate')}</span>
              </button>
            </div>

            {/* At-Risk Students */}
            <div className="bg-slate-900/50 border border-rose-900/30 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 end-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl"></div>
              <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {t('gradebook.at_risk')}
              </h3>
              
              <div className="space-y-3">
                {atRiskStudents.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/50">
                    <div>
                      <p className="text-sm font-medium text-slate-200">{language === 'ar' ? student.nameAr : student.nameEn}</p>
                      <p className="text-xs text-slate-500 font-mono">{student.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-rose-400">{student.attendance}% Att.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
