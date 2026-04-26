'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clearAuthUser } from '@/lib/auth';

const coreLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/resume', label: 'Resume Upload' },
  { href: '/jobs', label: 'Job Tracker' },
];

const aiToolsLinks = [
  { href: '/matcher', label: 'Job Matcher' },
  { href: '/resume', label: 'Resume Scanner' },
  { href: '/resume-builder', label: 'Resume Builder' },
  { href: '/cover-letter', label: 'Cover Letter Builder' },
  { href: '/interview', label: 'Interview Buddy' },
  { href: '/jobs', label: 'Auto Apply Tracker' },
];

export function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthUser();
    router.push('/');
  };

  return (
    <aside className="w-full border-r border-border bg-white p-5 md:w-72">
      <Link href="/" className="flex items-center gap-3 pb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-sm font-black text-white">
          A
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Applisynai</p>
          <p className="text-[11px] text-slate-500">Smarter job matching.</p>
        </div>
      </Link>

      <nav className="space-y-2">
        {coreLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 border-t border-border pt-5">
        <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">AI Tools</h3>
        <nav className="mt-2 space-y-2">
          {aiToolsLinks.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 w-full rounded-lg border border-border px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Logout
      </button>
    </aside>
  );
}
