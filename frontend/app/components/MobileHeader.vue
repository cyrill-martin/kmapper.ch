<script setup>
import { NFlex } from "naive-ui";
</script>
<template>
  <n-flex class="header-container">
    <div class="site-logo">kmapper</div>
    <div class="site-language"><TheLanguage /></div>
  </n-flex>
</template>

<style lang="css" scoped>
.header-container {
  padding: 0.5rem 1rem;
}
.site-logo {
  flex: 1;
  font-size: 1.2rem;
}
.site-language {
  flex: 1;
  text-align: right;
}
</style>
