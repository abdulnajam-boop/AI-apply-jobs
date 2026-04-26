import { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
