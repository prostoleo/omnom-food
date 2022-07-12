<template>
  <!-- :to="`/${blok.slug.cached_url}`" -->
  <NuxtLink
    v-if="isHomePage"
    v-editable="blok"
    :to="`/${blok.full_slug}`"
    class="card-category px-5 py-10 flex items-center justify-center relative overflow-hidden rounded-sm shadow shadow-lg shadow-dark-800/20 md:(py-20)"
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
      :src="`${blok.content.cover.filename}/m/650x0`"
      :alt="blok.content.title"
      loading="lazy"
    />
    <!-- :src="blok.content.cover.filename" -->
  </NuxtLink>
  <div v-else class="min-h-[50vh] flex items-center justify-center relative">
    <h1 class="text-3xl text-center font-semibold text-white md:(text-5xl)">
      <!-- {{ blok.title }} -->
      {{ blok.title }}
    </h1>

    <picture>
      <source
        v-for="(width, index) in WIDTH_FOR_IMG_SOURCES"
        :key="width"
        :media="
          WIDTH_FOR_IMG_SOURCES.length !== index + 1
            ? `(max-width: ${width}px)`
            : `(min-width: ${width}px)`
        "
        :srcset="
          WIDTH_FOR_IMG_SOURCES.length !== index + 1
            ? `${blok.cover.filename}/m/${width}x0`
            : `${blok.cover.filename}/m/`
        "
      />

      <!-- <img
        :src="`${blok.cover.filename}/m/`"
        :alt="blok.title"
        class="absolute inset-0 object-cover w-full h-full -z-1 filter brightness-60"
      /> -->
      <NuxtImg
        preload
        provider="storyblok"
        :src="`${blok.cover.filename}/m/`"
        :alt="blok.title"
        class="absolute inset-0 object-cover w-full h-full -z-1 filter brightness-60"
      />
    </picture>

    <!-- <img
      class="absolute w-full h-full inset-0 object-cover -z-1 filter brightness-60"
      :src="`${blok.cover.filename}/m/`"
      :alt="blok.title"
    /> -->
    <!-- loading="lazy" -->
  </div>
</template>

<script setup>
import { computed, useRoute } from '@nuxtjs/composition-api';
import { WIDTH_FOR_IMG_SOURCES } from '~/utils/config';

defineProps({
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
