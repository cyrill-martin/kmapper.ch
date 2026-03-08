<script setup>
const { t } = await useLabels();
</script>
<template>
  <section class="contacts">
    <address>
      <span>{{ t("contact.company") }}</span
      ><br />
      <span>{{ t("contact.city") }}, {{ t("contact.country") }}</span>
    </address>
    <div>
      <a :href="`tel:${t('contact.phone')}`">{{ t("contact.phone") }}</a
      ><br />
      <a :href="`mailto:${t('contact.mail')}`">{{ t("contact.mail") }}</a>
    </div>
  </section>
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
