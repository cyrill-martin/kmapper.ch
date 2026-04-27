import { createDirectus, rest, readItems, readSingleton } from "@directus/sdk";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const client = createDirectus(config.directusUrl).with(rest());

  const [home, about, services, projects] = await Promise.all([
    client.request(
      readSingleton("home", {
        fields: ["translations.content"],
        deep: {
          translations: { _filter: { languages_code: { _eq: "en-US" } } },
        },
      }),
    ),

    client.request(
      readSingleton("about", {
        fields: ["translations.title"],
        deep: {
          translations: { _filter: { languages_code: { _eq: "en-US" } } },
        },
      }),
    ),

    client.request(
      readItems("services", {
        fields: ["translations.title", "translations.content"],
        deep: {
          translations: { _filter: { languages_code: { _eq: "en-US" } } },
        },
      }),
    ),

    client.request(
      readItems("projects", {
        fields: ["translations.title", "translations.description"],
        deep: {
          translations: { _filter: { languages_code: { _eq: "en-US" } } },
        },
      }),
    ),
  ]);

  const baseUrl = process.env.NUXT_PUBLIC_BASE_URL ?? "https://kmapper.ch";

  const lines: string[] = [
    `# kmapper.ch`,
    ``,
    `kmapper.ch is the site of Cyrill Martin's company kmapper GmbH — Cyrill is a Technical Consultant offering Business Analysis, Requirements Engineering, and Development.`,
    ``,
    `## Pages`,
    ``,
    `- [Home](${baseUrl}/en/home): ${home.translations?.[0]?.content ?? ""}`,
    `- [About](${baseUrl}/en/about): ${about.translations?.[0]?.title ?? ""}`,
  ];

  for (const service of services) {
    const t = service.translations?.[0];
    if (t) {
      lines.push(
        `- [${t.title}](${baseUrl}/en/${t.title.toLowerCase()}): ${t.content ?? ""}`,
      );
    }
  }

  lines.push(``, `## [Projects](${baseUrl}/en/projects)`, ``);

  for (const project of projects) {
    const t = project.translations?.[0];
    if (t) {
      lines.push(`- ${t.title}: ${t.description ?? ""}`);
    }
  }

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return lines.join("\n");
});
