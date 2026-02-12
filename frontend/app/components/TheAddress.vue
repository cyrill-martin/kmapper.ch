<script setup>
const { t } = await useLabels();
</script>
<template>
  <div>
    <address>
      {{ t("contact.company") }}<br />
      {{ t("contact.street") }}<br />
      {{ t("contact.zip") }} {{ t("contact.city") }}
    </address>
    <div class="contacts">
      <a :href="`tel:${t('contact.phone')}`">{{ t("contact.phone") }}</a
      ><br />
      <a :href="`mailto:${t('contact.mail')}`">{{ t("contact.mail") }}</a>
    </div>
  </div>
</template>

<style lang="css" scoped>
div {
  font-size: 1rem;
}
address {
  font-style: normal;
  margin-bottom: 0.5rem;
}
</style>
