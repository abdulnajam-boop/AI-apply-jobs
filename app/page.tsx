import Link from 'next/link';

const howItWorks = [
  {
    title: '1. Upload your resume',
    description: 'Start with your existing resume and instantly create a base profile for every role you target.',
  },
  {
    title: '2. Match each role',
    description: 'Paste job descriptions to see fit signals and tailor your applications with focused improvements.',
  },
  {
    title: '3. Track every application',
    description: 'Stay on top of statuses, interviews, and follow-ups from one clean dashboard.',
  },
];

const features = [
  {
    title: 'Resume-aware matching',
    description: 'Understand role fit against your actual experience before you apply.',
  },
  {
    title: 'Application pipeline view',
    description: 'Keep every company, role, and status in one organized tracker.',
  },
  {
    title: 'Focused workflow',
    description: 'Move from role discovery to action without juggling tabs or spreadsheets.',
  },
  {
    title: 'Built for quality over spam',
    description: 'Prioritize better-fit applications instead of mass auto-submits.',
  },
];

const comparisons = [
  {
    label: 'Application quality',
    thisProduct: 'Context-aware and role-specific',
    autoApply: 'Generic one-click submissions',
  },
  {
    label: 'Control',
    thisProduct: 'You approve and refine before applying',
    autoApply: 'Limited oversight once automation runs',
  },
  {
    label: 'Tracking',
    thisProduct: 'Centralized dashboard with clear statuses',
    autoApply: 'Scattered history across tools',
  },
];

export default function LandingPage() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="rounded-2xl border border-border bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">AI Job Assistant</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
            Land better jobs faster with AI that actually applies smart — not blindly.
          </h1>
          <p className="mt-5 max-w-3xl text-base text-slate-600 md:text-lg">
            Upload your resume, match it against real job descriptions, and track every application in one place so
            you can focus on quality opportunities and move through your search with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Start Free Demo
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Explore Product Tour
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold md:text-3xl">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {howItWorks.map((item) => (
              <article key={item.title} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold md:text-3xl">Built for modern job seekers</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold md:text-3xl">Try the matcher demo</h2>
          <p className="mt-2 text-sm text-slate-600">
            Paste a job description to preview how the assistant helps you evaluate fit (UI-only mock).
          </p>
          <textarea
            className="mt-5 min-h-40 w-full rounded-lg border border-border p-3 text-sm"
            placeholder="Paste a job description here to see how matching would begin..."
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/matcher" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
              Open Full Matcher
            </Link>
            <Link href="/resume" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Upload Resume First
            </Link>
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold md:text-3xl">Why this beats generic auto-apply tools</h2>
          <div className="mt-5 overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700">Category</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">AI Job Assistant</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Auto-apply tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisons.map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.label}</td>
                    <td className="px-4 py-3 text-slate-700">{row.thisProduct}</td>
                    <td className="px-4 py-3 text-slate-600">{row.autoApply}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/login" className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              Create Your Workspace
            </Link>
            <Link href="/jobs" className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              See Tracker Demo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
