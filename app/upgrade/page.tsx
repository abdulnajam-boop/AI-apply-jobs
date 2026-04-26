import Link from 'next/link';
import { Navbar } from '@/components/navbar';

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Upgrade Plans</h1>
        <p className="mt-3 text-slate-600">Start with one free match. Upgrade to Pro for unlimited AI job matching at $9.99/month.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Free Trial</h2>
            <p className="mt-1 text-sm text-slate-500">No payment required</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• 1 free job match</li>
              <li>• Basic resume analysis</li>
              <li>• No payment required</li>
            </ul>
          </section>

          <section className="rounded-xl border-2 border-indigo-500 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Pro</h2>
            <p className="mt-1 text-2xl font-bold text-slate-900">$9.99/month</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Unlimited job matches</li>
              <li>• AI resume tailoring</li>
              <li>• AI cover letters</li>
              <li>• Job tracker</li>
              <li>• Priority features</li>
            </ul>
            <Link href="/signin" className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              Upgrade to Pro
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
