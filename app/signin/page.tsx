import Link from 'next/link';
import { Navbar } from '@/components/navbar';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex max-w-md items-center px-6 py-14">
        <section className="w-full rounded-xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Sign in to Applisynai</h1>
          <p className="mt-2 text-sm text-slate-500">UI-only auth flow for MVP. Sign-in actions route to dashboard for now.</p>

          <form className="mt-6 space-y-4">
            <input className="w-full rounded-lg border border-border px-3 py-2" type="email" placeholder="Email" />
            <input className="w-full rounded-lg border border-border px-3 py-2" type="password" placeholder="Password" />
            <Link
              href="/dashboard"
              className="block w-full rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Sign In
            </Link>
          </form>

          <Link
            href="/dashboard"
            className="mt-4 block w-full rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold text-slate-700"
          >
            Continue with Google
          </Link>

          <p className="mt-4 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-600">
              Sign up
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
