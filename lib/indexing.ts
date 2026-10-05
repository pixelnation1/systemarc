/**
 * Indexing registry for static routes.
 * True means the page has substantive content and may appear in the sitemap.
 * Unknown paths are not indexable unless a caller explicitly opts in.
 */
export const routeIndex = {
  "/": true,
  "/about": true,
  "/work": true,
  "/services": true,
  "/solutions": false,
  "/process": false,
  "/start-a-project": false,
  "/privacy": false,
  "/terms": false,
} as const;

export type StaticRoute = keyof typeof routeIndex;

export function indexableStaticPaths() {
  return (Object.entries(routeIndex) as [StaticRoute, boolean][])
    .filter(([, index]) => index)
    .map(([path]) => path);
}
