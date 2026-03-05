// composables/useSeo.js
export const useSeo = (seoRef) => {
  const { assetUrl } = useDirectus();

  useSeoMeta({
    title: () => `${seoRef.value?.translations?.[0]?.title} - kmapper`,
    ogTitle: () => `${seoRef.value?.translations?.[0]?.title} - kmapper`,
    description: () => seoRef.value?.translations?.[0]?.description,
    ogDescription: () => seoRef.value?.translations?.[0]?.description,
    keywords: () => seoRef.value?.translations?.[0]?.keywords,
    ogType: "website",
    ogUrl: "https://kmapper.ch",
    ogImage: () =>
      seoRef.value?.image
        ? assetUrl(seoRef.value.image)
        : assetUrl("e52b123f-e30f-4882-9e67-24fed42bb390"),
  });
};
