import type { ReactNode } from "react";
import { ValidationMessage } from "@/components/inquiry/fields";

const optionClass = (selected: boolean) =>
  `flex min-h-12 cursor-pointer items-start gap-3 border px-3 py-3 text-sm leading-6 transition-colors duration-150 ${
    selected
      ? "border-cobalt bg-slate text-warm-white"
      : "border-steel bg-carbon text-silver hover:border-cobalt hover:text-warm-white"
  }`;

export function ChoiceGroup({
  id,
  legend,
  hint,
  error,
  required = false,
  children,
}: {
  id: string;
  legend: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <fieldset data-field={id} aria-describedby={describedBy || undefined} aria-invalid={error ? true : undefined}>
      <legend className="text-sm text-warm-white">
        {legend}
        {required ? <span className="text-silver"> (required)</span> : null}
      </legend>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 max-w-2xl text-sm leading-6 text-silver">
          {hint}
        </p>
      ) : null}
      <div className="mt-3 grid gap-2">{children}</div>
      <ValidationMessage id={`${id}-error`} message={error} />
    </fieldset>
  );
}

export function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <label className={optionClass(checked)}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="mt-1 size-4 accent-cobalt"
      />
      <span>{label}</span>
    </label>
  );
}

export function MultiSelect({
  id,
  legend,
  hint,
  error,
  options,
  selected,
  onChange,
}: {
  id: string;
  legend: string;
  hint?: string;
  error?: string;
  options: readonly string[];
  selected: readonly string[];
  onChange: (next: string[]) => void;
}) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
      return;
    }
    onChange([...selected, option]);
  }

  return (
    <ChoiceGroup id={id} legend={legend} hint={hint} error={error}>
      {options.map((option) => {
        const checked = selected.includes(option);
        return (
          <label key={option} className={optionClass(checked)}>
            <input
              type="checkbox"
              name={id}
              value={option}
              checked={checked}
              onChange={() => toggle(option)}
              className="mt-1 size-4 accent-cobalt"
            />
            <span>{option}</span>
          </label>
        );
      })}
    </ChoiceGroup>
  );
}
