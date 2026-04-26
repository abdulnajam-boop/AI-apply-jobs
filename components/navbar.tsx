export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">AI Job Assistant</p>
          <h1 className="text-base font-semibold text-slate-900">Find and track your next role</h1>
        </div>
        <button className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
          Upgrade
        </button>
      </div>
    </header>
  );
}
