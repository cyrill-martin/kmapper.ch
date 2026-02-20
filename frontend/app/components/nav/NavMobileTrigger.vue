<script setup>
const { openMobileNav } = useMobileNav();
const { t } = await useLabels();
</script>
<template>
  <div class="trigger" @click="openMobileNav">
    {{ t("nav.trigger") }}
  </div>
</template>

<style lang="css" scoped>
.trigger {
  font-weight: 500;
  cursor: pointer;
}
</style>
