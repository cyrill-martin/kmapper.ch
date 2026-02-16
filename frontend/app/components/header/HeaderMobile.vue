<script setup>
import { NFlex } from "naive-ui";
</script>
<template>
  <n-flex class="header-container" align="center">
    <div class="site-logo">
      <SiteLogo />
    </div>
    <div class="site-menu">
      <NavMobileTrigger />
    </div>
  </n-flex>
</template>

<style lang="css" scoped>
.header-container {
  padding: 0.5rem;
}
.site-logo {
  flex: 1;
}
.site-menu {
  flex: 1;
  text-align: right;
}
</style>
