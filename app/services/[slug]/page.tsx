import { contentRoute } from "@/lib/content-route";

const route = contentRoute("services");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
