import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ServicePageView } from "@/components/services/service-page-view";
import { pageGraph, serviceNode } from "@/lib/schema";
import { getService, servicePath, services } from "@/lib/services";
import { createMetadata, siteUrl } from "@/lib/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Services", robots: { index: false, follow: true } };
  }

  return createMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: servicePath(service.slug),
    absoluteTitle: true,
    index: true,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const path = servicePath(service.slug);
  const url = `${siteUrl}${path}`;

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: service.metaTitle,
          description: service.metaDescription,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ],
          mainEntityId: `${url}#service`,
          extra: [
            serviceNode({
              name: service.name,
              description: service.metaDescription,
              url,
            }),
          ],
        })}
      />
      <ServicePageView service={service} />
    </>
  );
}
