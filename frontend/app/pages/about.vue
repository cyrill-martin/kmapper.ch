<script setup>
import { NFlex, NIcon } from "naive-ui";
import { Mail, LogoLinkedin, LogoGithub, Call } from "@vicons/ionicons5";
const { isDesktop, isMobile } = useScreen();

const { content: about, pending, error } = useContent("about");

const maxDivWidth = computed(() => {
  return isDesktop.value ? "80%" : "100%";
});

const seo = computed(() => about.value?.seo);
useSeo(seo);

const iconSize = 25;
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>

    <div v-else-if="error" style="color: red">
      Error: {{ error.message }}
    </div>

    <div
      v-else-if="about"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
      :style="{ maxWidth: maxDivWidth }"
    >
      <h1>{{ about.title }}</h1>
      <div v-for="(block, index) in about.blocks" :key="index">
        <h2>{{ block.title }}</h2>
        <div class="about-block" v-html="block.content" />
      </div>
      <n-flex
        class="about-block portrait"
        :class="{ portraitCentered: isMobile }"
        align="center"
        vertical
      >
        <div class="image-container">
          <img
            :src="about.portrait"
            alt="Cyrill Martin - Portrait"
            class="about-image"
          />
        </div>
        <div class="socials">
          <a
            :href="`mailto:${about.contact.mailto}`"
            target="_blank"
            rel="noopener noreferrer"
            title="Mail"
          >
            <n-icon :component="Mail" :size="iconSize" :depth="1" />
          </a>
          <a
            :href="`tel:${about.contact.phone}`"
            target="_blank"
            rel="noopener noreferrer"
            title="Tel."
          >
            <n-icon :component="Call" :size="iconSize" :depth="1" />
          </a>
          <a
            :href="about.contact.signal"
            target="_blank"
            rel="noopener noreferrer"
            title="Signal"
          >
            <n-icon :size="iconSize" :depth="1"><SignalIcon /></n-icon>
          </a>
          <a
            :href="about.contact.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <n-icon :component="LogoLinkedin" :size="iconSize" :depth="1" />
          </a>
          <a
            :href="about.contact.github"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <n-icon :component="LogoGithub" :size="iconSize" :depth="1" />
          </a>
        </div>
      </n-flex>
    </div>

    <div v-else>No page found</div>
  </div>
</template>

<style lang="css" scoped>
.about-block {
  margin-bottom: 4rem;
}
.portrait {
  max-width: 195px;
  margin-top: -2.5rem;
}
.portraitCentered {
  margin-left: auto;
  margin-right: auto;
}
.image-container {
  padding: 8px;
  background: var(--gradient-6);
}
.about-image {
  width: auto;
  width: 100%;
  height: auto;
  mix-blend-mode: multiply;
  filter: contrast(1.75) grayscale(1);
}

.socials a {
  margin-right: 0.25rem;
}
</style>
