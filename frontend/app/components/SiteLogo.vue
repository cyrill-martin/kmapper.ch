<script setup>
import { NFlex } from "naive-ui";
const { isHome } = useIsHome();
const { isMobile } = useScreen();
</script>

<template>
  <div :class="isMobile ? 'logo-mobile' : 'logo-desktop'">
    <span v-if="isHome">kmapper</span>
    <NuxtLinkLocale v-else :to="{ name: 'home' }" class="button-link">
      <n-flex justify="start" :size="0" align="center">
        <img
          :class="isMobile ? 'logo-k-mobile' : 'logo-k-desktop'"
          src="/images/kmapper_site_logo_small.png"
        />
        <span :class="isMobile ? 'logo-mapper-mobile' : 'logo-mapper-desktop'"
          >mapper</span
        >
      </n-flex>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="css" scoped>
.logo-desktop {
  font-size: 2rem;
  font-weight: 500;
  margin-top: 0.5rem;
}
.logo-mobile {
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 0.5rem;
}

.logo-k-desktop {
  height: 42px;
  flex-shrink: 0;
  position: relative;
  align-self: flex-start;
}
.logo-k-mobile {
  height: 27px;
  flex-shrink: 0;
  position: relative;
  align-self: flex-start;
}

.logo-mapper-desktop {
  flex: 1;
  min-width: 0;
}
.logo-mapper-mobile {
  flex: 1;
  min-width: 0;
}
</style>
