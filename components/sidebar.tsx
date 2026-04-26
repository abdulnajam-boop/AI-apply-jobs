import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/resume', label: 'Resume Upload' },
  { href: '/matcher', label: 'Job Matcher' },
  { href: '/jobs', label: 'Job Tracker' },
];

export function Sidebar() {
  return (
    <aside className="w-full border-r border-border bg-white p-5 md:w-64">
      <Link href="/" className="block pb-6 text-lg font-bold text-slate-900">
        applyAI
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
