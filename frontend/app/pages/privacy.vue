<script setup>
const { isDesktop } = useScreen();

const { content: privacy, pending, error } = useContent("privacy");

const maxDivWidth = computed(() => {
  return isDesktop.value ? "90%" : "100%";
});

const seo = computed(() => privacy.value?.seo);
useSeo(seo);
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>

    <div v-else-if="error" style="color: red">
      Error: {{ error.message }}
    </div>

    <div
      v-else-if="privacy"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
      :style="{ maxWidth: maxDivWidth }"
    >
      <h1>{{ privacy.title }}</h1>
      <div v-html="privacy.content" />
    </div>

    <div v-else>No page found</div>
  </div>
</template>
