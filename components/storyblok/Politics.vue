<template>
  <section class="popular-section py-10">
    <BaseContainer>
      <!-- <pre>{{ blok }}</pre> -->
      <div class="richtext-page" v-html="richtext(blok.text)"></div>
    </BaseContainer>
  </section>
</template>

<script setup>
import BaseContainer from '../Base/BaseContainer.vue';
import { richtext } from '~/utils/richtext';

defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss">
.richtext-page {
  & * {
    @apply hyphens-auto;
  }
  h1 {
    @apply font-bold text-2xl hyphens-auto md:(text-4xl);
    // color: red;
  }
}
</style>
