import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Screenshot slots for a case study.
 *
 * Drop real images in `public/images/work/{directory}/`.
 * Directories: reviewforge, repairforge, pixelnation.
 *
 * A file is used when its name starts with a slot:
 * hero, desktop, mobile, detail.
 * Examples: hero.webp, desktop.png, desktop-02.png, mobile-01.jpg, detail-01.webp.
 * Extensions: png, jpg, jpeg, webp, avif.
 *
 * Anything else, including .gitkeep, is ignored.
 * No image is generated. An empty slot stays an architectural placeholder.
 */
export const shotRoles = ["hero", "desktop", "mobile", "detail"] as const;

export type ShotRole = (typeof shotRoles)[number];

export type ProjectShot = {
  role: ShotRole;
  src: string;
  file: string;
};

const extensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

function roleOf(file: string): ShotRole | null {
  const lower = file.toLowerCase();
  return shotRoles.find((role) => lower.startsWith(role)) ?? null;
}

export function listProjectShots(directory: string): ProjectShot[] {
  const dir = join(process.cwd(), "public", "images", "work", directory);

  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .flatMap((file) => {
      const dot = file.lastIndexOf(".");
      const extension = dot >= 0 ? file.slice(dot).toLowerCase() : "";
      const role = roleOf(file);

      if (!role || !extensions.has(extension)) return [];

      return [
        {
          role,
          src: `/images/work/${directory}/${file}`,
          file,
        },
      ];
    })
    .sort((a, b) => {
      const roleOrder = shotRoles.indexOf(a.role) - shotRoles.indexOf(b.role);
      if (roleOrder !== 0) return roleOrder;
      return a.file.localeCompare(b.file);
    });
}

export function shotsByRole(shots: readonly ProjectShot[], role: ShotRole) {
  return shots.filter((shot) => shot.role === role);
}
