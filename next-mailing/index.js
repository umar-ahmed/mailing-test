import { render } from "mailing-core";

export function NextMailing() {
  const cache = {};

  // Populate cache
  const allEntries = require.context("emails/", false, /\.jsx$/);
  for (const entry of allEntries.keys()) {
    if (entry.startsWith("./")) {
      continue;
    }
    const [_, name] = entry.match(/\/(.*)\.jsx$/);
    cache[name] = {
      name,
      path: entry,
      Component: allEntries(entry).default,
    };
  }

  return async function handler(req, res) {
    const { nextmailing } = req.query;
    const [action, ...rest] = nextmailing;

    if (action === "preview") {
      const [name] = rest;
      const entry = cache[name];
      if (!entry) {
        res.status(404).send("Not found");
        return;
      }
      const { html } = render(<entry.Component />);
      res.send(html);
    } else if (action === "list") {
      res.send(Object.values(cache).map((entry) => entry.name));
    } else {
      res.status(404).send("Not found");
    }
  };
}
