import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/upgrade', label: 'Upgrade' },
  { href: '/signin', label: 'Sign In' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-lg font-black text-white shadow-md">
            A
          </div>
          <div>
            <p className="text-base font-bold text-slate-900">Applisynai</p>
            <p className="text-xs text-slate-500">Smarter job matching. Better applications.</p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <nav className="flex flex-wrap gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/signin"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
