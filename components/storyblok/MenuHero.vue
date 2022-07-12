<template>
  <section
    v-editable="blok"
    hero-section
    class="relative min-h-[50vh] flex items-center justify-center
    "
  >
    <BaseContainer class="text-white">
      <h1
        class="text-[28px] leading-tight font-bold md:(text-4xl) lg:(text-5xl) text-center"
      >
        {{ blok.title }}
      </h1>
      <!-- <div class="links-block mt-7 flex items-center gap-3">
        
      </div> -->
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
            ? `${blok.image.filename}/m/${width}x0`
            : `${blok.image.filename}/m/`
        "
      />

      
      <img
        :src="blok.image.filename"
      :alt="blok.image.alt || blok.title"
      class="absolute inset-0 object-cover w-full h-full -z-1 filter brightness-60"
      />
    </picture>

    <!-- <img
      :src="blok.image.filename"
      :alt="blok.image.alt || blok.title"
      class="absolute inset-0 object-cover w-full h-full -z-1 filter brightness-60"
    /> -->
      <!-- loading="lazy" -->
  </section>
</template>
</template>

<script setup>
import BaseContainer from '../Base/BaseContainer.vue';
import {WIDTH_FOR_IMG_SOURCES} from '~/utils/config'
defineProps({
  blok: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>

</style>