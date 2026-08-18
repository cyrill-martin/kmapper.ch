<script setup>
const { content: organization, pending, error } = useContent("organization");
</script>

<template>
  <ServicePage :service="organization" :pending="pending" :error="error" />
</template>
