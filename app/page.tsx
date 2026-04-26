import Link from 'next/link';
import { HeroVisual } from '@/components/hero-visual';
import { Navbar } from '@/components/navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Applisynai</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Apply smarter and land better jobs with AI-powered matching.
            </h1>
            <p className="mt-5 text-base text-slate-600 md:text-lg">
              Applisynai analyzes your resume, compares it with real job descriptions, and helps you apply with
              precision — not spam.
            </p>
            <p className="mt-4 text-sm font-medium text-indigo-700">
              One free match included. Upgrade anytime for unlimited AI job matching.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signin" className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
                Get Started
              </Link>
              <Link href="/upgrade" className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                View Pricing
              </Link>
            </div>
            <p className="mt-5 text-sm text-slate-500">1 free AI job match included. Pro unlocks unlimited matches for $9.99/month.</p>
          </div>
          <HeroVisual />
        </section>
      </main>
    </div>
  );
}
