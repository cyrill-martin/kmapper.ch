<script setup>
const { t } = await useLabels();
const { toggleMobileNav } = useMobileNav();
</script>
<template>
  <div class="trigger" @click="toggleMobileNav">{{ t("nav.trigger") }}</div>
</template>

<style lang="css" scoped>
.trigger {
  padding-right: 1rem;
  cursor: pointer;
}
</style>
