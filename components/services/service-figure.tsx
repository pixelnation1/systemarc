import type { ReactNode } from "react";
import type { ServiceLayout } from "@/lib/services";

function Frame({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="border border-steel bg-graphite px-5 py-6 sm:px-6 sm:py-8">
      <p className="font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
        {label}
      </p>
      <div className="mt-6">{children}</div>
      <figcaption className="mt-6 border-t border-steel pt-4 text-sm leading-6 text-silver">
        {caption}
      </figcaption>
    </figure>
  );
}

function Node({
  title,
  detail,
  emphasis = false,
}: {
  title: string;
  detail: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`border px-3 py-3 ${emphasis ? "border-cobalt bg-carbon" : "border-steel bg-slate"}`}
    >
      <p className="font-serif text-lg tracking-[-0.02em] text-warm-white">{title}</p>
      <p className="mt-1 text-sm leading-5 text-silver">{detail}</p>
    </div>
  );
}

function StackFigure() {
  return (
    <Frame
      label="System stack"
      caption="New software coordinates the operation. Existing tools stay where they already work."
    >
      <div className="space-y-3">
        <Node title="Operation" detail="Workflow, people, and rules" emphasis />
        <div aria-hidden="true" className="mx-auto h-4 w-px bg-cobalt" />
        <Node title="Custom software" detail="The place the work is coordinated" emphasis />
        <div className="grid grid-cols-3 gap-2">
          {["Payments", "Accounting", "Messages"].map((label) => (
            <div key={label} className="border border-steel px-2 py-2 text-center text-xs text-silver">
              {label}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function CautionFigure() {
  return (
    <Frame
      label="What to automate"
      caption="Automate a defined mechanical step. Leave an undefined decision with a person."
    >
      <ol className="space-y-3">
        <li className="flex items-start gap-3">
          <span className="mt-1 size-2 shrink-0 bg-cobalt" aria-hidden="true" />
          <div>
            <p className="text-sm text-warm-white">Status copied between systems</p>
            <p className="font-mono text-[0.68rem] tracking-[0.14em] text-electric-cobalt uppercase">
              Automate
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 size-2 shrink-0 border border-steel" aria-hidden="true" />
          <div>
            <p className="text-sm text-warm-white">A decision the business has not defined</p>
            <p className="font-mono text-[0.68rem] tracking-[0.14em] text-silver uppercase">
              Leave with a person
            </p>
          </div>
        </li>
      </ol>
    </Frame>
  );
}

function ContrastFigure() {
  return (
    <Frame
      label="Two different jobs"
      caption="A website explains the company. A web application carries the work."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border border-steel p-3">
          <p className="font-mono text-[0.68rem] tracking-[0.14em] text-silver uppercase">
            Website
          </p>
          <div className="mt-3 space-y-2">
            <div className="h-2 w-2/3 bg-steel" />
            <div className="h-2 w-full bg-slate" />
            <div className="h-2 w-5/6 bg-slate" />
          </div>
        </div>
        <div className="border border-cobalt bg-carbon p-3">
          <p className="font-mono text-[0.68rem] tracking-[0.14em] text-electric-cobalt uppercase">
            Application
          </p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between border border-steel px-2 py-1 text-xs text-silver">
              <span>Signed in</span>
              <span className="size-1.5 bg-cobalt" aria-hidden="true" />
            </div>
            <div className="border border-steel px-2 py-1 text-xs text-warm-white">
              Next action
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function ConnectFigure() {
  const nodes = ["CRM", "Operations", "Accounting"];

  return (
    <Frame
      label="Shared fact"
      caption="An integration moves a fact between systems so a person does not have to."
    >
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {nodes.map((node, index) => (
          <li key={node} className="flex items-center gap-2 sm:contents">
            <span className="border border-steel bg-slate px-3 py-3 text-sm text-warm-white sm:flex-1 sm:text-center">
              {node}
            </span>
            {index < nodes.length - 1 ? (
              <span aria-hidden="true" className="h-4 w-px bg-cobalt sm:h-px sm:w-4" />
            ) : null}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function ReviewFigure() {
  const steps = [
    { title: "Suggestion", detail: "The model proposes" },
    { title: "Review", detail: "A person checks" },
    { title: "Action", detail: "The record changes" },
  ];

  return (
    <Frame
      label="Human review"
      caption="Model output is proposed work. A person remains responsible for the result."
    >
      <ol className="space-y-0">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-3 pb-5 last:pb-0">
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-4 left-[0.3rem] h-[calc(100%-0.25rem)] w-px bg-steel"
              />
            ) : null}
            <span
              aria-hidden="true"
              className={`relative z-10 mt-1.5 size-2.5 shrink-0 ${index === 1 ? "bg-cobalt" : "border border-cobalt bg-carbon"}`}
            />
            <div>
              <p className="text-sm text-warm-white">{step.title}</p>
              <p className="text-sm text-silver">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function PathFigure() {
  const steps = ["Request", "Status", "Message"];

  return (
    <Frame
      label="Customer path"
      caption="The customer sees the same work the business is already tracking."
    >
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2 sm:contents">
            <span className="border border-cobalt bg-carbon px-3 py-2 font-serif text-lg text-warm-white">
              {step}
            </span>
            {index < steps.length - 1 ? (
              <span aria-hidden="true" className="h-4 w-px bg-cobalt sm:h-px sm:w-6" />
            ) : null}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function OperationsFigure() {
  return (
    <Frame
      label="One operation"
      caption="Each role gets the view their job needs. The record stays shared."
    >
      <div className="grid gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Node title="Desk" detail="Today's queue" />
          <Node title="Lead" detail="Exceptions" />
        </div>
        <Node title="Shared record" detail="The work, its status, and its history" emphasis />
      </div>
    </Frame>
  );
}

const figures = {
  stack: StackFigure,
  caution: CautionFigure,
  contrast: ContrastFigure,
  connect: ConnectFigure,
  review: ReviewFigure,
  path: PathFigure,
  operations: OperationsFigure,
} as const;

export function ServiceFigure({ layout }: { layout: ServiceLayout }) {
  const Figure = figures[layout];
  return <Figure />;
}
