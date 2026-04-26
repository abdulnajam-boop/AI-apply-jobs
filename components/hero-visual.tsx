export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[390px] w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-7 shadow-2xl">
      <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400/80 to-cyan-300/80 blur-2xl" />

      <div className="absolute right-7 top-10 hidden h-24 w-24 rotate-12 rounded-xl border border-white/20 bg-white/10 p-2 text-white shadow-lg backdrop-blur md:block">
        <p className="text-[10px] uppercase tracking-wider text-cyan-200">Match Score</p>
        <p className="mt-2 text-2xl font-bold">91%</p>
      </div>

      <div className="absolute left-7 top-16 hidden w-40 -rotate-6 rounded-xl border border-white/20 bg-white/10 p-3 text-white shadow-lg backdrop-blur md:block">
        <p className="text-xs font-semibold">Resume Card</p>
        <p className="mt-2 text-[11px] text-slate-200">Frontend Engineer · 6 yrs</p>
      </div>

      <div className="absolute bottom-7 left-7 right-7 grid gap-3 sm:grid-cols-2">
        {['Applied · Notion', 'Interview · Stripe', 'Saved · Linear', 'Offer · Figma'].map((item) => (
          <div key={item} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-slate-100 backdrop-blur">
            {item}
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/40" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/50" />

      <div className="flex h-full items-end md:hidden">
        <p className="rounded-lg bg-white/10 px-3 py-2 text-xs text-slate-100 backdrop-blur">
          Mobile fallback: lightweight visual preview of AI match workflow.
        </p>
      </div>
    </div>
  );
}
