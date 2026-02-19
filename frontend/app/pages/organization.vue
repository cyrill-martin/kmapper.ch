<script setup>
const organization = reactive(useContent("services", 2));
</script>

<template>
  <ServicePage v-if="organization" :service="organization" :id="2" />
</template>
