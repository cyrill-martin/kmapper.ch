// composables/useSeo.js
export const useSeo = (seoRef) => {
  const { assetUrl } = useDirectus();
  const author = "Cyrill Martin - kmapper GmbH";

  useSeoMeta({
    author: author,
    ogAuthor: author,
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
        : assetUrl("a7e3ff6b-c077-4d0b-a98d-f3f8a30567bd"),
    twitterCard: "summary_large_image",
    twitterTitle: () => `${seoRef.value?.translations?.[0]?.title} - kmapper`,
    twitterDescription: () => seoRef.value?.translations?.[0]?.description,
    twitterImage: () =>
      seoRef.value?.image
        ? assetUrl(seoRef.value.image)
        : assetUrl("a7e3ff6b-c077-4d0b-a98d-f3f8a30567bd"),
  });
};
