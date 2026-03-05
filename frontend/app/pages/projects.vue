<script setup>
import { NCard, NFlex } from "naive-ui";
const { editableAttr, applyEditor } = useVisualEditor();
const { isDesktop } = useScreen();
const { assetUrl } = useDirectus();
const { locale } = useI18n();
const { t } = await useLabels();

const seoContent = {
  de: {
    translations: [
      {
        title: "Öffentliche Web-Projekte",
        description:
          "kmapper erstellt kreative, interaktive Projekte für spezifische Zielgruppen",
        keywords: "offene Daten, Datenvisualisierung, Webentwicklung",
      },
    ],
  },
  en: {
    translations: [
      {
        title: "Public web projects",
        description:
          "kmapper creates creative, interactive projects for specific audiences",
        keywords: "open data, data visualization, web development",
      },
    ],
  },
};

const projects = reactive(useCollection("projects"));

const seoObj = computed(() => {
  return locale.value === "de" ? seoContent.de : seoContent.en;
});

const maxDivWidth = computed(() => {
  return isDesktop.value ? "90%" : "100%";
});

const cardPadding = computed(() => {
  const pD = "1rem";
  const pM = "0.5rem";
  return isDesktop.value ? `0 ${pD} ${pD} ${pD}` : `0 ${pM} ${pM} ${pM}`;
});

const cardGradient = (sortNumber) =>
  `var(--gradient-${((sortNumber - 1) % 6) + 1})`;

onMounted(() => {
  if (projects.items) applyEditor();
});

watch(
  () => projects.items,
  (content) => {
    if (content) applyEditor();
  },
);

useSeo(seoObj);
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
      <h1
        :data-directus="
          editableAttr({
            collection: 'labels',
            item: 'nav.projects',
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        {{ t("nav.projects") }}
      </h1>
      <div
        class="project-container"
        v-for="project in projects.items"
        :key="project.id"
      >
        <n-card
          class="project-card"
          :content-style="{
            background: cardGradient(project.sort),
            padding: cardPadding,
          }"
          :data-directus="
            editableAttr({
              collection: 'projects',
              item: project.id,
              fields: '',
              mode: 'modal',
            })
          "
        >
          <n-flex vertical>
            <div class="project-header">
              <h3>{{ project.translations[0].title }}</h3>
              <div class="project-description">
                {{ project.translations[0].description }}
              </div>
              <div class="project-url">
                &#8594;
                <a
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ project.url_text }}</a
                >
              </div>
            </div>
            <n-flex :vertical="!isDesktop" :reverse="!isDesktop">
              <div
                class="project-notes"
                v-html="project.translations[0].notes"
              />
              <div class="project-teaser">
                <a
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    :src="assetUrl(project.project_image)"
                    :alt="`Screenshot ${project.url_text}`"
                    class="service-image"
                    style="width: 100%; height: auto"
                  />
                </a>
              </div>
            </n-flex>
          </n-flex>
        </n-card>
      </div>
      <div class="next-route">
        &#8594;
        <NuxtLinkLocale :to="{ name: 'about' }" class="site-link">
          {{ t("nav.about") }}
        </NuxtLinkLocale>
      </div>
    </div>

    <div v-else>No page found</div>
  </div>
</template>

<style lang="css" scoped>
.project-container {
  margin-bottom: 2rem;
}
.project-header {
  padding: 0.5rem;
}
.project-notes {
  flex: 2;
  padding: 0.5rem;
}
.project-teaser {
  flex: 4;
}
</style>
