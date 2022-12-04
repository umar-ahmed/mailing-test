import fs from "node:fs";
import { config } from "./config";

const cache = {};

// Populate cache
if (config.emailsDir && fs.existsSync(config.emailsDir)) {
  const regex = new RegExp(`^${config.emailsDir}\\/([^\\/]*)\\.[jt]sx$`);

  const requireContext = require.context(
    "../../",
    true,
    /^\.\/(?!node_modules\/).*\.[jt]sx$/
  );

  for (const entry of requireContext.keys()) {
    const match = entry.match(regex);
    if (!match) {
      continue;
    }

    const [_, name] = match;

    cache[name] = {
      name,
      path: entry,
      Component: requireContext(entry).default,
    };
  }
}

export { cache };
