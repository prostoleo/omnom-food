<template>
  <!-- grid grid-rows-[auto, 1fr] h-full -->
  <div
    v-editable="blok"
    class="card-custom overflow-hidden shadow shadow-md shadow-gray-400/30 rounded-md overflow-hidden grid grid-rows-[auto, 1fr] h-full w-full max-w-96"
  >
    <!-- <pre>{{ blok.images[0] }}</pre> -->
    <!-- <pre>{{ blok.images[0].filename }}</pre> -->

    <img
      class="w-full object-cover max-w-96 max-h-96 aspect-square"
      :src="`${blok.images[0].filename}/m/394x394/filters:quality(50)`"
      :alt="blok.name"
      loading="lazy"
      width="384"
      height="384"
    />
    <!-- grid grid-rows-[20%, 1fr, auto] -->
    <div class="card-body p-3 grid grid-rows-[min-content, 1fr, auto]">
      <h3 class="text-xl leading-tight font-semibold md:(text-2xl)">
        {{ blok.name }}
      </h3>
      <p
        class="mt-2 leading-normal text-lg"
        v-html="richtext(blok.description)"
      ></p>

      <!-- self-end -->
      <div class="mt-4 flex items-center justify-between self-end">
        <span class="price uppercase font-semibold text-lg leading-none">{{
          priceFormatter(blok.price)
        }}</span>
        <button
          class="inline-block px-4 py-2 text-yellow-500 rounded-md border-2 border-solid border-yellow-500 font-semibold transition-colors duration-150 hover:(bg-yellow-500 text-white) focus:(bg-yellow-500 text-white)"
          add-to-cart
          aria-label="Добавить в корзину"
          @click="addToCart"
        >
          <b-icon icon="cart" size="is-small"> </b-icon>
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { richtext } from '~/utils/richtext';
import priceFormatter from '~/utils/priceFormatter';
import { useCartStore } from '~/store/cart';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

function addToCart() {
  // console.log(`add to cart`);
  // console.log('blok: ', props.blok);
  const goodData = {
    id: props.blok._uid,
    name: props.blok.name,
    price: Number.parseInt(props.blok.price),
    image: `${props.blok.images[0].filename}/m/`,
  };

  cartStore.addToCart(goodData);
}
</script>

<style lang="scss" scoped></style>
