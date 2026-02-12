<script setup>
import { NFlex } from "naive-ui";
</script>

<template>
  <n-flex class="navigation-container" vertical>
    <div class="site-logo">
      <SiteLogo />
    </div>
    <div class="nav-items">
      <NavItems />
    </div>
    <div class="small-print">
      <TheAddress />
      <TheLegal />
    </div>
  </n-flex>
</template>

<style lang="css" scoped>
.navigation-container {
  position: fixed;
  height: 96vh;
}

.site-logo {
  flex: 1;
}

.nav-items {
  flex: 5;
}

.small-print {
  flex: none;
}
</style>
