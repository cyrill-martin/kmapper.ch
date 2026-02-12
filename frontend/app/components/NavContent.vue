<script setup>
const { isMobile } = useScreen();
import { NFlex } from "naive-ui";
</script>

<template>
  <n-flex class="navigation-container" vertical>
    <div class="nav-items">
      <NavItems />
    </div>
    <div class="small-print" v-if="!isMobile">
      <TheAddress />
      <TheLegal />
    </div>
  </n-flex>
</template>

<style lang="css" scoped>
.navigation-container {
  padding: 1rem;
  height: 100%;
}

.nav-items {
  flex: 1;
}

.small-print {
  flex: none;
}
</style>
