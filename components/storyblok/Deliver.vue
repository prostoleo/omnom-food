<template>
  <section
    class="deliver-section relative py-10 min-h-[50vh] text-white grid items-center overflow-hidden"
  >
    <BaseContainer>
      <!-- <pre>{{ blok }}</pre> -->
      <BaseSectionTitle>
        {{ blok.title }}
      </BaseSectionTitle>
      <!-- <h2 class="text-3xl">{{ blok.title }}</h2> -->

      <div class="mt-5 text-light-100" v-html="richtext(blok.text)"></div>

      <!-- <button>{{ blok.button_text }}</button> -->
      <BaseButtonSecondary class="mt-5">
        {{ blok.button_text }}
      </BaseButtonSecondary>
    </BaseContainer>
    <img
      class="absolute inset-0 w-full h-full object-cover -z-1 filter brightness-60"
      :src="`${blok.image.filename}/m/`"
      :alt="`условия доставки`"
    />
  </section>
</template>

<script setup>
import BaseContainer from '../Base/BaseContainer.vue';
import BaseSectionTitle from '../Base/BaseSectionTitle.vue';
import BaseButtonSecondary from '../Base/BaseButtonSecondary.vue';
import { richtext } from '~/utils/richtext';

defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
