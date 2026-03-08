<script setup>
import { NFlex } from "naive-ui";
const { isHome } = useIsHome();
const { isDesktop } = useScreen();
</script>

<template>
  <div :class="isDesktop ? 'logo-desktop' : 'logo-mobile'" class="logo">
    <span v-if="isHome">kmapper</span>
    <NuxtLinkLocale v-else :to="{ name: 'home' }" class="button-link">
      <n-flex justify="start" :size="0" align="center">
        <img
          :class="isDesktop ? 'logo-k-desktop' : 'logo-k-mobile'"
          src="/images/kmapper_site_logo_small.png"
        />
        <span :class="isDesktop ? 'logo-mapper-desktop' : 'logo-mapper-mobile'"
          >mapper</span
        >
      </n-flex>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="css" scoped>
.logo {
  font-weight: 600;
}

.logo-desktop {
  font-size: 2rem;
  margin-top: 0.5rem;
}
.logo-mobile {
  font-size: 1.5rem;
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
