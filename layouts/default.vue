<template>
  <!-- grid-rows-[auto, 1fr, auto] -->
  <div class="website-wrapper grid relative min-h-screen">
    <BaseHeader
      :class="{ 'sticky w-full top-0 left-0 right-0 z-20': showScrollToTop }"
    />
    <main>
      <Nuxt />
    </main>
    <BaseFooter />

    <button
      v-if="showScrollToTop"
      class="fixed bottom-20 right-5 p-3 rounded-md bg-dark-800 shadow shadow-lg shadow-light-200/40 text-white"
      aria-label="переместиться наверх страницы"
      @click="scrollToTop"
    >
      <b-icon icon="arrow-up-thick"></b-icon>
    </button>
    <button
      class="fixed bottom-5 right-5 p-3 rounded-md bg-yellow-500 shadow shadow-lg shadow-light-200/40 text-dark transition transition-all"
      aria-label="переместиться наверх страницы"
    >
      <!-- :class="{ '!bottom-5': !showScrollToTop }" -->
      <!-- @click="show" -->
      <b-icon icon="cart-outline"></b-icon>
    </button>
  </div>
</template>

<script setup>
import useScrollToTop from '~/composables/scrollToTop';
import BaseHeader from '~/components/Base/BaseHeader.vue';
import BaseFooter from '~/components/Base/BaseFooter.vue';

const { scrollToTop, showScrollToTop } = useScrollToTop();
</script>

<style lang="scss" scoped>
.website-wrapper {
  grid-template-rows:
    minmax(min-content, max-content) 1fr
    minmax(min-content, max-content);
}
</style>
