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
          <svg
            width="42"
            height="42"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="16" fill="#0F172A" />
            <path
              d="M18 47L31.5 15C32.2 13.4 34.5 13.4 35.2 15L48.5 47H40.5L37.8 40H28.4L25.7 47H18Z"
              fill="url(#paint0_linear_nav)"
            />
            <path d="M30.8 33.5H35.4L33.1 27.4L30.8 33.5Z" fill="#0F172A" />
            <defs>
              <linearGradient id="paint0_linear_nav" x1="18" y1="15" x2="49" y2="47" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A855F7" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
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
