'use client';

import React from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { AlertTriangle, Clock, MapPin, User } from 'lucide-react';

const scheduleData = [
  {
    day: 'schedule.sunday',
    classes: [
      { time: '08:30 - 10:30', name: 'Data Structures', location: 'Hall 4', type: 'Lecture', instructor: 'Dr. Ahmed Ali' },
      { time: '11:00 - 13:00', name: 'Computer Networks', location: 'Lab 2', type: 'Lab', instructor: 'Eng. Sarah' },
    ]
  },
  {
    day: 'schedule.monday',
    classes: [
      { time: '09:00 - 11:00', name: 'Web Development', location: 'Hall 1', type: 'Lecture', instructor: 'Dr. Omar Zaid' },
      { time: '11:30 - 13:30', name: 'Database Systems', location: 'Hall 3', type: 'Lecture', instructor: 'Prof. Hassan' },
    ]
  },
  {
    day: 'schedule.tuesday',
    classes: [
      { time: '08:30 - 10:30', name: 'Data Structures', location: 'Lab 1', type: 'Lab', instructor: 'Eng. Ali' },
    ]
  },
  {
    day: 'schedule.wednesday',
    classes: [
      { time: '10:00 - 12:00', name: 'AI Fundamentals', location: 'Hall 2', type: 'Lecture', instructor: 'Dr. Noor' },
      { time: '12:30 - 14:30', name: 'Web Development', location: 'Lab 4', type: 'Lab', instructor: 'Eng. Zainab' },
    ]
  },
  {
    day: 'schedule.thursday',
    classes: [
      { time: '09:00 - 11:00', name: 'Software Engineering', location: 'Hall 5', type: 'Lecture', instructor: 'Dr. Yasser' },
    ]
  }
];

export default function SchedulePage() {
  const { role, t, language } = useAppContext();

  if (role !== 'student') {
    return (
      <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p className="text-slate-400">Please switch to the Student role to view the schedule.</p>
          </div>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-50 mb-2">{t('schedule.title')}</h1>
            <p className="text-slate-400">Spring Semester 2025/2026</p>
          </div>
        </div>

        <div className="grid gap-6">
          {scheduleData.map((dayData, index) => (
            <motion.div 
              key={dayData.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm"
            >
              <div className="bg-slate-950/50 px-6 py-3 border-b border-slate-800">
                <h3 className="font-bold text-lg text-amber-500">{t(dayData.day)}</h3>
              </div>
              <div className="p-4 sm:p-6 grid gap-4">
                {dayData.classes.map((cls, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:items-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-2 sm:w-48 shrink-0 text-slate-300 font-mono text-sm">
                      <Clock className="w-4 h-4 text-amber-500" />
                      {cls.time}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-slate-100 text-lg">{cls.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          cls.type === 'Lecture' 
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {cls.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-400 mt-2">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {cls.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {cls.instructor}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
}
