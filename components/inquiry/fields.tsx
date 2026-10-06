import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function ValidationMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 text-sm leading-6 text-warm-white">
      {message}
    </p>
  );
}

const controlClass =
  "mt-2 w-full border border-steel bg-carbon px-3 text-base text-warm-white placeholder:text-silver/60 focus-visible:border-cobalt";

export function Field({
  id,
  label,
  hint,
  error,
  required = false,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-field={id}>
      <label htmlFor={id} className="block text-sm text-warm-white">
        {label}
        {required ? <span className="text-silver"> (required)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm leading-6 text-silver">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`${controlClass} h-12`}
        {...props}
      />
      <ValidationMessage id={`${id}-error`} message={error} />
    </div>
  );
}

export function Textarea({
  id,
  label,
  hint,
  error,
  required = false,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-field={id}>
      <label htmlFor={id} className="block text-sm text-warm-white">
        {label}
        {required ? <span className="text-silver"> (required)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm leading-6 text-silver">
          {hint}
        </p>
      ) : null}
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`${controlClass} min-h-36 py-3`}
        {...props}
      />
      <ValidationMessage id={`${id}-error`} message={error} />
    </div>
  );
}
