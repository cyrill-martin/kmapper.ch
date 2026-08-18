<script setup>
const { isDesktop } = useScreen();
const { locale, t } = useI18n();

const { content: home, pending, error } = useContent("home");

const seo = computed(() => home.value?.seo);
useSeo(seo);
</script>

<template>
  <div :class="isDesktop ? 'home-container-desktop' : 'home-container-mobile'">
    <div v-if="pending">Loading...</div>

    <div v-else-if="error" style="color: red">Error: {{ error.message }}</div>

    <div
      v-else-if="home"
      :class="isDesktop ? 'home-content-desktop' : 'home-content-mobile'"
      class="home-content-background"
    >
      <div class="inner-home">
        <div>
          <p class="hero-claim">
            <NuxtLinkLocale
              :to="{ name: 'curation' }"
              class="button-link kmapper-service curation"
            >
              {{ t(`service.curation`) }} </NuxtLinkLocale
            >,<br />
            <NuxtLinkLocale
              :to="{ name: 'organization' }"
              class="button-link kmapper-service organization"
            >
              {{ t(`service.organization`) }} </NuxtLinkLocale
            ><span v-if="locale === 'en'">,</span><br />
            {{ t(`home.claimAnd`) }}
            <NuxtLinkLocale
              :to="{ name: 'publication' }"
              class="button-link kmapper-service publication"
            >
              {{ t(`service.publication`) }} </NuxtLinkLocale
            ><br />
            {{ t(`home.claimEnd`) }}
          </p>
        </div>
        <div class="hero-content" v-html="home.hero.content" />
      </div>
    </div>

    <div v-else>No page found</div>
  </div>
</template>

<style lang="css" scoped>
.home-container-desktop {
  height: 95vh;
}
.home-container-mobile {
  height: auto;
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

.inner-home {
  padding: 0 0.5rem;
}

.hero-claim {
  padding-top: 1rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.7;
}

.hero-content {
  font-size: 1.5rem;
  font-weight: 600;
}

.kmapper-service {
  padding: 4px 8px;
  background: var(--color-background);
  background: var(--color-body-text);
  color: var(--color-contrast);
}

.kmapper-service:hover {
  color: var(--color-body-text);
}

.curation:hover {
  background: var(--gradient-5);
}

.organization:hover {
  background: var(--gradient-2);
}

.publication:hover {
  background: var(--gradient-4);
}
</style>
