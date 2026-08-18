<script setup>
const { isDesktop } = useScreen();

const { content: imprint, pending, error } = useContent("imprint");

const maxDivWidth = computed(() => {
  return isDesktop.value ? "90%" : "100%";
});

const seo = computed(() => imprint.value?.seo);
useSeo(seo);
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>

    <div v-else-if="error" style="color: red">
      Error: {{ error.message }}
    </div>

    <div
      v-else-if="imprint"
      :class="isDesktop ? 'inner-page-desktop' : 'inner-page-mobile'"
      :style="{ maxWidth: maxDivWidth }"
    >
      <h1>{{ imprint.title }}</h1>
      <div v-html="imprint.content" />
    </div>

    <div v-else>No page found</div>
  </div>
</template>
