import { parse } from "yaml";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing content slug" });
  }

  const raw = await useStorage("assets:content").getItemRaw(`${slug}.yaml`);
  if (!raw) {
    throw createError({
      statusCode: 404,
      statusMessage: `Content not found: ${slug}`,
    });
  }

  return parse(raw.toString());
});
