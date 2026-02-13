<script setup>
// const { t } = await useLabels();
const { editableAttr, applyEditor } = useVisualEditor();
const { isMobile } = useScreen();
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
  <div :class="isMobile ? 'home-container-mobile' : 'home-container-desktop'">
    <div v-if="home.pending">Loading...</div>

    <div v-else-if="home.error" style="color: red">
      Error: {{ home.error.message }}
    </div>

    <div
      v-else-if="home.content"
      :class="isMobile ? 'home-content-mobile' : 'home-content-desktop'"
      class="home-content-background"
    >
      <div class="home-content-inner">
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
    </div>

    <div v-else>No page found</div>
  </div>
</template>

<style lang="css" scoped>
.home-container-desktop {
  height: 96vh;
}
.home-container-mobile {
  height: auto; /* let content decide */
}

.home-content-background {
  background-image: url("/images/kmapper_k.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.home-content-desktop {
  height: 100%;
}
.home-content-mobile {
  width: 100%;
  aspect-ratio: 727 / 1091;
}

.home-content-inner {
  padding: 0 0.5rem;
}
</style>
