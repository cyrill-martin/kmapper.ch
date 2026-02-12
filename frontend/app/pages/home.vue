<script setup>
// const { t } = await useLabels();
const { editableAttr, applyEditor } = useVisualEditor();
const home = reactive(useContent("home")); // home

onMounted(() => {
  if (home.content) applyEditor();
});

watch(
  () => home.content,
  (content) => {
    if (content) applyEditor();
  },
);
</script>

<template>
  <div class="home-container">
    <div v-if="home.pending">Loading...</div>

    <div v-else-if="home.error" style="color: red">
      Error: {{ home.error.message }}
    </div>

    <div v-else-if="home.content" class="home-content">
      <h1
        :data-directus="
          editableAttr({
            collection: 'home',
            item: 1,
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        {{ home.content.translations[0].headline }}
      </h1>
      {{ home.content }}
    </div>

    <div v-else>No page found</div>
  </div>
</template>

<style lang="css" scoped>
.home-container {
  height: 96vh;
}
.home-content {
  background-image: url("/images/kmapper_k.png");
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
