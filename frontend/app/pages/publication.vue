<script setup>
const { content: publication, pending, error } = useContent("publication");
</script>

<template>
  <ServicePage :service="publication" :pending="pending" :error="error" />
</template>
