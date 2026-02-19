<script setup>
const curation = reactive(useContent("services", 1));
</script>

<template>
  <ServicePage v-if="curation" :service="curation" :id="1" />
</template>
