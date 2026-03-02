<script setup>
const { editableAttr, applyEditor } = useVisualEditor();
const { isDesktop } = useScreen();
const { directusLocale } = useDirectusLocale();

const about = reactive(
  useContent("about", null, [
    "blocks.id",
    "blocks.collection",
    "blocks.item.*",
    "blocks.item.translations.*",
  ]),
);

const aboutBlocks = computed(() => {
  return (
    about.content?.blocks?.map((block) => ({
      ...block,
      item: {
        ...block.item,
        translations:
          block.item?.translations?.filter(
            (t) => t.languages_code === directusLocale.value,
          ) ?? [],
      },
    })) ?? []
  );
});

const maxDivWidth = computed(() => {
  return isDesktop.value ? "80%" : "100%";
});

onMounted(() => {
  if (about.content) applyEditor();
});

watch(
  () => about.content,
  (content) => {
    if (content) applyEditor();
  },
);
</script>

<template>
  <div>
    <div v-if="about.pending">Loading...</div>

    <div v-else-if="about.error" style="color: red">
      Error: {{ about.error.message }}
    </div>

    <div
      v-else-if="about.content"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
      :style="{ maxWidth: maxDivWidth }"
    >
      <h1
        :data-directus="
          editableAttr({
            collection: 'about',
            item: 1,
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        {{ about.content.translations[0].title }}
      </h1>
      <div v-for="block in aboutBlocks" :key="block.id">
        <h2
          :data-directus="
            editableAttr({
              collection: 'block_richtext',
              item: block.id,
              fields: 'translations',
              mode: 'modal',
            })
          "
        >
          {{ block.item.translations[0].title }}
        </h2>
        <div
          class="about-block"
          v-html="block.item.translations[0].content"
          :data-directus="
            editableAttr({
              collection: 'block_richtext',
              item: block.id,
              fields: 'translations',
              mode: 'modal',
            })
          "
        />
      </div>
    </div>

    <div v-else>No page found</div>
  </div>
</template>

<style lang="css" scoped>
.about-block {
  margin-bottom: 4rem;
}
</style>
