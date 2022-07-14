<template>
  <Transition
    name="nested"
    duration="550"
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <!-- @beforeEnter="beforeEnter" -->
    <div
      v-if="props.showDialog"
      class="overlay bg-black/70 fixed inset-0 flex items-center justify-center isolate z-100 hidden"
      @click.self="emit('close-dialog')"
    >
      <div
        class="dialog bg-white rounded-md m-3 w-full max-w-xl transform -translate-y-1/2 opacity-0"
      >
        <header
          class="dialog__header flex items-center justify-between p-2 text-black overflow-hidden border-b border-b-gray-300"
        >
          <h3 class="text-xl font-semibold">Оставьте заявку</h3>
          <button class="btn mt-1 p-2" @click="emit('close-dialog')">
            <b-icon icon="close"></b-icon>
          </button>
        </header>
        <div class="dialog__body p-2 text-black overflow-y-auto">
          <p class="text-gray-500">
            Менеджер свяжется с вами, ответит на вопросы и поможет оформить
            заказ
          </p>
          <form class="mt-5" @submit.prevent="submitHandler">
            <div class="flex flex-col gap-7">
              <div class="form-row relative">
                <input
                  id="name"
                  v-model.trim="name.val"
                  class="w-full border-b p-2"
                  :class="{ active: name.val.length > 0 }"
                  type="text"
                  @blur="name.touched = true"
                />
                <label
                  class="absolute left-2 top-2 pointer-events-none transform translate-y-0 transition-all duration-150"
                  for="name"
                  >Ваше имя</label
                >
                <small
                  v-if="nameError"
                  class="absolute text-sm text-red-400 pl-2"
                  >Это поле обязательно для заполнения</small
                >
              </div>
              <div class="form-row relative">
                <input
                  id="phone"
                  v-model.trim="phone.val"
                  class="tel w-full border-b p-2"
                  :class="{ active: phone.val.length > 0 }"
                  type="text"
                  @blur="phone.touched = true"
                />
                <label
                  class="absolute left-2 top-2 pointer-events-none transition-all transform translate-y-0 transition-all duration-150"
                  for="phone"
                  >Ваш телефон</label
                >
                <small
                  v-if="phoneError"
                  class="absolute text-sm text-red-400 pl-2"
                  >Введите свой номер телефона</small
                >
              </div>
            </div>
            <b-field class="mt-10">
              <b-checkbox v-model="agreeWithPolicy" type="is-primary">
                Нажимая на кнопку, вы даете согласие на обработку своих
                персональных данных и соглашаетесь
                <NuxtLink to="/politics"
                  >с политикой конфиденциальности</NuxtLink
                >
              </b-checkbox>
            </b-field>

            <BaseButtonPrimary class="block w-full mt-7">
              Отправить
            </BaseButtonPrimary>
          </form>
        </div>
      </div>
      <b-loading
        v-if="isLoading"
        v-model="isLoading"
        :is-full-page="true"
      ></b-loading>
    </div>
  </Transition>
</template>

<script setup>
import {
  ToastProgrammatic as Toast,
  // LoadingProgrammatic as Loading,
} from 'buefy';
import {
  ref,
  reactive,
  onMounted,
  computed,
  // watch,
} from '@nuxtjs/composition-api';
import BaseButtonPrimary from './BaseButtonPrimary.vue';
import useDialogAnimation from '~/composables/animation/useDialogAnimation';
// import maskPhone from '~/utils/maskPhone';

// const showDialog = ref(false);
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close-dialog']);

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
const agreeWithPolicy = ref(false);
const isLoading = ref(false);

const nameError = computed(() => name.val.length === 0 && name.touched);
/**
 * * если maskPhone работал бы
 */
// const phoneError = computed(() => phone.val.length !== 18 && phone.touched);
/**
 * * без рабочего maskPhone - проверяем есть ли присутсвуют только цифры, пробелы, +, - и скобки
 */
const phoneError = computed(() => {
  const regexp = /^[0-9" "\-+()]+$/gm;
  const regExpTest = regexp.test(phone.val);
  return !regExpTest && phone.touched;
  // phone.val.match('/^[0-9" "-+()]+$/') && phone.touched
});
// const agreeError = computed(() => !agreeWithPolicy.value);

const totalError = computed(
  () => nameError.value || phoneError.value || !agreeWithPolicy.value
);

onMounted(() => {
  // maskPhone();
});
/* const showDialogComputed = computed(() => props.showDialog);

watch(showDialogComputed, (newVal) => {
  if (newVal) {
    // newVal
    console.log('newVal: ', newVal);
    maskPhone();
  }
}); */

function setToDefault() {
  name.val = '';
  name.touched = false;
  name.error = false;

  phone.val = '';
  phone.touched = false;
  phone.error = false;

  agreeWithPolicy.value = false;
}

const { enter, leave } = useDialogAnimation();

// eslint-disable-next-line require-await
async function submitHandler() {
  try {
    // console.log('totalError.value: ', totalError.value);
    if (totalError.value) {
      Toast.open({
        message: ` Укажите Ваше имя, номер телефона и согласитесь с обработкой персональных данных `,
        pauseOnHover: true,
        duration: 5000,
        type: 'is-danger',
      });
      return;
    }

    const dataToSubmit = {
      name: name.val.trim(),
      email: 'email не нужен',
      message: ` не нужен `,
      phone: phone.val,
      subject: `Заявка с сайта omnom`,
      fromWebsite: window.location.href,
    };
    // console.log('dataToSubmit: ', dataToSubmit);

    const url = process.env.YANDEX_FUNC_SUBMIT;
    // console.log('path: ', path);
    // console.log('formData: ', formData);

    isLoading.value = true;
    // Loading.open();
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        Accept: '/',
        // 'Content-type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json; charset=utf-8',
        // 'Content-Type': 'application/json',
        'Content-Type': 'text/plain',
      },
      // body: dataToSubmit,
      body: JSON.stringify(dataToSubmit),
    });
    // isLoading.value = false;
    // Loading.close();

    // console.log('response: ', response);

    if (!response.ok) {
      throw new Error(response.errorMessage);
    }
    // console.log('data: ', data);
    // context.$buefy
    // console.log('context.$buefy: ', context.$buefy);
    isLoading.value = false;
    Toast.open({
      message: `Сообщение успешно отправлено`,
      pauseOnHover: true,
      duration: 5000,
      type: 'is-success',
    });
    setTimeout(() => {
      emit('close-dialog');
    }, 0);
    setToDefault();
  } catch (error) {
    console.log('error: ', error);
    isLoading.value = false;
    Toast.open({
      message: `Упс, прозошла какая-то ошибка 😞 Попробуйте позже `,
      pauseOnHover: true,
      duration: 5000,
      type: 'is-danger',
    });
  }
}
</script>

<style lang="scss" scoped>
form {
  .form-row {
    input.active + label,
    input:focus + label {
      @apply transform origin-left -translate-y-4 scale-80 transition-all duration-150 opacity-90 bg-white;
    }

    input {
      @apply rounded-md focus:(outline outline-yellow-500);
    }
  }
}
</style>
