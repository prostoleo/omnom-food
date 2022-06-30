<template>
  <!-- grid grid-rows-[auto, 1fr] h-full -->
  <div v-editable="blok" class="card overflow-hidden">
    <!-- <pre>{{ blok.images[0] }}</pre> -->
    <!-- <pre>{{ blok.images[0].filename }}</pre> -->

    <img
      class="w-full object-cover"
      :src="`${blok.images[0].filename}/m/`"
      :alt="blok.name"
    />
    <!-- grid grid-rows-[20%, 1fr, auto] -->
    <div class="card-body p-3">
      <h3 class="text-xl leading-tight font-semibold md:(text-2xl)">
        {{ blok.name }}
      </h3>
      <p
        class="mt-2 leading-normal text-lg"
        v-html="richtext(blok.description)"
      ></p>

      <!-- self-end -->
      <div class="mt-4 flex items-center justify-between">
        <span class="price uppercase font-semibold text-lg leading-none">{{
          price(blok.price)
        }}</span>
        <button
          class="inline-block px-4 py-2 text-yellow-500 rounded-md border-2 border-solid border-yellow-500 font-semibold transition-colors duration-150 hover:(bg-yellow-500 text-white) focus:(bg-yellow-500 text-white)"
          add-to-cart
          aria-label="Добавить в корзину"
        >
          <b-icon icon="cart" size="is-small"> </b-icon>
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoryblokApi } from '@storyblok/nuxt-2';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const storyApi = useStoryblokApi();
// console.log('storyApi: ', storyApi);

const richtext = (text) => {
  return storyApi.richTextResolver.render(text);
};

const price = (number) => {
  return new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};
</script>

<style lang="scss" scoped></style>
