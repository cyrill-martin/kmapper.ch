<script setup>
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const isGerman = computed(() => locale.value === "de");
const { isDesktop } = useScreen();
</script>

<template>
  <div :class="{ 'switch-desktop': isDesktop }">
    <NuxtLink
      :to="switchLocalePath('de')"
      :class="{ active: isGerman }"
      class="button-link"
      >DE</NuxtLink
    >
    |
    <NuxtLink
      :to="switchLocalePath('en')"
      :class="{ active: !isGerman }"
      class="button-link"
      >EN</NuxtLink
    >
  </div>
</template>

<style lang="css" scoped>
.switch-desktop {
  position: fixed;
  top: 1rem;
  right: 1.5rem;
  z-index: 999;
}

a.active {
  font-weight: 700;
  cursor: default;
}
</style>
