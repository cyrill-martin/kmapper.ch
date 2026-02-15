<script setup>
import { NConfigProvider, NFlex } from "naive-ui";
const { isMobile } = useScreen();
</script>
<template>
  <n-config-provider :theme-overrides="naiveThemeOverrides">
    <PreviewBanner />
    <n-flex v-if="!isMobile" class="desktop-container">
      <LanguageSwitch />
      <nav class="desktop-nav">
        <NavDesktop />
      </nav>
      <main class="desktop-main">
        <NuxtPage />
      </main>
    </n-flex>
    <n-flex v-else vertical class="mobile-container">
      <NavMobile />
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
  flex-shrink: 0;
  padding: 1rem;
}

.desktop-main {
  flex: 1;
  min-width: 0;
}

.mobile-container {
  min-height: 100dvh;
}

header {
  height: 50px;
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
