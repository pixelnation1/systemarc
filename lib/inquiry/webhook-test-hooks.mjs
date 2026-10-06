import { registerHooks } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootUrl = pathToFileURL(path.resolve(import.meta.dirname, "../..")).href.replace(/\/?$/, "/");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const relative = specifier.slice(2);
      const withExtension = relative.endsWith(".ts") ? relative : `${relative}.ts`;
      return nextResolve(new URL(withExtension, rootUrl).href, context);
    }
    const relative = specifier.startsWith("./") || specifier.startsWith("../");
    const hasExtension = /\.[a-z]+$/i.test(specifier);
    if (relative && !hasExtension) {
      return nextResolve(`${specifier}.ts`, context);
    }
    return nextResolve(specifier, context);
  },
});
