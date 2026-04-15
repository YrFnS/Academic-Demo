'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from './providers';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Users, 
  FileCheck, 
  BarChart3,
  Globe,
  Settings,
  Bell,
  Menu,
  MapPin,
  CreditCard,
  Home,
  Briefcase,
  ClipboardCheck,
  LifeBuoy,
  Microscope,
  UserCheck,
  Gavel,
  HeartPulse,
  UsersRound,
  PackageSearch
} from 'lucide-react';
import { motion } from 'motion/react';

export function Shell({ children }: { children: React.ReactNode }) {
  const { role, setRole, language, setLanguage, t } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = {
    student: [
      { icon: LayoutDashboard, label: 'nav.dashboard', href: '/' },
      { icon: BookOpen, label: 'nav.courses', href: '/courses' },
      { icon: GraduationCap, label: 'nav.grades', href: '/grades' },
      { icon: Calendar, label: 'nav.schedule', href: '/schedule' },
      { icon: FileCheck, label: 'nav.quizzes', href: '/quizzes' },
      { icon: CreditCard, label: 'nav.financials', href: '/financials' },
      { icon: BookOpen, label: 'nav.library', href: '/library' },
      { icon: Home, label: 'nav.housing', href: '/housing' },
      { icon: Briefcase, label: 'nav.careers', href: '/careers' },
      { icon: ClipboardCheck, label: 'nav.admissions', href: '/admissions' },
      { icon: LifeBuoy, label: 'nav.support', href: '/support' },
      { icon: Microscope, label: 'nav.research', href: '/research' },
      { icon: HeartPulse, label: 'nav.health', href: '/health' },
      { icon: UsersRound, label: 'nav.alumni', href: '/alumni' },
      { icon: MapPin, label: 'Campus Map', href: '/map' },
      { icon: Users, label: 'nav.scan', href: '/scan' },
    ],
    lecturer: [
      { icon: LayoutDashboard, label: 'nav.dashboard', href: '/' },
      { icon: BookOpen, label: 'nav.lectures', href: '/lectures' },
      { icon: FileCheck, label: 'nav.gradebook', href: '/gradebook' },
      { icon: Users, label: 'nav.attendance', href: '/attendance' },
      { icon: FileCheck, label: 'nav.quizzes', href: '/quizzes' },
      { icon: Microscope, label: 'nav.research', href: '/research' },
      { icon: UserCheck, label: 'nav.faculty_hr', href: '/faculty-hr' },
      { icon: Gavel, label: 'nav.governance', href: '/governance' },
      { icon: HeartPulse, label: 'nav.health', href: '/health' },
      { icon: UsersRound, label: 'nav.alumni', href: '/alumni' },
      { icon: PackageSearch, label: 'nav.procurement', href: '/procurement' },
      { icon: MapPin, label: 'Campus Map', href: '/map' },
    ],
    admin: [
      { icon: LayoutDashboard, label: 'nav.dashboard', href: '/' },
      { icon: BarChart3, label: 'nav.analytics', href: '/analytics' },
      { icon: Users, label: 'nav.staff', href: '/staff' },
      { icon: FileCheck, label: 'nav.approvals', href: '/approvals' },
      { icon: Microscope, label: 'nav.research', href: '/research' },
      { icon: UserCheck, label: 'nav.faculty_hr', href: '/faculty-hr' },
      { icon: Gavel, label: 'nav.governance', href: '/governance' },
      { icon: HeartPulse, label: 'nav.health', href: '/health' },
      { icon: UsersRound, label: 'nav.alumni', href: '/alumni' },
      { icon: PackageSearch, label: 'nav.procurement', href: '/procurement' },
      { icon: MapPin, label: 'Campus Map', href: '/map' },
    ]
  };

  const currentNav = navItems[role];

  return (
    <div className="min-h-screen bg-mesh text-slate-900 flex flex-col md:flex-row overflow-hidden relative">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 start-0 z-50 w-64 glass-sidebar text-slate-300 transition-transform duration-300 ease-in-out flex flex-col h-screen ${isMobileMenuOpen ? 'translate-x-0' : 'max-md:-translate-x-full max-md:rtl:translate-x-full'} md:translate-x-0`}>
        <div className="p-6 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-academic-gold flex items-center justify-center text-oxford-blue font-bold text-xl">
            S
          </div>
          <h1 className="font-bold text-lg tracking-tight text-white">{t('app.title')}</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {currentNav.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link key={index} href={item.href} onClick={() => setIsMobileMenuOpen(false)} prefetch={true}>
                <motion.div
                  whileHover={{ scale: 1.02, x: language === 'ar' ? -4 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-academic-gold/20 to-transparent text-academic-gold border-s-2 border-academic-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {t(item.label)}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Demo Controls */}
        <div className="p-4 mt-auto">
          <div className="p-4 rounded-2xl bg-oxford-light/50 border border-oxford-light">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t('demo.controls')}</h3>
            <div className="space-y-2">
              {(['student', 'lecturer', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                    role === r ? 'bg-academic-gold text-oxford-blue font-medium' : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {t(`role.${r}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden relative md:ms-64">
        {/* Topbar */}
        <header className="h-16 glass-panel flex items-center justify-between px-4 md:px-8 z-40 sticky top-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-500 hover:text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Globe className="w-4 h-4 text-academic-gold" />
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-academic-gold rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-academic-gold to-amber-200 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-oxford-blue/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
