export const useDirectusLocale = () => {
  const { locale } = useI18n();

  const localeMap = {
    de: "de-DE",
    en: "en-US",
  };
  const directusLocale = computed(() => localeMap[locale.value] || "de-DE");

  return { directusLocale };
};
