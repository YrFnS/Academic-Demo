import type {Metadata} from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/components/providers';
import { Shell } from '@/components/shell';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'Sumer Academic Assistant',
  description: 'University of Baghdad Academic Portal',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" dir="ltr" className={`${cairo.variable}`}>
      <body className="font-sans bg-slate-950 text-slate-50 antialiased selection:bg-amber-500/30" suppressHydrationWarning>
        <AppProvider>
          <Shell>
            {children}
          </Shell>
        </AppProvider>
      </body>
    </html>
  );
}
