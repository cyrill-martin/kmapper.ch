<script setup>
import { NDrawer, NDrawerContent } from "naive-ui";
const { showMobileNav } = useMobileNav();
</script>

<template>
  <n-drawer v-model:show="showMobileNav" :width="'100%'" :placement="'left'">
    <n-drawer-content closable>
      <nav>
        <NavContent />
      </nav>
    </n-drawer-content>
  </n-drawer>
</template>
