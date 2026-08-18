<script setup>
import { NCard, NFlex } from "naive-ui";
const { isDesktop } = useScreen();
const { t } = useI18n();

const { content: projects, pending, error } = useContent("projects");

const maxDivWidth = computed(() => {
  return isDesktop.value ? "90%" : "100%";
});

const cardPadding = computed(() => {
  const pD = "1rem";
  const pM = "0.5rem";
  return isDesktop.value ? `0 ${pD} ${pD} ${pD}` : `0 ${pM} ${pM} ${pM}`;
});

const cardGradient = (index) => `var(--gradient-${(index % 6) + 1})`;

const seo = computed(() => projects.value?.seo);
useSeo(seo);
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>

    <div v-else-if="error" style="color: red">
      Error: {{ error.message }}
    </div>

    <div
      v-else-if="projects"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
      :style="{ maxWidth: maxDivWidth }"
    >
      <h1>{{ t("nav.projects") }}</h1>
      <div
        class="project-container"
        v-for="(project, index) in projects.items"
        :key="project.url"
      >
        <n-card
          class="project-card"
          :content-style="{
            background: cardGradient(index),
            padding: cardPadding,
          }"
        >
          <n-flex vertical>
            <div class="project-header">
              <h3>{{ project.title }}</h3>
              <div class="project-description">
                {{ project.description }}
              </div>
              <div class="project-url">
                &#8594;
                <a :href="project.url" target="_blank" rel="noopener noreferrer">{{
                  project.urlText
                }}</a>
              </div>
            </div>
            <n-flex :vertical="!isDesktop" :reverse="!isDesktop">
              <div class="project-notes" v-html="project.notes" />
              <div class="project-teaser">
                <a :href="project.url" target="_blank" rel="noopener noreferrer">
                  <img
                    :src="project.image"
                    :alt="`Screenshot ${project.urlText}`"
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
