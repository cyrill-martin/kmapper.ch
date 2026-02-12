<script setup>
import { NFlex } from "naive-ui";
const { isHome } = useIsHome();
</script>

<template>
  <div class="site-logo">
    <span v-if="isHome">kmapper</span>
    <NuxtLinkLocale v-else :to="{ name: 'home' }">
      <n-flex justify="start" :size="0">
        <img class="site-logo-k" src="/images/kmapper_site_logo_small.png" />
        <span class="site-logo-mapper">mapper</span>
      </n-flex>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="css" scoped>
.site-logo {
  font-size: 2rem;
  font-weight: 400;
  margin-top: 0.5rem;
}

.site-logo-k {
  height: 39px;
  flex-shrink: 0;
  position: relative;
  top: -6.5px;
}

.site-logo-mapper {
  flex: 1;
  min-width: 0;
}

.site-logo a,
.site-log a:visited {
  text-decoration: none;
  color: black;
}
</style>
