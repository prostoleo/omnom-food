<template>
  <section
    v-editable="blok"
    hero-section
    class="relative min-h-[50vh] grid items-center"
  >
    <BaseContainer class="text-white">
      <h1
        class="text-[28px] leading-tight font-bold md:(text-4xl) lg:(text-5xl)"
      >
        {{ blok.title }}
      </h1>
      <!-- <div class="links-block mt-7 flex items-center gap-3">
        
      </div> -->
    </BaseContainer>

    <img
      :src="blok.image.filename"
      :alt="blok.image.alt || blok.title"
      class="absolute inset-0 object-cover w-full h-full -z-1 filter brightness-60"
      loading="lazy"
    />
  </section>
</template>
</template>

<script setup>
import BaseContainer from '../Base/BaseContainer.vue';
defineProps({
  blok: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>

</style>