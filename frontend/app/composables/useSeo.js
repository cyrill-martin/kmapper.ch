// SEO meta for pages fed by useContent (flat { title, description, keywords, image } shape).
const DEFAULT_IMAGE = "/images/og-default.png";

export const useSeo = (seoRef) => {
  const author = "Cyrill Martin - kmapper GmbH";
  const config = useRuntimeConfig();
  const route = useRoute();

  const pageUrl = computed(() => `${config.public.baseUrl}${route.fullPath}`);
  const imageUrl = computed(
    () => `${config.public.baseUrl}${seoRef.value?.image || DEFAULT_IMAGE}`,
  );

  useSeoMeta({
    author,
    title: () => `${seoRef.value?.title} - kmapper`,
    ogTitle: () => `${seoRef.value?.title} - kmapper`,
    description: () => seoRef.value?.description,
    ogDescription: () => seoRef.value?.description,
    keywords: () => seoRef.value?.keywords,
    ogType: "website",
    ogUrl: () => pageUrl.value,
    ogImage: () => imageUrl.value,
    twitterCard: "summary_large_image",
    twitterTitle: () => `${seoRef.value?.title} - kmapper`,
    twitterDescription: () => seoRef.value?.description,
    twitterImage: () => imageUrl.value,
  });
};
