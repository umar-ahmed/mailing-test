export const cache = {};

// Populate cache
const requireContext = require.context("emails/", false, /\.jsx$/);
for (const entry of requireContext.keys()) {
  if (entry.startsWith("./")) {
    continue;
  }
  const [_, name] = entry.match(/\/(.*)\.jsx$/);
  cache[name] = {
    name,
    path: entry,
    Component: requireContext(entry).default,
  };
}
