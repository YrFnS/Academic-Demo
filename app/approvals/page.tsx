'use client';

import React from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { Check, X, FileText } from 'lucide-react';

export default function ApprovalsPage() {
  const { t } = useAppContext();
  const requests = [
    { id: 'REQ-001', student: 'Ali Yasser', type: 'To Whom It May Concern', date: 'Today' },
    { id: 'REQ-002', student: 'Noor Hussein', type: 'Graduation Certificate', date: 'Yesterday' },
    { id: 'REQ-003', student: 'Omar Zaid', type: 'Transcript Request', date: '2 days ago' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-50">{t('approvals.title')}</h1>
        <div className="space-y-4">
          {requests.map((req, i) => (
            <motion.div key={req.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400"><FileText className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-bold text-slate-200">{req.type}</h3>
                  <p className="text-sm text-slate-400">{req.student} • <span className="font-mono text-xs">{req.id}</span> • {req.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-lg transition-colors"><Check className="w-4 h-4" /> Approve</button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-lg transition-colors"><X className="w-4 h-4" /> Reject</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
}
