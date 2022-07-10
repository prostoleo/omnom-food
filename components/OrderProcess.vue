<template>
  <!-- translate-x-full -->
  <!-- :class="{ '!translate-x-0': orderProcessStore.getIsOrderProcessShown }" -->
  <div
    class="order fixed right-0 top-0 bottom-0 min-w-xs w-full bg-white rounded-sm isolate text-dark-800 grid overflow-hidden translate-x-full transform duration-200"
    :class="{ '!translate-x-0': cartStore.getIsOrderProcessShown }"
    style="z-index: 101"
  >
    <!-- <div class="container mx-auto !max-w-2xl w-full h-full order"> -->
    <header class="order__header border-b border-solid border-gray-200 p-2">
      <div class="container flex items-center justify-between">
        <div class="inline-flex items-center gap-2">
          <button
            aria-label="назад к корзине"
            @click="cartStore.hideOrderProcess()"
          >
            <b-icon icon="arrow-left"></b-icon>
          </button>
          <h2 class="text-xl font-bold leading-none mb-1">Оформление заказа</h2>
        </div>

        <button
          aria-label="Закрыть оформление заказа и корзину"
          @click="closeOrderAndCart"
        >
          <b-icon icon="close"></b-icon>
        </button>
      </div>
    </header>

    <div class="order__body py-5 px-2 overflow-y-auto">
      <div class="container">
        <div>
          <h3>Контактные данные</h3>
          <div class="grid gap-2 md:(gap-3 grid-cols-2)">
            <div class="for-input">
              <input
                id="name"
                v-model="name.val"
                type="text"
                @input="name.touched = true"
              />
              <label for="name">Ваше имя<sup>*</sup></label>
              <small v-if="nameError">Укажите Ваше имя</small>
            </div>
            <div class="for-input">
              <input
                id="phone"
                v-model="phone.val"
                type="text"
                @input="phone.touched = true"
              />
              <label for="phone">Номер телефона<sup>*</sup></label>
              <small v-if="phoneError">Введите свой номер телефона</small>
            </div>

            <div class="for-input">
              <input
                id="address"
                v-model="address.val"
                type="text"
                @input="address.touched = true"
              />
              <label for="address">Адрес<sup>*</sup></label>
              <small v-if="addressError">Укажите адрес доставки</small>
            </div>
            <div class="for-input">
              <input
                id="email"
                v-model="email.val"
                type="text"
                @input="email.touched = true"
              />
              <label for="email">Email</label>
              <small v-if="emailError">email не валидный</small>
            </div>
          </div>
        </div>
        <div class="deliver">
          <h3 class="">Доставка</h3>

          <p class="mb-4">Условия доставки:</p>
          <p class="mb-2">
            Доставка осуществляется курьером. При заказе на сумму от 1000 руб.
            доставка по г.Омску осуществляется бесплатно. Стоимость доставки по
            г. Томску заказа на сумму менее 1000 руб составляет 250 руб.
            Стоимость доставки за пределы г. Томска определяется индивидуально,
            будет осуществлена в ближайшее время. Подробности вы можете всегда
            уточнить у менеджера, оставив заявку на обратный звонок, и мы с вами
            свяжемся.
          </p>

          <NuxtLink to="/#deliver">Подробнее о доставке</NuxtLink>
        </div>
        <div class="payment mt-4">
          <h3>Оплата</h3>

          <div class="grid grid-cols-2 gap-4">
            <b-radio-button
              v-model="chosenPaymentMethod"
              :native-value="PAYMENT_METHODS.ONLINE"
              type="is-primary is-light is-outlined"
            >
              <!-- <b-icon icon="cash-sync"></b-icon> -->
              <span>{{ PAYMENT_METHODS.ONLINE }}</span>
            </b-radio-button>

            <b-radio-button
              v-model="chosenPaymentMethod"
              :native-value="PAYMENT_METHODS.WITH_DELIVERY"
              type="is-primary is-light is-outlined"
            >
              <!-- <b-icon icon="package-check"></b-icon> -->
              <span>{{ PAYMENT_METHODS.WITH_DELIVERY }}</span>
            </b-radio-button>
          </div>
        </div>
      </div>
    </div>

    <footer class="p-2 border border-t border-gray-200 self-end">
      <div class="container">
        <div class="row flex items-center justify-between">
          <h4 class="font-semibold">Итого:</h4>

          <span class="total-price font-bold">
            {{ priceFormatter(cartStore.getTotalPrice) }}
          </span>
        </div>

        <BaseButtonPrimary
          class="mt-[1.5em] block w-full !font-bold mb-0"
          aria-label="К оплате"
        >
          Подтвердить заказ
        </BaseButtonPrimary>

        <small class="block text-center my-1 mx-auto">
          Нажимая на кнопку, я даю согласие с
          <NuxtLink to="/politics">с политикой конфиденциальности</NuxtLink>
        </small>
      </div>
    </footer>
    <!-- </div> -->
    <!-- </transition> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import { computed, reactive, ref } from '@nuxtjs/composition-api';
import BaseButtonPrimary from './Base/BaseButtonPrimary.vue';
import { useCartStore } from '~/store/cart';
import priceFormatter from '~/utils/priceFormatter';
import { REG_EXP_PHONE } from '~/utils/regexpPhone';

const cartStore = useCartStore();

const PAYMENT_METHODS = {
  ONLINE: 'Онлайн',
  WITH_DELIVERY: `При получении`,
};

const chosenPaymentMethod = ref('');

const name = reactive({
  val: '',
  error: false,
  touched: false,
});

const phone = reactive({
  val: '',
  error: false,
  touched: false,
});

const address = reactive({
  val: '',
  error: false,
  touched: false,
});

const email = reactive({
  val: '',
  error: false,
  touched: false,
});

const nameError = computed(() => {
  return name.val.length === 0 && name.touched;
});
const phoneError = computed(() => {
  const regexp = REG_EXP_PHONE;
  const regExpTest = regexp.test(phone.val);
  return !regExpTest && phone.touched;
});
const addressError = computed(() => {
  return address.val.length === 0 && address.touched;
});
const emailError = computed(() => {
  return (
    email.val.length > 0 &&
    !email.val.includes('@') &&
    !email.val.includes('.') &&
    name.touched
  );
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const totalError = computed(() => {
  return (
    nameError.value ||
    phoneError.value ||
    addressError.value ||
    emailError.value ||
    chosenPaymentMethod.value
  );
});

function closeOrderAndCart() {
  cartStore.hideOrderProcess();
  cartStore.hideCart();
}
</script>

<style lang="scss" scoped>
.container {
  // max-width: 768px !important;
  @apply max-w-2xl;
}

.for-input {
  @apply relative flex flex-col-reverse gap-1 pb-5;

  input {
    @apply max-w-full p-2 border border-gray-300 rounded-sm focus:(border-yellow-500 outline-transparent);
  }
  label {
    @apply font-medium;

    sup {
      @apply text-red-500;
    }
  }

  small {
    @apply text-red-500 absolute bottom-0;
  }
}

.order {
  grid-template-rows: minmax(min-content, max-content) 1fr minmax(
      min-content,
      max-content
    );

  .order__body {
    h3 {
      @apply font-semibold text-lg mb-[0.5em];
    }
  }
}
</style>
