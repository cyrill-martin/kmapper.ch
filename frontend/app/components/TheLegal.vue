<script setup>
const { t } = await useLabels();
</script>
<template>
  <section>
    <div class="legal">
      <NuxtLinkLocale :to="{ name: 'imprint' }" class="site-link">
        {{ t("nav.imprint") }}
      </NuxtLinkLocale>
      |
      <NuxtLinkLocale :to="{ name: 'privacy' }" class="site-link">
        {{ t("nav.privacy") }}
      </NuxtLinkLocale>
    </div>
    <small>{{ t("common.copyright") }}</small>
  </section>
</template>

<style lang="css" scoped>
.legal,
small {
  font-size: 0.8rem;
  margin: 1rem 0 0rem 0;
}
</style>
