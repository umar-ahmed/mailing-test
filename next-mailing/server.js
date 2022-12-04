import { render } from "mailing-core";

export function createNextMailing(requireContext) {
  const cache = {};

  // Populate cache
  const regex = /^\.\/([^\/]*)\.[jt]sx$/;

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

  return {
    async handler(req, res) {
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
    },
    async getServerSideProps(context) {
      const templates = Object.values(cache).map((template) => ({
        name: template.name,
        path: template.path,
      }));

      const [name] = context.params.nextmailing ?? [];
      const entry = cache[name ?? templates?.[0]?.name];

      if (!entry) {
        return {
          notFound: true,
        };
      }

      const { html } = render(<entry.Component />);

      return {
        props: {
          templates,
          html,
        },
      };
    },
  };
}
