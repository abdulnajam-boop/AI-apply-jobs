import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-600">AI Job Assistant</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
        Run your modern job search in one clean workspace.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">
        Upload your resume, compare fit against job descriptions, and track every application with a lightweight
        dashboard built for focus.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/login" className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
          Get Started
        </Link>
        <Link href="/dashboard" className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-slate-700">
          View Demo Dashboard
        </Link>
      </div>
    </div>
  );
}
