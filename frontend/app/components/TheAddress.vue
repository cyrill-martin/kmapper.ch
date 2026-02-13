<script setup>
const { t } = await useLabels();
</script>
<template>
  <div class="contacts">
    <address>
      {{ t("contact.company") }}<br />
      {{ t("contact.street") }}<br />
      {{ t("contact.zip") }} {{ t("contact.city") }}
    </address>
    <div>
      <a :href="`tel:${t('contact.phone')}`">{{ t("contact.phone") }}</a
      ><br />
      <a :href="`mailto:${t('contact.mail')}`">{{ t("contact.mail") }}</a>
    </div>
  </div>
</template>

<style lang="css" scoped>
.contacts {
  font-size: 0.8rem;
}
address {
  font-style: normal;
  margin-bottom: 0.2rem;
}
</style>
