<script setup>
const { editableAttr, applyEditor } = useVisualEditor();
const { assetUrl } = useDirectus();
const { isDesktop } = useScreen();

const props = defineProps(["service"]);

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
  return isDesktop.value ? "700px" : "100%";
});

const maxPWidth = computed(() => {
  return isDesktop.value ? "900px" : "100%";
});
</script>

<template>
  <div>
    <div v-if="props.service.pending">Loading...</div>

    <div v-else-if="props.service.error" style="color: red">
      Error: {{ props.service.error.message }}
    </div>

    <div v-else-if="props.service.content" class="inner-page">
      <h1
        :data-directus="
          editableAttr({
            collection: 'services',
            item: 1,
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        {{ props.service.content.translations[0].title }}
      </h1>
      <h2
        :data-directus="
          editableAttr({
            collection: 'services',
            item: 1,
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        {{ props.service.content.translations[0].headline }}
      </h2>
      <p>
        <img
          :src="assetUrl(props.service.content.service_image)"
          :alt="props.service.content.translations[0].image_alt"
          class="service-image"
          :style="{ maxWidth: maxImgWidth }"
          :data-directus="
            editableAttr({
              collection: 'services',
              item: 1,
              fields: 'service_image',
              mode: 'modal',
            })
          "
        />
      </p>
      <div
        v-html="props.service.content.translations[0].content"
        :style="{ maxWidth: maxPWidth }"
        :data-directus="
          editableAttr({
            collection: 'services',
            item: 1,
            fields: 'translations',
            mode: 'modal',
          })
        "
      />
    </div>

    <div v-else>No page found</div>
  </div>
</template>

<style lang="css" scoped>
.service-image {
  mix-blend-mode: multiply;
  filter: sepia(0.15) contrast(1.05);
  height: auto;
}
</style>
