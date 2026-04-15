'use client';

import React from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { BookOpen, Users, Clock } from 'lucide-react';

export default function LecturesPage() {
  const { t } = useAppContext();
  const lectures = [
    { id: 'CS401', name: 'Advanced Algorithms', students: 45, next: 'Today, 10:00 AM' },
    { id: 'CS402', name: 'AI Fundamentals', students: 38, next: 'Tomorrow, 08:30 AM' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-50">{t('lectures.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lectures.map((lec, i) => (
            <motion.div key={lec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500"><BookOpen className="w-6 h-6" /></div>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-mono">{lec.id}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-4">{lec.name}</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-400"><Users className="w-4 h-4" /> {lec.students} Students</div>
                <div className="flex items-center gap-2 text-sm text-slate-400"><Clock className="w-4 h-4" /> {lec.next}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
}
