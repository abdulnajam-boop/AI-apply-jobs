import { ReactNode } from 'react';

type CardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Card({ title, description, children }: CardProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm">
      {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}
      {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      <div className={title || description ? 'mt-4' : ''}>{children}</div>
    </section>
  );
}
