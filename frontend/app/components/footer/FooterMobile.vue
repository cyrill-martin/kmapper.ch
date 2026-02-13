<script setup>
import { NFlex } from "naive-ui";
</script>

<template>
  <n-flex class="footer-content">
    <div class="address"><TheAddress /></div>
    <div class="legal"><TheLegal /></div>
  </n-flex>
</template>

<style lang="css" scoped>
.footer-content {
  padding: 2rem 0.5rem 1rem 0.5rem;
}
.address {
  flex: 1;
}

.legal {
  flex: 1;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
