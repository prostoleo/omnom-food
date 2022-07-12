<template>
  <section
    v-editable="blok"
    hero-section
    class="relative min-h-screen flex items-center justify-center"
  >
    <BaseContainer class="text-white">
      <h1
        class="text-[28px] leading-tight font-bold md:(text-4xl) lg:(text-5xl)"
      >
        {{ blok.title }}
      </h1>
      <p
        v-html="richtext"
        class="mt-7 text-light-500 leading-relaxed max-w-[65ch] md:(text-lg)"
      ></p>

      <div class="links-block mt-7 flex items-center gap-3">
        <!-- <NuxtLink
          class="px-[1.25em] py-[0.5em] inline-block rounded-md bg-yellow-500 border border-transparent text-dark-800 font-semibold md:(text-lg) lg:(text-2xl) hover:(opacity-80)"
          to="/menu"
          >Меню</NuxtLink
        > -->
        <BaseButtonPrimary is-link url="/menu"> Меню </BaseButtonPrimary>
        <BaseButtonSecondary is-link url="#catalogue">
          Каталог
        </BaseButtonSecondary>
        <!-- <NuxtLink
          class="px-[1.25em] py-[0.5em] inline-block rounded-md bg-transparent text-yellow-500 border border-solid border-yellow-500 font-semibold md:(text-lg) lg:(text-2xl) hover:(text-yellow-500 opacity-80)"
          to="#catalogue"
          >Каталог</NuxtLink
        > -->
      </div>
    </BaseContainer>

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
            ? `${blok.bg.filename}/m/${width}x0`
            : `${blok.bg.filename}/m/`
        "
      />

      <!-- <img
        :src="`${blok.bg.filename}/m/`"
        :alt="blok.bg.alt || blok.title"
        class="absolute inset-0 object-cover w-full h-full -z-1 filter brightness-60"
      /> -->
      <NuxtImg
        preload
        provider="storyblok"
        :src="`${blok.bg.filename}/m/`"
        :alt="blok.bg.alt || blok.title"
        class="absolute inset-0 object-cover w-full h-full -z-1 filter brightness-60"
      />
    </picture>
    <!-- loading="lazy" -->
  </section>
</template>

<script setup>
import { computed } from '@nuxtjs/composition-api';
import { useStoryblokApi } from '@storyblok/nuxt-2';
import BaseContainer from '../Base/BaseContainer.vue';
import BaseButtonPrimary from '../Base/BaseButtonPrimary.vue';
import BaseButtonSecondary from '../Base/BaseButtonSecondary.vue';
import { WIDTH_FOR_IMG_SOURCES } from '~/utils/config';
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

/* function observeHeroSection() {
  const options = {
    threshold: 0,
  };

  function observeFunc(entries, observer) {
    console.log({ entries, observer });
  }

  return new IntersectionObserver(observeFunc, options);
}

onMounted(() => {
  const observer = observeHeroSection();
  console.log('observer: ', observer);

  const heroSectionEl = document.querySelector('section.hero');
  console.log('heroSectionEl: ', heroSectionEl);

  observer.observe(heroSectionEl);
}); */
</script>

<style lang="scss" scoped></style>
