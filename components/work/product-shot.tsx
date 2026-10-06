import Image from "next/image";
import { shotsByRole, type ProjectShot, type ShotRole } from "@/lib/project-shots";

const roleLabels: Record<ShotRole, string> = {
  hero: "Product",
  desktop: "Desktop",
  mobile: "Mobile",
  detail: "Detail",
};

function FrameMarks() {
  const mark = "pointer-events-none absolute size-3 border-cobalt/45";

  return (
    <>
      <span aria-hidden="true" className={`${mark} top-4 left-4 border-t border-l`} />
      <span aria-hidden="true" className={`${mark} top-4 right-4 border-t border-r`} />
      <span aria-hidden="true" className={`${mark} bottom-4 left-4 border-b border-l`} />
      <span aria-hidden="true" className={`${mark} right-4 bottom-4 border-r border-b`} />
    </>
  );
}

export function ProductShot({
  src,
  alt,
  caption,
  ratio = "16 / 10",
  frame = true,
  priority = false,
  sizes = "(min-width: 1024px) 72rem, 100vw",
}: {
  src?: string | null;
  alt: string;
  caption?: string;
  ratio?: string;
  frame?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const shell = frame
    ? "relative w-full overflow-hidden border border-steel bg-graphite"
    : "relative w-full overflow-hidden bg-graphite";

  return (
    <figure>
      {src ? (
        <div className={shell} style={{ aspectRatio: ratio }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain"
          />
          {frame ? <FrameMarks /> : null}
        </div>
      ) : (
        <div
          className={`${shell} flex min-h-64 flex-col justify-between p-6 sm:min-h-72 sm:p-8`}
          style={{ aspectRatio: ratio }}
          role="img"
          aria-label={alt}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-steel) 1px, transparent 1px), linear-gradient(to bottom, var(--color-steel) 1px, transparent 1px)",
              backgroundSize: "3.5rem 3.5rem",
            }}
          />
          {frame ? <FrameMarks /> : null}
          <div className="relative flex items-center justify-between gap-4">
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-electric-cobalt uppercase">
              Product view
            </p>
            <span aria-hidden="true" className="size-1.5 bg-cobalt" />
          </div>
          <p className="relative font-mono text-[0.68rem] tracking-[0.18em] text-silver uppercase">
            Screenshot coming soon
          </p>
        </div>
      )}
      {caption ? (
        <figcaption className="mt-3 font-mono text-[0.68rem] tracking-[0.16em] text-silver uppercase">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

const galleryRoles: {
  role: Exclude<ShotRole, "hero">;
  ratio: string;
  sizes: string;
  layout: string;
}[] = [
  {
    role: "desktop",
    ratio: "16 / 10",
    sizes: "(min-width: 1024px) 72rem, 100vw",
    layout: "col-span-full",
  },
  {
    role: "mobile",
    ratio: "10 / 16",
    sizes: "20rem",
    layout: "col-span-full max-w-xs",
  },
  {
    role: "detail",
    ratio: "4 / 3",
    sizes: "(min-width: 768px) 36rem, 100vw",
    layout: "col-span-full sm:max-w-xl",
  },
];

export function ShotGallery({
  shots,
  name,
}: {
  shots: readonly ProjectShot[];
  name: string;
}) {
  return (
    <div className="mt-12 grid gap-10">
      {galleryRoles.map((slot) => {
        const matches = shotsByRole(shots, slot.role);
        const figures =
          matches.length > 0
            ? matches.map((shot, index) => ({
                key: shot.src,
                src: shot.src,
                caption:
                  matches.length > 1
                    ? `${roleLabels[slot.role]} ${index + 1}`
                    : roleLabels[slot.role],
                alt: `${name} ${roleLabels[slot.role].toLowerCase()} screenshot`,
              }))
            : [
                {
                  key: slot.role,
                  src: null as string | null,
                  caption: roleLabels[slot.role],
                  alt: `${name} ${roleLabels[slot.role].toLowerCase()} screenshot, not yet added`,
                },
              ];

        return (
          <div
            key={slot.role}
            className={
              slot.role === "desktop" ? "grid gap-8" : "grid gap-8 sm:grid-cols-2"
            }
          >
            {figures.map((figure) => (
              <div key={figure.key} className={slot.role === "desktop" ? "min-w-0" : slot.layout}>
                <ProductShot
                  src={figure.src}
                  alt={figure.alt}
                  caption={figure.caption}
                  ratio={slot.ratio}
                  sizes={slot.sizes}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function shotAlt(name: string, role: ShotRole) {
  return `${name} ${roleLabels[role].toLowerCase()} screenshot`;
}

export function shotCaption(role: ShotRole) {
  return roleLabels[role];
}
