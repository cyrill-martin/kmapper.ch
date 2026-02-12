<script setup>
const { t } = await useLabels();
</script>
<template>
  <div>
    <div class="legal">
      <NuxtLinkLocale :to="{ name: 'imprint' }">{{
        t("nav.imprint")
      }}</NuxtLinkLocale>
      |
      <NuxtLinkLocale :to="{ name: 'privacy' }">{{
        t("nav.privacy")
      }}</NuxtLinkLocale>
    </div>
    <small>{{ t("common.copyright") }}</small>
  </div>
</template>

<style lang="css" scoped>
.legal,
small {
  /* font-size: 0.72rem; */
  font-size: 0.75rem;
  margin: 1.5rem 0 0.5rem 0;
}
</style>
