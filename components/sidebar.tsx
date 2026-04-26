import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/resume', label: 'Resume Upload' },
  { href: '/matcher', label: 'Job Matcher' },
  { href: '/jobs', label: 'Job Tracker' },
  { href: '/about', label: 'About Us' },
  { href: '/upgrade', label: 'Upgrade' },
];

export function Sidebar() {
  return (
    <aside className="w-full border-r border-border bg-white p-5 md:w-64">
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
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
