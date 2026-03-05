<script setup>
const { editableAttr, applyEditor } = useVisualEditor();
const { isDesktop } = useScreen();

const privacy = reactive(useContent("privacy"));

const maxDivWidth = computed(() => {
  return isDesktop.value ? "90%" : "100%";
});

onMounted(() => {
  if (privacy.content) applyEditor();
});

watch(
  () => privacy.content,
  (content) => {
    if (content) applyEditor();
  },
);

const seo = computed(() => privacy.content?.seo);
useSeo(seo);
</script>

<template>
  <div>
    <div v-if="privacy.pending">Loading...</div>

    <div v-else-if="privacy.error" style="color: red">
      Error: {{ privacy.error.message }}
    </div>

    <div
      v-else-if="privacy.content"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
      :style="{ maxWidth: maxDivWidth }"
    >
      <h1
        :data-directus="
          editableAttr({
            collection: 'privacy',
            item: 1,
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        {{ privacy.content.translations[0].title }}
      </h1>
      <div
        v-html="privacy.content.translations[0].content"
        :data-directus="
          editableAttr({
            collection: 'privacy',
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
