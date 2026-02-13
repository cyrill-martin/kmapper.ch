<script setup>
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const isGerman = computed(() => locale.value === "de");
const { isMobile } = useScreen();
</script>

<template>
  <div :class="{ desktopPosition: !isMobile }">
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
.desktopPosition {
  position: fixed;
  top: 1rem;
  right: 1.5rem;
}

a.active {
  font-weight: bold;
  text-decoration: underline;
  cursor: default;
}
</style>
