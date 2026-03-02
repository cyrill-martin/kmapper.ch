<script setup>
const { editableAttr, applyEditor } = useVisualEditor();
const { isDesktop } = useScreen();

const imprint = reactive(useContent("imprint"));

const maxDivWidth = computed(() => {
  return isDesktop.value ? "90%" : "100%";
});

onMounted(() => {
  if (imprint.content) applyEditor();
});

watch(
  () => imprint.content,
  (content) => {
    if (content) applyEditor();
  },
);
</script>

<template>
  <div>
    <div v-if="imprint.pending">Loading...</div>

    <div v-else-if="imprint.error" style="color: red">
      Error: {{ imprint.error.message }}
    </div>

    <div
      v-else-if="imprint.content"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
      :style="{ maxWidth: maxDivWidth }"
    >
      <h1
        :data-directus="
          editableAttr({
            collection: 'imprint',
            item: 1,
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        {{ imprint.content.translations[0].title }}
      </h1>
      <div
        v-html="imprint.content.translations[0].content"
        :data-directus="
          editableAttr({
            collection: 'imprint',
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
