import { render } from "mailing-core";
import { cache } from "../shared/cache";

export default function NextMailingAPI() {
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
