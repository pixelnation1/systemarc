import type { ReactNode, Ref } from "react";
import { inquirySteps } from "@/lib/inquiry/model";

export function ProgressIndicator({
  current,
  reached,
  onSelect,
}: {
  current: number;
  reached: number;
  onSelect: (step: number) => void;
}) {
  const step = inquirySteps[current];

  return (
    <div>
      <ol aria-label="Inquiry progress" className="grid grid-cols-6 gap-2">
        {inquirySteps.map((item, index) => {
          const active = index === current;
          const complete = index <= reached && !active;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={active ? "step" : undefined}
                aria-label={`${item.label}${complete ? ", completed" : active ? ", current step" : ""}`}
                disabled={index > reached}
                onClick={() => onSelect(index)}
                className="group flex min-h-11 w-full items-center text-left disabled:cursor-default md:block md:min-h-0"
              >
                <span
                  className={`block h-1 w-full ${
                    active || complete ? "bg-cobalt" : "bg-steel"
                  }`}
                />
                <span className="mt-2 hidden font-mono text-[0.62rem] tracking-[0.12em] text-silver uppercase md:block">
                  <span className={active ? "text-electric-cobalt" : ""}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[0.68rem] tracking-[0.08em] text-warm-white normal-case">
                    {item.label}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 font-mono text-xs tracking-[0.16em] text-electric-cobalt uppercase md:hidden">
        {String(current + 1).padStart(2, "0")} / {String(inquirySteps.length).padStart(2, "0")}{" "}
        {step?.label}
      </p>
    </div>
  );
}

export function FormStep({
  id,
  title,
  intro,
  headingRef,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  headingRef?: Ref<HTMLHeadingElement>;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-10">
      <h2
        id={id}
        ref={headingRef}
        tabIndex={-1}
        className="max-w-[16em] font-serif text-3xl leading-tight tracking-[-0.02em] text-warm-white sm:text-4xl"
      >
        {title}
      </h2>
      {intro ? <p className="mt-4 max-w-2xl text-base leading-7 text-silver">{intro}</p> : null}
      <div className="mt-8 grid max-w-2xl gap-6">{children}</div>
    </section>
  );
}
