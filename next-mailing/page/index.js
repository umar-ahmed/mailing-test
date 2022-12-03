import Link from "next/link";

export default function NextMailingPage({ html, templates }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: "1rem 3rem",
        }}
      >
        <h2>Templates</h2>
        <ul>
          {templates.map((template) => (
            <li key={template.name}>
              <Link
                href={`/mailing/${template.name.replace(/\.jsx$/, "")}`}
                style={{
                  textDecoration: "underline",
                }}
              >
                {template.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <iframe
        style={{
          flex: "1",
          border: "none",
        }}
        srcDoc={html}
      />
    </div>
  );
}
