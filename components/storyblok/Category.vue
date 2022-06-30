<template>
  <!-- :to="`/${blok.slug.cached_url}`" -->
  <NuxtLink
    v-if="isHomePage"
    v-editable="blok"
    :to="`/${blok.full_slug}`"
    class="card-category block px-5 py-10 grid items-center justify-center relative overflow-hidden rounded-sm shadow shadow-lg shadow-dark-800/20 md:(py-20)"
    @pointerover="animat"
  >
    <!-- <pre>{{ blok }}</pre> -->
    <h2 class="text-2xl text-center font-semibold text-white">
      <!-- {{ blok.title }} -->
      {{ blok.content.title }}
    </h2>
    <!-- :src="blok.cover.filename" -->
    <img
      card-cover
      class="absolute w-full h-full inset-0 object-cover -z-1 filter brightness-60 transform transition-transform duration-300 scale-100"
      :src="blok.content.cover.filename"
      alt=""
    />
  </NuxtLink>
  <div v-else class="min-h-[50vh] grid items-center relative">
    <h1 class="text-3xl text-center font-semibold text-white">
      <!-- {{ blok.title }} -->
      {{ blok.title }}
    </h1>

    <img
      class="absolute w-full h-full inset-0 object-cover -z-1 filter brightness-60"
      :src="blok.cover.filename"
      alt=""
    />
  </div>
</template>

<script setup>
import { computed, useRoute } from '@nuxtjs/composition-api';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const route = useRoute();

const isHomePage = computed(
  () => route.value.path === '/' || route.value.path === ''
);
// console.log('props: ', props);
</script>

<style lang="scss" scoped>
.card-category {
  img {
    @apply transform duration-300  scale-100 transition-transform;
  }

  &:hover {
    img {
      @apply transform duration-300  scale-110 transition-transform;
    }
  }
}
</style>
