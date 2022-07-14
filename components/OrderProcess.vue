<template>
  <div
    class="order fixed right-0 top-0 bottom-0 min-w-xs w-full bg-white rounded-sm isolate text-dark-800 grid overflow-hidden translate-x-full transform duration-200 lg:(duration-300) xl:(duration-500)"
    :class="{ '!translate-x-0': cartStore.getIsOrderProcessShown }"
    style="z-index: 101"
  >
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
              :key="PAYMENT_METHODS.ONLINE"
              v-model="chosenPaymentMethod"
              :native-value="PAYMENT_METHODS.ONLINE"
              type="is-primary is-light is-outlined"
            >
              <!-- <b-icon icon="cash-sync"></b-icon> -->
              <span>{{ PAYMENT_METHODS.ONLINE }}</span>
            </b-radio-button>

            <b-radio-button
              :key="PAYMENT_METHODS.WITH_DELIVERY"
              v-model="chosenPaymentMethod"
              :native-value="PAYMENT_METHODS.WITH_DELIVERY"
              type="is-primary is-light is-outlined"
            >
              <!-- <b-icon icon="package-check"></b-icon> -->
              <span>{{ PAYMENT_METHODS.WITH_DELIVERY }}</span>
            </b-radio-button>
          </div>
        </div>
        <div
          v-if="chosenPaymentMethod === PAYMENT_METHODS.ONLINE"
          class="payment-online mt-4"
        >
          <h3>Выбора метода оплаты онлайн</h3>

          <div class="grid grid-cols-2 gap-4">
            <b-radio-button
              :key="ONLINE_PAYMENT_METHODS.YOU_MONEY.LABEL"
              v-model="chosenOnlinePaymentMethods"
              :native-value="ONLINE_PAYMENT_METHODS.YOU_MONEY.VALUE"
              type="is-primary is-light is-outlined"
            >
              <!-- <b-icon icon="cash-sync"></b-icon> -->
              <span>{{ ONLINE_PAYMENT_METHODS.YOU_MONEY.LABEL }}</span>
            </b-radio-button>

            <b-radio-button
              :key="ONLINE_PAYMENT_METHODS.BANK_CARD.LABEL"
              v-model="chosenOnlinePaymentMethods"
              :native-value="ONLINE_PAYMENT_METHODS.BANK_CARD.VALUE"
              type="is-primary is-light is-outlined"
            >
              <!-- <b-icon icon="package-check"></b-icon> -->
              <span>{{ ONLINE_PAYMENT_METHODS.BANK_CARD.LABEL }}</span>
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

        <!-- v-if="chosenPaymentMethod === PAYMENT_METHODS.WITH_DELIVERY" -->
        <BaseButtonPrimary
          v-if="chosenPaymentMethod !== PAYMENT_METHODS.ONLINE"
          class="mt-[1.5em] block w-full !font-bold mb-0"
          aria-label="К оплате"
          @click.native="submitOrder"
        >
          Подтвердить заказ
        </BaseButtonPrimary>
        <form
          v-if="chosenPaymentMethod === PAYMENT_METHODS.ONLINE"
          id="hidden-inputs"
          ref="hiddenForm"
          method="POST"
          action="https://yoomoney.ru/quickpay/confirm.xml"
          @submit.prevent="submitOrder"
        >
          <!-- @submit.prevent="submitOrder" -->
          <input type="hidden" name="receiver" :value="WALLET_ID" />
          <input
            type="hidden"
            name="formcomment"
            value="Заказ из магазина ОМНОМ"
          />
          <input
            type="hidden"
            name="short-dest"
            value="Заказ из магазина ОМНОМ"
          />
          <input type="hidden" name="label" :value="`$${orderId}`" />
          <input type="hidden" name="quickpay-form" value="shop" />
          <input
            type="hidden"
            name="targets"
            :value="`оплата заказа ${orderId}`"
          />
          <input type="hidden" name="sum" :value="total" data-type="number" />
          <input type="hidden" name="need-fio" value="true" />
          <input type="hidden" name="need-email" value="true" />
          <input type="hidden" name="need-phone" value="true" />
          <input type="hidden" name="need-address" value="true" />
          <input type="hidden" name="successUrl" :value="successUrl" />
          <label class="hidden"
            ><input
              type="radio"
              name="paymentType"
              value="PC"
              :checked="chosenOnlinePaymentMethods === 'PC'"
            />ЮMoney</label
          >
          <label class="hidden"
            ><input
              type="radio"
              name="paymentType"
              value="AC"
              :checked="chosenOnlinePaymentMethods === 'AC'"
            />Банковской картой</label
          >
          <input
            class="px-[1.25em] py-[0.5em] inline-block rounded-md bg-yellow-500 border border-transparent text-dark-800 font-semibold md:(text-lg) lg:(text-2xl) hover:(opacity-80) mt-[1.5em] block w-full !font-bold mb-0 cursor-pointer"
            type="submit"
            value="Оплатить"
          />
          <!-- @click="submitOrder" -->
        </form>

        <small class="block text-center my-1 mx-auto">
          Нажимая на кнопку, я даю согласие с
          <NuxtLink to="/politics">с политикой конфиденциальности</NuxtLink>
        </small>
      </div>
    </footer>
    <b-loading
      v-if="isLoading"
      v-model="isLoading"
      :is-full-page="true"
    ></b-loading>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import {
  ToastProgrammatic as Toast,
  // LoadingProgrammatic as Loading,
} from 'buefy';

import {
  computed,
  reactive,
  ref,
  watch,
  useRoute,
} from '@nuxtjs/composition-api';
import BaseButtonPrimary from './Base/BaseButtonPrimary.vue';
import { useCartStore } from '~/store/cart';
import priceFormatter from '~/utils/priceFormatter';
import { REG_EXP_PHONE } from '~/utils/regexpPhone';

const isLoading = ref(false);
const cartStore = useCartStore();

const route = useRoute();

const successUrl = `${window.location.origin}/?payment=success`;
// console.log('successUrl: ', successUrl);

const hiddenForm = ref();
// const inputNames = ['receiver', 'show']
let hiddenData = reactive({});
watch(hiddenForm, (val) => {
  if (val) {
    // console.log('hiddenForm: ', hiddenForm);

    const inputs = Array.from(
      hiddenForm.value.querySelectorAll('input[type="hidden"]')
    );
    // console.log('inputs: ', inputs);
    const data = inputs.reduce((obj, input) => {
      // console.log('obj: ', obj);
      // console.log('input.name: ', input.name);
      // console.log('input.value: ', input.value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const name = input.name;

      obj[name] = input.value;
      return obj;
    }, {});
    // console.log('data: ', data);

    hiddenData = data;
  }
});

const PAYMENT_METHODS = {
  ONLINE: 'Онлайн',
  WITH_DELIVERY: `При получении`,
};

const ONLINE_PAYMENT_METHODS = {
  YOU_MONEY: {
    VALUE: 'PC',
    LABEL: 'ЮMoney',
  },
  BANK_CARD: {
    VALUE: 'AC',
    LABEL: `Банковской картой`,
  },
};

const WALLET_ID = process.env.YOU_MONEY_WALLET_ID;
// console.log('WALLET_ID: ', WALLET_ID);

const chosenPaymentMethod = ref('');
const chosenOnlinePaymentMethods = ref('');

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

const orderId = ref(uuidv4());
// console.log('orderId: ', orderId);

const isOrderShownComputed = computed(() => cartStore.getIsOrderProcessShown);

watch(isOrderShownComputed, (newVal, oldVal) => {
  // console.log('newVal: ', newVal);
  if (newVal && newVal !== oldVal) {
    orderId.value = uuidv4();
    // console.log('orderId.value: ', orderId.value);
  }
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
    !chosenPaymentMethod.value
  );
});

const someInputHasNoValue = computed(() => {
  const arrToCheck =
    chosenPaymentMethod.value === PAYMENT_METHODS.WITH_DELIVERY
      ? [name.val, phone.val, address.val, chosenPaymentMethod.value]
      : [
          name.val,
          phone.val,
          address.val,
          chosenPaymentMethod.value,
          chosenOnlinePaymentMethods.value,
        ];

  return arrToCheck.some((v) => {
    // console.log('v: ', v);
    return v.length === 0;
  });
});

const total = cartStore.getCartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);
// console.log('total: ', total);

function closeOrderAndCart() {
  cartStore.hideOrderProcess();
  cartStore.hideCart();
}

// eslint-disable-next-line require-await
async function submitOrder() {
  try {
    // console.log('everyInputHasValue.value: ', everyInputHasValue.value);
    // console.log('someInputHasNoValue.value: ', someInputHasNoValue.value);
    if (totalError.value || someInputHasNoValue.value) {
      Toast.open({
        message: `Заполните обязательные поля, а также выберите способ оплаты`,
        pauseOnHover: true,
        duration: 5000,
        type: 'is-danger',
      });
      return;
    }

    const cartItems = JSON.parse(JSON.stringify(cartStore.$state.cartItems));
    // console.log('cartItems: ', cartItems);

    const orderData = {
      orderId: orderId.value,
      name: name.val,
      phone: phone.val,
      address: address.val,
      ...(email.val && { email: email.val }),
      cartItems,
      subject: `Новый заказ с сайта ${window.location.origin}`,
      fromWebsite: window.location.origin,
    };
    // console.log('orderData: ', orderData);

    isLoading.value = true;

    const response = await fetch(process.env.YANDEX_ORDER_SUBMIT, {
      method: 'POST',
      headers: {
        Accept: '/',
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(orderData),
    });
    // console.log('response: ', response);

    if (!response.ok) {
      throw new Error(response.message);
    }

    if (chosenPaymentMethod.value === PAYMENT_METHODS.WITH_DELIVERY) {
      isLoading.value = false;

      Toast.open({
        message: `Ваш заказ принят на обработку. С Вами свяжутся как можно скорее`,
        pauseOnHover: true,
        duration: 5000,
        type: 'is-success',
      });
      cartStore.removeItemsFromLocalStorage();
      cartStore.$reset();

      return;
    }

    if (chosenPaymentMethod.value === PAYMENT_METHODS.ONLINE) {
      isLoading.value = false;

      hiddenForm.value.submit();
      return;
    }
  } catch (error) {
    console.log(error);
    isLoading.value = false;

    Toast.open({
      message: `Упс, произошла ошибка. Пожалуйста, попробуйте позже`,
      pauseOnHover: true,
      duration: 5000,
      type: 'is-danger',
    });
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 768px !important;
  // @apply max-w-2xl;
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
