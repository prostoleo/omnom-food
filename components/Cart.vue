<template>
  <div>
    <div
      class="cart fixed right-0 top-0 bottom-0 min-w-xs w-4/5 max-w-lg bg-white rounded-sm isolate text-dark-800 grid overflow-hidden transform translate-x-full duration-200"
      :class="{ '!translate-x-0': cartStore.getIsCartShown }"
      style="z-index: 100"
    >
      <header
        class="cart__header flex items-center justify-between border-b border-solid border-gray-200 p-2"
      >
        <h2 class="text-xl font-bold leading-none mb-1">Корзина</h2>

        <button aria-label="Закрыть корзину" @click="cartStore.hideCart()">
          <b-icon icon="arrow-right"></b-icon>
        </button>
      </header>

      <div class="cart__body py-5 px-2 overflow-y-auto">
        <transition-group
          v-if="items.length > 0"
          class="cart__rows grid gap-4"
          name="cart-item"
          tag="ul"
          enter-active-class="transform-gpu"
          enter-class="opacity-0 -translate-x-full"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transform-gpu"
          leave-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-full"
        >
          <li
            v-for="item in items"
            :key="item.id"
            class="flex items-center gap-2 transform transition-all duration-200"
          >
            <img
              class="rounded-full aspect-square lg:(w-24 h-24 )"
              :src="item.image"
              :alt="item.name"
              width="50"
              height="50"
              loading="lazy"
            />
            <div
              class="text-with-controlers flex items-center justify-between w-full"
            >
              <div>
                <h3 class="font-semibold hyphens-auto lg:(text-lg)">
                  {{ item.name }}
                </h3>
                <div class="count inline-flex items-center gap-1">
                  <button
                    class="hover:(text-red-400)"
                    @click="cartStore.decreaseQuantity(item.id)"
                  >
                    <b-icon icon="minus"></b-icon>
                  </button>
                  <span class="count lg:(text-lg)">{{ item.quantity }}</span>
                  <button
                    class="hover:(text-green-400)"
                    @click="cartStore.increaseQuantity(item.id)"
                  >
                    <b-icon icon="plus"></b-icon>
                  </button>
                </div>
              </div>

              <div class="flex items-center gap-2 ml-3">
                <span class="price font-semibold lg:(text-lg)">{{
                  priceFormatter(item.price)
                }}</span>

                <button
                  class="text-red-400 opacity-50 hover:(opacity-100)"
                  @click="cartStore.removeFromCart(item.id)"
                >
                  <b-icon icon="delete"></b-icon>
                </button>
              </div>
            </div>
          </li>
        </transition-group>

        <div
          v-else
          class="w-full h-full flex flex-col items-center justify-center"
        >
          <b-icon icon="emoticon-sad"></b-icon>

          <p class="text-center">Здесь пока пусто..</p>
        </div>
      </div>

      <footer class="p-2 border border-t border-gray-200">
        <div class="row flex items-center justify-between">
          <h4 class="font-semibold">Итого:</h4>

          <span class="total-price font-bold">
            {{ priceFormatter(cartStore.getTotalPrice) }}
          </span>
        </div>

        <BaseButtonPrimary
          class="mt-[1.5em] block w-full !font-bold"
          aria-label="К оплате"
          @click.native="
            cartStore.getCartItems.length > 0 && cartStore.showOrderProcess()
          "
        >
          Оплатить
        </BaseButtonPrimary>
      </footer>
      <!-- </div> -->
      <!-- </transition> -->
    </div>

    <OrderProcess />
  </div>
</template>

<script setup>
import { computed } from '@nuxtjs/composition-api';
import OrderProcess from './OrderProcess.vue';
import BaseButtonPrimary from './Base/BaseButtonPrimary.vue';
import priceFormatter from '~/utils/priceFormatter';
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();

const items = computed(() => cartStore.getCartItems);
</script>

<style lang="scss" scoped>
.cart {
  grid-template-rows: minmax(min-content, max-content) 1fr minmax(
      min-content,
      max-content
    );
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
