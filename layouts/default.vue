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
      class="fixed bottom-22 right-3 p-3 rounded-md bg-dark-800 shadow shadow-lg shadow-light-200/40 text-white"
      aria-label="переместиться наверх страницы"
      @click="scrollToTop"
    >
      <b-icon icon="arrow-up-thick"></b-icon>
    </button>
    <button
      class="fixed block !m-0 bottom-5 right-3 p-3 rounded-md bg-yellow-500 shadow shadow-lg shadow-light-200/40 overflow-visible text-dark transition transition-all"
      aria-label="открыть корзину"
      @click="showCart"
    >
      <b-icon icon="cart-outline"></b-icon>
      <span
        v-if="cartStore.getTotalQuantities"
        class="w-6 h-6 inline-flex justify-center items-center absolute top-0 right-0 text-sm font-semibold rounded-full bg-red-400 text-white transform -translate-y-1/2 translate-x-1/2"
      >
        {{ cartStore.getTotalQuantities }}
      </span>
    </button>

    <Cart />
    <div
      v-if="cartStore.getIsCartShown"
      class="cart-overlay bg-black/60 fixed left-0 top-0 right-0 bottom-0 w-screen h-screen z-50 cursor-pointer"
      @click.self="cartStore.hideCart()"
    ></div>
  </div>
</template>

<script setup>
// import { onMounted, useRouter } from '@nuxtjs/composition-api';
import useScrollToTop from '~/composables/scrollToTop';
import BaseHeader from '~/components/Base/BaseHeader.vue';
import BaseFooter from '~/components/Base/BaseFooter.vue';
import Cart from '~/components/Cart.vue';
import { useCartStore } from '~/store/cart';

const { scrollToTop, showScrollToTop } = useScrollToTop();

const cartStore = useCartStore();
// console.log('cartStore: ', cartStore);

const showCart = () => {
  // document.querySelector('html').classList.add('!overflow-y-hidden');
  cartStore.showCart();
};
</script>

<style lang="scss" scoped>
.website-wrapper {
  grid-template-rows:
    minmax(min-content, max-content) 1fr
    minmax(min-content, max-content);
}

.cart-enter-active {
  transition: transform 250ms ease-in-out;
}
.cart-leave-active {
  transition: transform 250ms ease-in-out;
}

.cart-enter-to,
.cart-leave-from {
  transform: translateX(0%);
}
.cart-leave-to,
.cart-enter-from {
  transform: translateX(120%);
}
</style>
