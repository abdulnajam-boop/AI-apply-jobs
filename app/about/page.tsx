import { Navbar } from '@/components/navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-10 px-6 py-14">
        <section>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">About Applisynai</h1>
          <p className="mt-4 text-slate-600">
            Applisynai helps job seekers run a focused application process from resume upload to role matching,
            application tailoring, and progress tracking.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">How Applisynai helps</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
            <li>Upload your resume</li>
            <li>Match jobs against your background</li>
            <li>Tailor applications with AI guidance</li>
            <li>Track progress from applied to offer</li>
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Mission</h2>
          <p className="mt-3 text-slate-700">
            We help job seekers create quality applications, not spam auto-apply submissions.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Why Applisynai is different</h2>
          <ul className="mt-4 grid gap-3 text-slate-700 md:grid-cols-2">
            <li className="rounded-lg bg-slate-50 p-3">Human approval before applying</li>
            <li className="rounded-lg bg-slate-50 p-3">Resume-aware matching</li>
            <li className="rounded-lg bg-slate-50 p-3">Better-fit roles</li>
            <li className="rounded-lg bg-slate-50 p-3">Application tracking</li>
            <li className="rounded-lg bg-slate-50 p-3 md:col-span-2">No blind mass applying</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
