import { Navbar } from '@/components/navbar';

const valueCards = [
  {
    title: 'Resume-aware matching',
    description: 'Every match starts with your real experience so recommendations stay relevant and high signal.',
  },
  {
    title: 'Application tailoring',
    description: 'Generate stronger role-specific resumes and cover letters before you submit.',
  },
  {
    title: 'Progress tracking',
    description: 'Track every application stage from saved to interview to offer in one clear workflow.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-8 px-6 py-14">
        <section className="rounded-xl border border-border bg-white p-7 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">About Applisynai</h1>
          <p className="mt-4 text-slate-600">
            Applisynai helps job seekers run a focused application process from resume upload to role matching,
            application tailoring, and progress tracking.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {valueCards.map((card) => (
            <article key={card.title} className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </article>
          ))}
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
