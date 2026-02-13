<script setup>
import { NDrawer, NDrawerContent } from "naive-ui";
const { showMobileNav, toggleMobileNav } = useMobileNav();
const { t } = await useLabels();
</script>

<template>
  <n-drawer v-model:show="showMobileNav" :width="'75%'" :auto-focus="false">
    <n-drawer-content
      class="mobile-nav"
      :header-class="'kmapper-drawer-header'"
    >
      <template #header>
        <span
          class="drawer-close"
          style="cursor: pointer"
          @click="toggleMobileNav"
          >{{ t("nav.close") }}</span
        >
      </template>
      <LanguageSwitch />
      <nav>
        <NavItems />
      </nav>
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="css" scoped>
.mobile-nav {
  text-align: right;
  background-color: var(--color-background);
}
.drawer-close {
  font-size: 1rem;
}

:deep(.kmapper-drawer-header) {
  border-bottom: none !important;
}
</style>
