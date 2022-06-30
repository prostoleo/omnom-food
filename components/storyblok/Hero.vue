<template>
  <section v-editable="blok" class="relative min-h-screen grid items-center">
    <BaseContainer class="text-white">
      <h1 class="text-[28px] leading-tight font-bold md:(text-3xl)">
        {{ blok.title }}
      </h1>
      <p
        v-html="richtext"
        class="mt-7 text-light-500 leading-relaxed max-w-[65ch]"
      ></p>

      <div class="links-block mt-7 flex items-center gap-3">
        <NuxtLink
          class="px-5 py-2 inline-block rounded-md bg-yellow-500 border border-transparent text-dark-800 font-semibold"
          to="/menu"
          >Меню</NuxtLink
        >
        <NuxtLink
          class="px-5 py-2 inline-block rounded-md bg-transparent text-yellow-500 border border-solid border-yellow-500 font-semibold"
          to="/catalogue"
          >Каталог</NuxtLink
        >
      </div>
    </BaseContainer>

    <img
      :src="blok.bg.filename"
      alt=""
      class="absolute inset-0 object-cover w-full h-full -z-1 filter brightness-60"
    />
  </section>
</template>

<script setup>
import { computed } from '@nuxtjs/composition-api';
import { useStoryblokApi } from '@storyblok/nuxt-2';
import BaseContainer from '../Base/BaseContainer.vue';
// console.log('useStoryblokApi: ', useStoryblokApi);

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
// console.log('props: ', props);

const storyApi = useStoryblokApi();
// console.log('storyApi: ', storyApi);

const richtext = computed(() =>
  storyApi.richTextResolver.render(props.blok.subtitle)
);
</script>

<style lang="scss" scoped></style>
