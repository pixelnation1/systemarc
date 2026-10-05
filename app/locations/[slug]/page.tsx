import { contentRoute } from "@/lib/content-route";

const route = contentRoute("locations");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
