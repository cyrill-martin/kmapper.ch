// This composable fetches content from any Directus collection
// For singletons: useContent('collection_name')
// For regular collections: useContent('collection_name', id)
export const useContent = (collection, id = null, extraFields = []) => {
  const { getItems } = useDirectus();
  const { locale } = useI18n();
  const { directusLocale } = useDirectusLocale();
  const { isPreview, getFilter } = usePreview();

  const cacheKey = `${collection}-${id || "singleton"}-${locale.value}-${isPreview.value}-${JSON.stringify(extraFields)}`;

  const { data, pending, error } = useAsyncData(
    cacheKey,
    () =>
      getItems(collection, {
        filter: getFilter(id),
        fields: ["*", "translations.*", ...extraFields],
        deep: {
          translations: {
            _filter: { languages_code: { _eq: directusLocale.value } },
          },
        },
        limit: 1,
      }),
    { dedupe: "defer" }, // reuse cached result during SSR→CSR hydration
  );
  const content = computed(() =>
    Array.isArray(data.value) ? data.value[0] : data.value,
  );
  return { content, pending, error };
};
