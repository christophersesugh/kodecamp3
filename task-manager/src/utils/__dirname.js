import url from "node:url";
import path from "node:path";

function __dirname(metaUrl) {
  const currentModulePath = url.fileURLToPath(metaUrl);
  const currentDirectory = path.dirname(currentModulePath);
  return currentDirectory;
}

export { __dirname };
