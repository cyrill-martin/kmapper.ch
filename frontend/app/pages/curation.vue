<script setup>
const { content: curation, pending, error } = useContent("curation");
</script>

<template>
  <ServicePage :service="curation" :pending="pending" :error="error" />
</template>
