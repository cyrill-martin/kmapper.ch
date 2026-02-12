<script setup>
import { NFlex } from "naive-ui";
</script>

<template>
  <n-flex>
    <div class="address"><TheAddress /></div>
    <div class="legal"><TheLegal /></div>
  </n-flex>
</template>

<style lang="css" scoped>
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
