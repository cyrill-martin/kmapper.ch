<script setup>
import { NFlex, NIcon } from "naive-ui";
import { Mail, LogoLinkedin, LogoGithub, Call } from "@vicons/ionicons5";
const { editableAttr, applyEditor } = useVisualEditor();
const { isDesktop, isMobile } = useScreen();
const { directusLocale } = useDirectusLocale();
const { assetUrl } = useDirectus();

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

const seo = computed(() => about.content?.seo);
useSeo(seo);

const iconSize = 25;
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
      <div
        v-for="block in aboutBlocks"
        :key="block.id"
        :data-directus="
          editableAttr({
            collection: 'block_richtext',
            item: block.id,
            fields: 'translations',
            mode: 'modal',
          })
        "
      >
        <h2>
          {{ block.item.translations[0].title }}
        </h2>
        <div class="about-block" v-html="block.item.translations[0].content" />
      </div>
      <n-flex
        class="about-block portrait"
        :class="{ portraitCentered: isMobile }"
        align="center"
        vertical
      >
        <div class="image-container">
          <img
            :src="assetUrl(about.content.portrait)"
            alt="Cyrill Martin - Portrait"
            class="about-image"
            :data-directus="
              editableAttr({
                collection: 'about',
                item: 1,
                fields: 'image',
                mode: 'modal',
              })
            "
          />
        </div>
        <div
          class="socials"
          :data-directus="
            editableAttr({
              collection: 'about',
              item: 1,
              fields: '',
              mode: 'modal',
            })
          "
        >
          <a
            :href="`mailto:${about.content.mailto}`"
            target="_blank"
            rel="noopener noreferrer"
            title="Mail"
          >
            <n-icon :component="Mail" :size="iconSize" :depth="1" />
          </a>
          <a
            :href="`tel:${about.content.phone}`"
            target="_blank"
            rel="noopener noreferrer"
            title="Tel."
          >
            <n-icon :component="Call" :size="iconSize" :depth="1" />
          </a>
          <a
            :href="about.content.signal"
            target="_blank"
            rel="noopener noreferrer"
            title="Signal"
          >
            <n-icon :size="iconSize" :depth="1"><SignalIcon /></n-icon>
          </a>
          <a
            :href="about.content.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <n-icon :component="LogoLinkedin" :size="iconSize" :depth="1" />
          </a>
          <a
            :href="about.content.github"
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
