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
    `kmapper.ch is the website of kmapper GmbH, a small data consultancy in Basel, Switzerland, founded in 2021 by Cyrill Martin. The company offers Business Analysis, Requirements Engineering, and Development for complete projects or as specialized support for larger teams.`,
    ``,
    `## About kmapper`,
    ``,
    `kmapper specializes in data curation, organization, and publication. The company works with Swiss SMEs, government organizations, and enterprises, creating custom web applications, data visualizations, and documentation solutions.`,
    ``,
    `Tech stack: Directus CMS, Nuxt.js frontend, hosted on Swiss infrastructure (Infomaniak VPS).`,
    ``,
    `## Pages`,
    ``,
    `- [Home](${baseUrl}/en/home): Business Analysis, Requirements Engineering, and Development for complete projects or as specialized support`,
    `- [About](${baseUrl}/en/about): Company information, client list, and founder background`,
    `- [Curation](${baseUrl}/en/curation): Data review, evaluation, and selection services`,
    `- [Organization](${baseUrl}/en/organization): Requirements analysis and data structuring`,
    `- [Publication](${baseUrl}/en/publication): Web solutions, visualizations, and documentation`,
    `- [Projects](${baseUrl}/en/projects): Portfolio of public projects`,
    ``,
    `## Notable Projects`,
    ``,
  ];

  for (const service of services) {
    const t = service.translations?.[0];
    if (t) {
      lines.push(
        `- [${t.title}](${baseUrl}/en/${t.title.toLowerCase()}): ${t.content ?? ""}`,
      );
    }
  }

  for (const project of projects) {
    const t = project.translations?.[0];
    if (t) {
      lines.push(`- ${t.title}: ${t.description ?? ""}`);
    }
  }

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return lines.join("\n");
});
