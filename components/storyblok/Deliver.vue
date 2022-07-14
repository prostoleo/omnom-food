<template>
  <section
    id="deliver"
    class="deliver-section relative py-10 min-h-[50vh] text-white grid items-center overflow-x-hidden"
  >
    <BaseContainer>
      <!-- <pre>{{ blok }}</pre> -->
      <BaseSectionTitle>
        {{ blok.title }}
      </BaseSectionTitle>
      <!-- <h2 class="text-3xl">{{ blok.title }}</h2> -->

      <div class="mt-5 text-light-100" v-html="richtext(blok.text)"></div>

      <!-- <button>{{ blok.button_text }}</button> -->
      <BaseButtonSecondary class="mt-5" @click-btn="openDialog">
        {{ blok.button_text }}
      </BaseButtonSecondary>
      <!-- <button class="mt-5" @click="openDialog">
        {{ blok.button_text }}
      </button> -->
    </BaseContainer>
    <img
      class="absolute inset-0 w-full h-full object-cover -z-1 filter brightness-60"
      :src="`${blok.image.filename}/m/`"
      :alt="`условия доставки`"
    />
    <!-- <Transition name="nested" duration="550"> -->
    <!-- v-if="showDialog" -->
    <BaseDialog :show-dialog="showDialog" @close-dialog="closeDialog" />
    <!-- </Transition> -->
  </section>
</template>

<script setup>
// import {
//   ToastProgrammatic as Toast,
//   LoadingProgrammatic as Loading,
// } from 'buefy';
import { ref } from '@nuxtjs/composition-api';
import BaseContainer from '../Base/BaseContainer.vue';
import BaseSectionTitle from '../Base/BaseSectionTitle.vue';
import BaseDialog from '../Base/BaseDialog.vue';
import BaseButtonSecondary from '../Base/BaseButtonSecondary.vue';
import { richtext } from '~/utils/richtext';
// Toast.open('Toasty!');
// console.log('Loading: ', Loading);
// console.log('Loading: ', Loading);
// Loading.open();

defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const showDialog = ref(false);

const openDialog = () => {
  // console.log(`open`);
  showDialog.value = true;
};
const closeDialog = () => {
  showDialog.value = false;
};
</script>

<style lang="scss" scoped>
/* rules that target nested elements */
/* .nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
// delay leave of parent element
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  // transform: translateY(30px);
  opacity: 0;
}

// we can also transition nested elements using nested selectors
.nested-enter-active .dialog,
.nested-leave-active .dialog {
  transition: all 0.3s ease-in-out;
}
// delay enter of nested element
.nested-enter-active .dialog {
  transition-delay: 0.25s;
}

.nested-enter-from .dialog,
.nested-leave-to .dialog {
  transform: translateX(30px);

  	// Hack around a Chrome 96 bug in handling nested opacity transitions.
    // This is not needed in other browsers or Chrome 99+ where the bug
    // has been fixed.

  opacity: 0.001;
} */
</style>
