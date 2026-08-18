// Fetches a page's content from content/<slug>.yaml (via server/api/content)
// and resolves every { de, en } node to the current locale.
const TRANSLATABLE_LOCALES = ["de", "en"];

function localize(node, locale) {
  if (Array.isArray(node)) {
    return node.map((item) => localize(item, locale));
  }

  if (node && typeof node === "object") {
    const keys = Object.keys(node);
    const isTranslated =
      keys.length > 0 && keys.every((key) => TRANSLATABLE_LOCALES.includes(key));

    if (isTranslated) {
      return node[locale] ?? node[TRANSLATABLE_LOCALES.find((l) => l in node)];
    }

    return Object.fromEntries(
      keys.map((key) => [key, localize(node[key], locale)]),
    );
  }

  return node;
}

export const useContent = (slug) => {
  const { locale } = useI18n();

  const { data, pending, error } = useAsyncData(`content-${slug}`, () =>
    $fetch(`/api/content/${slug}`),
  );

  const content = computed(() =>
    data.value ? localize(data.value, locale.value) : null,
  );

  return { content, pending, error };
};
