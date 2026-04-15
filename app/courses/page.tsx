'use client';

import React from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { BookOpen, User } from 'lucide-react';

export default function CoursesPage() {
  const { t, language } = useAppContext();
  const courses = [
    { id: 'CS301', nameEn: 'Data Structures', nameAr: 'هياكل البيانات', instructor: 'Dr. Ahmed Ali', progress: 75 },
    { id: 'CS302', nameEn: 'Computer Networks', nameAr: 'شبكات الحاسوب', instructor: 'Eng. Sarah', progress: 40 },
    { id: 'CS303', nameEn: 'Web Development', nameAr: 'تطوير الويب', instructor: 'Dr. Omar Zaid', progress: 90 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-50">{t('courses.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm hover:border-amber-500/50 transition-colors group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform"><BookOpen className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-slate-200 mb-1">{language === 'ar' ? course.nameAr : course.nameEn}</h3>
              <p className="text-sm text-slate-400 font-mono mb-4">{course.id}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300"><User className="w-4 h-4 text-slate-500" /> {course.instructor}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400"><span>Progress</span><span>{course.progress}%</span></div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${course.progress}%` }}></div></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
}
