<script setup>
import { NConfigProvider, NFlex } from "naive-ui";
const { isDesktop } = useScreen();
</script>
<template>
  <n-config-provider :theme-overrides="naiveThemeOverrides">
    <PreviewBanner />
    <NavMobile v-show="!isDesktop" />
    <n-flex v-if="isDesktop" class="desktop-container">
      <LanguageSwitch />
      <nav class="desktop-nav">
        <NavDesktop />
      </nav>
      <main class="desktop-main">
        <NuxtPage />
      </main>
    </n-flex>
    <n-flex v-else vertical class="mobile-container">
      <header>
        <HeaderMobile />
      </header>
      <main class="mobile-main">
        <NuxtPage />
      </main>
      <footer>
        <FooterMobile />
      </footer>
    </n-flex>
  </n-config-provider>
</template>

<style lang="css" scoped>
.desktop-nav {
  width: 30%;
  flex-shrink: 1;
  padding: 0.5rem 0.5rem 0 1rem;
}

.desktop-main {
  flex: 1;
  min-width: 0;
}

.mobile-container {
  min-height: 100dvh;
}

header {
  height: 65px;
  flex-shrink: 0;
}

.mobile-main {
  flex-grow: 1;
  min-height: 0;
}

footer {
  flex: none;
}
</style>
