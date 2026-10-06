import type { ReactNode } from "react";

export function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-steel py-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-11 items-center text-sm text-warm-white underline decoration-steel underline-offset-4 hover:text-electric-cobalt hover:decoration-cobalt"
        >
          Edit {title}
        </button>
      </div>
      <dl className="mt-4 grid gap-4">{children}</dl>
    </section>
  );
}

export function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.68rem] tracking-[0.14em] text-electric-cobalt uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-6 whitespace-pre-wrap text-silver">
        {value || "Not provided"}
      </dd>
    </div>
  );
}
