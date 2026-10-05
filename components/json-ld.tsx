import { pageGraph, type Breadcrumb } from "@/lib/schema";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function PageSchema({
  path,
  name,
  description,
  breadcrumbs,
}: {
  path: string;
  name: string;
  description: string;
  breadcrumbs: readonly Breadcrumb[];
}) {
  return (
    <JsonLd
      data={pageGraph({
        path,
        name,
        description,
        breadcrumbs,
      })}
    />
  );
}
