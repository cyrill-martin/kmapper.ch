<script setup>
const { t } = await useLabels();
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

const services = [
  ["curation", "ba"],
  ["organization", "re"],
  ["publication", "dev"],
];
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
      <section class="home-content-inner">
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
        <ul class="main-list">
          <li v-for="item in services" :key="item[0]">
            <NuxtLinkLocale
              :to="{ name: item[0] }"
              class="button-link kmapper-service"
            >
              {{ t(`service.${item[0]}`) }}
            </NuxtLinkLocale>
            <ul class="sub-list">
              <li class="it-service">.{{ t(`service.${item[1]}`) }}</li>
            </ul>
          </li>
        </ul>
        <h2
          :data-directus="
            editableAttr({
              collection: 'home',
              item: 1,
              fields: 'translations',
              mode: 'modal',
            })
          "
          v-html="home.content.translations[0].subheading"
        />
      </section>
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

h1 {
  /* margin-bottom: 2rem; */
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

.main-list {
  list-style: none;
  padding-left: 0;
}

.main-list li {
  margin-bottom: 1rem;
}

.kmapper-service {
  padding: 4px 8px;
  font-size: 1.25rem;
  font-weight: 600;
  background: var(--color-background);
  background: var(--color-body-text);
  color: var(--color-contrast);
}

.kmapper-service:hover {
  color: var(--color-body-text);
}

.main-list li:nth-child(1) > a:hover {
  background: var(--gradient-5);
}

.main-list li:nth-child(2) > a:hover {
  background: var(--gradient-2);
}

.main-list li:nth-child(3) > a:hover {
  background: var(--gradient-4);
}

.sub-list {
  list-style: none;
}

.sub-list li {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
