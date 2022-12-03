import { render } from "mailing-core";
import { cache } from "../shared/cache";

export async function getServerSideProps(context) {
  const templates = Object.values(cache).map((template) => ({
    name: template.name,
    path: template.path,
  }));

  const [name] = context.params.nextmailing ?? [];
  const entry = cache[name ?? templates[0].name];
  const { html } = render(<entry.Component />);

  return {
    props: {
      templates,
      html,
    },
  };
}
