<script setup>
import { NFlex } from "naive-ui";
import TheLanguage from "./components/TheLanguage.vue";
const { isMobile } = useScreen();
</script>
<template>
  <div>
    <PreviewBanner />
    <n-flex v-if="!isMobile" class="desktop-container">
      <TheLanguage />
      <nav class="desktop-nav">
        <NavDesktop />
      </nav>
      <main class="desktop-main">
        <NuxtPage />
      </main>
    </n-flex>
    <n-flex v-else vertical>
      <header>
        <MobileHeader />
      </header>
      <main>
        <NuxtPage />
      </main>
      <footer>
        <MobileFooter />
      </footer>
    </n-flex>
  </div>
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
</style>
