<script setup>
const publication = reactive(useContent("services", 3));
</script>

<template>
  <ServicePage v-if="publication" :service="publication" />
</template>
