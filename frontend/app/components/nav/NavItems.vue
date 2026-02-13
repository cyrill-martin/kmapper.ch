<script setup>
const { t } = await useLabels();
const { toggleMobileNav } = useMobileNav();
const { isMobile } = useScreen();

const mainItems = ["curation", "organization", "publication"];
const secondaryItems = ["projects", "about"];
</script>

<template>
  <ul class="main-items">
    <li v-for="item in mainItems" :key="item">
      <NuxtLinkLocale
        :to="{ name: item }"
        class="button-link service-link"
        @click="isMobile ? toggleMobileNav() : null"
      >
        {{ t(`service.${item}`) }}
      </NuxtLinkLocale>
    </li>
  </ul>
  <ul class="secondary-items">
    <li v-for="item in secondaryItems" :key="item">
      <NuxtLinkLocale
        :to="{ name: item }"
        class="button-link secondary-link"
        @click="isMobile ? toggleMobileNav() : null"
      >
        {{ t(`nav.${item}`) }}
      </NuxtLinkLocale>
    </li>
  </ul>
</template>

<style lang="css" scoped>
ul {
  list-style: none;
  padding-left: 0;
}

.service-link {
  padding: 4px;
  font-size: 1.25rem;
  font-weight: 600;
}

.secondary-link {
  padding: 4px;
  font-size: 1.1rem;
  font-weight: 500;
}

li:hover a {
  color: var(--color-contrast);
  background: var(--color-body-text);
}

.main-items li {
  margin: 0.25rem 0;
}

.secondary-items li {
  margin: 0.15rem 0;
}
</style>
