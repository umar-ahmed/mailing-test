import fs from "node:fs";
import path from "node:path";

const config = {};

const MAILING_CONFIG_FILENAME = "mailing.config.json";

// Load mailing.config.js if it exists
if (fs.existsSync(path.join(process.cwd(), MAILING_CONFIG_FILENAME))) {
  const configFile = fs.readFileSync(
    path.join(process.cwd(), MAILING_CONFIG_FILENAME),
    "utf8"
  );
  Object.assign(config, JSON.parse(configFile));
}

export { config };
