<script setup>
const { t } = await useLabels();
const { toggleMobileNav } = useMobileNav();
</script>
<template>
  <div class="trigger" @click="toggleMobileNav">{{ t("nav.trigger") }}</div>
</template>

<style lang="css" scoped>
.trigger {
  font-weight: 500;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
