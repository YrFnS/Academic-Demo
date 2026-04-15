'use client';

import React from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export default function GradesPage() {
  const { t } = useAppContext();
  const grades = [
    { id: 'CS201', name: 'Object Oriented Programming', credits: 4, grade: 'A', points: 4.0 },
    { id: 'CS202', name: 'Database Systems', credits: 3, grade: 'B+', points: 3.5 },
    { id: 'CS203', name: 'Operating Systems', credits: 4, grade: 'A-', points: 3.7 },
    { id: 'MA201', name: 'Linear Algebra', credits: 3, grade: 'B', points: 3.0 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl font-bold text-slate-50">{t('grades.title')}</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"><Download className="w-4 h-4" /> Transcript</button>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
                <tr><th className="px-6 py-4">Code</th><th className="px-6 py-4">Module</th><th className="px-6 py-4 text-center">Credits</th><th className="px-6 py-4 text-center">Grade</th></tr>
              </thead>
              <tbody>
                {grades.map((g, i) => (
                  <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono text-slate-400">{g.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-200">{g.name}</td>
                    <td className="px-6 py-4 text-center text-slate-300">{g.credits}</td>
                    <td className="px-6 py-4 text-center font-bold text-amber-500">{g.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
  );
}
