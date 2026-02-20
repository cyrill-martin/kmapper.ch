<script setup>
const { closeMobileNav } = useMobileNav();
const mainItems = ["curation", "organization", "publication"];
const secondaryItems = ["projects", "about"];
const { t } = await useLabels();
</script>

<template>
  <div>
    <ul class="main-items">
      <li v-for="item in mainItems" :key="item">
        <NuxtLinkLocale
          :to="{ name: item }"
          class="button-link service-link"
          @click="closeMobileNav"
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
          @click="closeMobileNav"
        >
          {{ t(`nav.${item}`) }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
ul {
  list-style: none;
  padding-left: 0;
}

.service-link {
  padding: 4px;
  font-size: 1.25rem;
  font-weight: 700;
}

.secondary-link {
  padding: 4px;
  font-size: 1.1rem;
  font-weight: 600;
}

.main-items li {
  margin: 0.25rem 0;
}

.main-items li:nth-child(1) a:hover,
.main-items li:nth-child(1) a.router-link-active {
  background: var(--gradient-5);
}

.main-items li:nth-child(2) a:hover,
.main-items li:nth-child(2) a.router-link-active {
  background: var(--gradient-2);
}

.main-items li:nth-child(3) a:hover,
.main-items li:nth-child(3) a.router-link-active {
  background: var(--gradient-4);
}

.secondary-items li {
  margin: 0.15rem 0;
}

.secondary-items li:nth-child(1) a:hover,
.secondary-items li:nth-child(1) a.router-link-active {
  background: var(--gradient-1);
}

.secondary-items li:nth-child(2) a:hover,
.secondary-items li:nth-child(2) a.router-link-active {
  background: var(--gradient-6);
}

a.router-link-active {
  cursor: default;
}
</style>
