<script setup>
const { editableAttr, applyEditor } = useVisualEditor();
const { assetUrl } = useDirectus();
const { isDesktop } = useScreen();
const { t } = await useLabels();

const props = defineProps(["service", "id"]);

onMounted(() => {
  if (props.service.content) applyEditor();
});

watch(
  () => props.service.content,
  (content) => {
    if (content) applyEditor();
  },
);

const maxImgWidth = computed(() => {
  return isDesktop.value ? "65%" : "100%";
});

const maxPWidth = computed(() => {
  return isDesktop.value ? "65%" : "100%";
});

const nextLinkText = computed(() => {
  return props.id === 3
    ? t(`nav.projects`)
    : t(`service.${props.service.content.next_route}`);
});
</script>

<template>
  <div>
    <div v-if="props.service.pending">Loading...</div>

    <div v-else-if="props.service.error" style="color: red">
      Error: {{ props.service.error.message }}
    </div>

    <div
      v-else-if="props.service.content"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
    >
      <h1
        :data-directus="
          editableAttr({
            collection: 'services',
            item: props.id,
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        {{ props.service.content.translations[0].title }}
      </h1>
      <div
        class="service-keywords"
        :data-directus="
          editableAttr({
            collection: 'services',
            item: props.id,
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        <p>
          {{
            props.service.content.translations[0].visual_keywords.join(" · ")
          }}
        </p>
      </div>
      <div>
        <p>
          <img
            :src="assetUrl(props.service.content.service_image)"
            :alt="props.service.content.translations[0].image_alt"
            class="service-image"
            :style="{ maxWidth: maxImgWidth }"
            :data-directus="
              editableAttr({
                collection: 'services',
                item: props.id,
                fields: 'service_image',
                mode: 'modal',
              })
            "
          />
        </p>
      </div>
      <div
        v-html="props.service.content.translations[0].content"
        :style="{ maxWidth: maxPWidth }"
        :data-directus="
          editableAttr({
            collection: 'services',
            item: props.id,
            fields: 'translations',
            mode: 'modal',
          })
        "
      />
      <div
        class="next-route"
        :data-directus="
          editableAttr({
            collection: 'services',
            item: props.id,
            fields: 'next_route',
            mode: 'modal',
          })
        "
      >
        →
        <NuxtLinkLocale
          :to="{ name: props.service.content.next_route }"
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
  font-weight: 600;
}
.service-image {
  mix-blend-mode: multiply;
  filter: sepia(0.15) contrast(1.05);
  height: auto;
}
</style>
