import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">This is a mock login for the MVP interface.</p>
        <form className="mt-6 space-y-4">
          <input className="w-full rounded-lg border border-border px-3 py-2" type="email" placeholder="Email" />
          <input className="w-full rounded-lg border border-border px-3 py-2" type="password" placeholder="Password" />
          <Link href="/dashboard" className="block w-full rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white">
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
