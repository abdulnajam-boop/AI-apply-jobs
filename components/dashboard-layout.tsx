'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { getAuthUser } from '@/lib/auth';

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const authUser = getAuthUser();
    if (!authUser) {
      router.replace('/signin');
      return;
    }

    setIsAuthorized(true);
  }, [router, pathname]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-500">Checking authentication...</div>
      </div>
    );
  }

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
