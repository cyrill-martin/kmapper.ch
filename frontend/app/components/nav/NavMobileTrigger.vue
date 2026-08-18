<script setup>
const { openMobileNav } = useMobileNav();
const { t } = useI18n();
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
  font-size: 18px;
}
</style>
