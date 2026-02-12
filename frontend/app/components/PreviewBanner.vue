<script setup>
// This is the preview banner shown on top of each page if the site is in preview mode
const { isPreview } = usePreview();
</script>

<template>
  <div class="preview-banner" v-if="isPreview">PREVIEW</div>
</template>

<style lang="css" scoped>
.preview-banner {
  background: orange;
  padding: 10px;
  text-align: center;
}
</style>
