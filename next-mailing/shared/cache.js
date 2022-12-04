import fs from "node:fs";
import { config } from "./config";

const cache = {};

console.log({ config });

const context = require.context(
  "../../",
  true,
  /^\.\/(?!node_modules\/).*\.[jt]sx$/
);

console.log("context", context.keys());

console.log(config.emailsDir);
console.log(fs.existsSync(config.emailsDir));
console.log(fs.readdirSync("./"));

// Populate cache
if (config.emailsDir && fs.existsSync(config.emailsDir)) {
  const regex = new RegExp(`^${config.emailsDir}\\/([^\\/]*)\\.[jt]sx$`);

  for (const entry of context.keys()) {
    const match = entry.match(regex);
    if (!match) {
      continue;
    }

    const [_, name] = match;

    cache[name] = {
      name,
      path: entry,
      Component: context(entry).default,
    };
  }
}

export { cache };
