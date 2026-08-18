<script setup>
const { isDesktop } = useScreen();
const { t } = useI18n();

const props = defineProps(["service", "pending", "error"]);

const maxImgWidth = computed(() => {
  return isDesktop.value ? "65%" : "100%";
});

const maxPWidth = computed(() => {
  return isDesktop.value ? "65%" : "100%";
});

const nextLinkText = computed(() => {
  const nextRoute = props.service?.nextRoute;
  return nextRoute === "projects" ? t("nav.projects") : t(`service.${nextRoute}`);
});

const seo = computed(() => props.service?.seo);
useSeo(seo);
</script>

<template>
  <div>
    <div v-if="props.pending">Loading...</div>

    <div v-else-if="props.error" style="color: red">
      Error: {{ props.error.message }}
    </div>

    <div
      v-else-if="props.service"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
    >
      <h1>{{ props.service.title }}</h1>
      <div class="service-keywords">
        <p>{{ props.service.visualKeywords.join(" · ") }}</p>
      </div>
      <div>
        <p>
          <img
            :src="props.service.image"
            :alt="props.service.imageAlt"
            class="service-image"
            :style="{ maxWidth: maxImgWidth }"
          />
        </p>
      </div>
      <div
        v-html="props.service.content"
        :style="{ maxWidth: maxPWidth }"
      />
      <div class="next-route">
        &#8594;
        <NuxtLinkLocale
          :to="{ name: props.service.nextRoute }"
          class="site-link"
        >
          {{ nextLinkText }}
        </NuxtLinkLocale>
      </div>
    </div>

    <div v-else>No page found</div>
  </div>
</template>

<style lang="css" scoped>
.service-keywords {
  font-size: 1.17rem;
  font-weight: 600;
}
.service-image {
  mix-blend-mode: multiply;
  filter: sepia(0.15) contrast(1.05);
  height: auto;
}
</style>
