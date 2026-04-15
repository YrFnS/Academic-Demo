'use client';

import React from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { Users, Mail, BookOpen } from 'lucide-react';

export default function StaffPage() {
  const { t } = useAppContext();
  const staff = [
    { name: 'Dr. Ahmed Ali', role: 'Professor', email: 'ahmed.ali@uob.edu.iq', hours: 12, modules: 3 },
    { name: 'Prof. Sarah Hassan', role: 'Assoc. Professor', email: 'sarah.h@uob.edu.iq', hours: 8, modules: 2 },
    { name: 'Dr. Omar Zaid', role: 'Assistant Professor', email: 'omar.z@uob.edu.iq', hours: 15, modules: 4 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-50">{t('staff.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-amber-500/50 flex items-center justify-center mb-4 text-xl font-bold text-slate-300">{member.name.charAt(4)}</div>
              <h3 className="text-lg font-bold text-slate-200">{member.name}</h3>
              <p className="text-sm text-amber-500 mb-4">{member.role}</p>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {member.email}</div>
                <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {member.modules} Modules</div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {member.hours} Hours/Week</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
}
