<script setup>
const { editableAttr, applyEditor } = useVisualEditor();
const { isDesktop } = useScreen();
const { t } = await useLabels();

const projects = reactive(useCollection("projects"));

const maxDivWidth = computed(() => {
  return isDesktop.value ? "80%" : "100%";
});

onMounted(() => {
  if (projects.items) applyEditor();
});

watch(
  () => projects.items,
  (content) => {
    if (content) applyEditor();
  },
);
</script>

<template>
  <div>
    <div v-if="projects.pending">Loading...</div>

    <div v-else-if="projects.error" style="color: red">
      Error: {{ projects.error.message }}
    </div>

    <div
      v-else-if="projects.items"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
      :style="{ maxWidth: maxDivWidth }"
    >
      <h1>{{ t("nav.projects") }}</h1>
      <div>{{ projects.items }}</div>
    </div>

    <div v-else>No page found</div>
  </div>
</template>
