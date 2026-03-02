export const useCollection = (collection, extraFields = []) => {
  const { getItems } = useDirectus();
  const { locale } = useI18n();
  const { directusLocale } = useDirectusLocale();
  const { isPreview } = usePreview();
  const cacheKey = `${collection}-all-${locale.value}-${isPreview.value}-${JSON.stringify(extraFields)}`;
  const { data, pending, error } = useAsyncData(
    cacheKey,
    () =>
      getItems(collection, {
        filter: isPreview.value ? {} : { status: { _eq: "published" } },
        fields: ["*", "translations.*", ...extraFields],
        deep: {
          translations: {
            _filter: { languages_code: { _eq: directusLocale.value } },
          },
        },
        sort: ["sort"],
      }),
    { dedupe: "defer" },
  );
  return { items: data, pending, error };
};
