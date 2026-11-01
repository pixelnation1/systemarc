import { AgencyHome } from "@/components/home/agency-home";
import { PageSchema } from "@/components/json-ld";
import { createMetadata, siteDescription, siteTitle } from "@/lib/site";
export const metadata = createMetadata({ title: siteTitle, description: siteDescription, path: "/", absoluteTitle: true, index: true });
export default function HomePage() {
  return <><PageSchema path="/" name={siteTitle} description={siteDescription} breadcrumbs={[{ name: "Home", path: "/" }]} /><AgencyHome /></>;
}
