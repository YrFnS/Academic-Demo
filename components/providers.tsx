'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'student' | 'lecturer' | 'admin';
export type Language = 'en' | 'ar';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.title': 'Sumer Academic Assistant',
    'role.student': 'Student',
    'role.lecturer': 'Lecturer',
    'role.admin': 'Head of Department',
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'My Courses',
    'nav.grades': 'Grades',
    'nav.schedule': 'Schedule',
    'nav.lectures': 'My Lectures',
    'nav.gradebook': 'Gradebook',
    'nav.attendance': 'Attendance',
    'nav.analytics': 'Department Analytics',
    'nav.staff': 'Staff Workload',
    'nav.approvals': 'Pending Approvals',
    'nav.scan': 'Scan QR',
    'nav.quizzes': 'Quizzes & Exams',
    'nav.financials': 'Financials & Bursar',
    'nav.library': 'Library Management',
    'nav.housing': 'Housing & Campus Life',
    'nav.careers': 'Career Services',
    'nav.admissions': 'Admissions & Registration',
    'nav.support': 'Support & Communication',
    'nav.research': 'Research & Innovation',
    'nav.faculty_hr': 'Faculty HR & Performance',
    'nav.governance': 'Governance & Quality',
    'nav.health': 'Health & Wellness',
    'nav.alumni': 'Alumni & Giving',
    'nav.procurement': 'Procurement & Assets',
    'demo.controls': 'Demo Controls',
    'greeting.student': 'Good Morning, Yasser. You have 2 lectures today.',
    'greeting.lecturer': 'Welcome back. You have 1 pending grade sheet.',
    'greeting.admin': 'Department Overview: 85% Attendance across 4 Modules.',
    'stat.gpa': 'Current GPA',
    'stat.attendance': 'Attendance Rate',
    'stat.credits': 'Earned Credits',
    'stat.lectures': 'Lectures Today',
    'stat.pending': 'Pending Tasks',
    'stat.students': 'Total Students',
    'action.scan': 'Scan QR Attendance',
    'action.generate': 'Generate QR Code',
    'action.publish': 'Publish Official Order',
    'gradebook.title': 'Bologna Gradebook',
    'gradebook.module': 'Advanced Algorithms (CS401)',
    'gradebook.ects': '6 ECTS',
    'gradebook.daily': 'Daily Assessment (40%)',
    'gradebook.final': 'Final Exam (60%)',
    'gradebook.student': 'Student',
    'gradebook.midterm': 'Midterm',
    'gradebook.quizzes': 'Quizzes',
    'gradebook.total': 'Total',
    'gradebook.publish_grades': 'Publish to IQ LEARN',
    'gradebook.at_risk': 'At-Risk Students',
    'gradebook.export': 'Export Sheet',
    'analytics.title': 'Department Analytics',
    'analytics.pass_rate': 'Pass Rate',
    'analytics.active_staff': 'Active Staff',
    'analytics.workload': 'Staff Workload (Hours/Week)',
    'analytics.bologna_tracker': 'Bologna ECTS Tracker',
    'analytics.audit_watchlist': 'Audit Watchlist',
    'analytics.export_report': 'Export Report',
    'courses.title': 'My Courses',
    'grades.title': 'My Grades',
    'lectures.title': 'My Lectures',
    'attendance.title': 'Attendance Management',
    'staff.title': 'Staff Directory & Workload',
    'approvals.title': 'Pending Approvals',
    'schedule.title': 'Weekly Schedule',
    'schedule.sunday': 'Sunday',
    'schedule.monday': 'Monday',
    'schedule.tuesday': 'Tuesday',
    'schedule.wednesday': 'Wednesday',
    'schedule.thursday': 'Thursday',
    'scan.title': 'QR Attendance',
    'scan.instruction': 'Point your camera at the QR code displayed by your lecturer.',
    'scan.simulating': 'Scanning...',
    'scan.success': 'Attendance Recorded!',
    'scan.success_desc': 'You have been marked present for Data Structures.',
    'scan.back': 'Back to Dashboard',
  },
  ar: {
    'app.title': 'المساعد الأكاديمي سومر',
    'role.student': 'طالب',
    'role.lecturer': 'تدريسي',
    'role.admin': 'رئيس القسم',
    'nav.dashboard': 'لوحة القيادة',
    'nav.courses': 'مقرراتي',
    'nav.grades': 'الدرجات',
    'nav.schedule': 'الجدول',
    'nav.lectures': 'محاضراتي',
    'nav.gradebook': 'سجل الدرجات',
    'nav.attendance': 'الغيابات',
    'nav.analytics': 'تحليلات القسم',
    'nav.staff': 'عبء الكادر',
    'nav.approvals': 'الموافقات المعلقة',
    'nav.scan': 'مسح QR',
    'nav.quizzes': 'الاختبارات والامتحانات',
    'nav.financials': 'المالية والحسابات',
    'nav.library': 'إدارة المكتبة',
    'nav.housing': 'السكن والحياة الجامعية',
    'nav.careers': 'الخدمات المهنية',
    'nav.admissions': 'القبول والتسجيل',
    'nav.support': 'الدعم والتواصل',
    'nav.research': 'البحث والابتكار',
    'nav.faculty_hr': 'شؤون وأداء أعضاء التدريس',
    'nav.governance': 'الحوكمة وضمان الجودة',
    'nav.health': 'الصحة والعافية',
    'nav.alumni': 'الخريجون والتبرعات',
    'nav.procurement': 'المشتريات وإدارة الأصول',
    'demo.controls': 'أدوات العرض',
    'greeting.student': 'صباح الخير ياسر. لديك محاضرتان اليوم.',
    'greeting.lecturer': 'مرحباً بعودتك. لديك سجل درجات واحد معلق.',
    'greeting.admin': 'نظرة عامة على القسم: نسبة الحضور 85٪ عبر 4 وحدات.',
    'stat.gpa': 'المعدل التراكمي',
    'stat.attendance': 'نسبة الحضور',
    'stat.credits': 'الوحدات المكتسبة',
    'stat.lectures': 'محاضرات اليوم',
    'stat.pending': 'المهام المعلقة',
    'stat.students': 'إجمالي الطلاب',
    'action.scan': 'مسح رمز الحضور',
    'action.generate': 'توليد رمز الاستجابة',
    'action.publish': 'إصدار أمر إداري',
    'gradebook.title': 'سجل درجات بولونيا',
    'gradebook.module': 'الخوارزميات المتقدمة (CS401)',
    'gradebook.ects': '6 وحدات ECTS',
    'gradebook.daily': 'السعي السنوي (40%)',
    'gradebook.final': 'الامتحان النهائي (60%)',
    'gradebook.student': 'الطالب',
    'gradebook.midterm': 'النصف فصلي',
    'gradebook.quizzes': 'الاختبارات',
    'gradebook.total': 'المجموع',
    'gradebook.publish_grades': 'نشر إلى IQ LEARN',
    'gradebook.at_risk': 'الطلاب المعرضون للخطر',
    'gradebook.export': 'تصدير السجل',
    'analytics.title': 'تحليلات القسم',
    'analytics.pass_rate': 'نسبة النجاح',
    'analytics.active_staff': 'الكادر الفعال',
    'analytics.workload': 'عبء الكادر (ساعة/أسبوع)',
    'analytics.bologna_tracker': 'متتبع وحدات بولونيا',
    'analytics.audit_watchlist': 'قائمة المراقبة والتدقيق',
    'analytics.export_report': 'تصدير التقرير',
    'courses.title': 'مقرراتي الدراسية',
    'grades.title': 'سجل الدرجات',
    'lectures.title': 'محاضراتي',
    'attendance.title': 'إدارة الحضور',
    'staff.title': 'دليل الكادر والعبء',
    'approvals.title': 'الموافقات المعلقة',
    'schedule.title': 'الجدول الأسبوعي',
    'schedule.sunday': 'الأحد',
    'schedule.monday': 'الإثنين',
    'schedule.tuesday': 'الثلاثاء',
    'schedule.wednesday': 'الأربعاء',
    'schedule.thursday': 'الخميس',
    'scan.title': 'تسجيل الحضور (QR)',
    'scan.instruction': 'وجه الكاميرا نحو رمز الاستجابة السريعة المعروض من قبل الأستاذ.',
    'scan.simulating': 'جاري المسح...',
    'scan.success': 'تم تسجيل الحضور!',
    'scan.success_desc': 'تم تسجيل حضورك في مادة هياكل البيانات.',
    'scan.back': 'العودة للوحة القيادة',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('student');
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ role, setRole, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
