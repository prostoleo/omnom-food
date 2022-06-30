<template>
  <header class="bg-dark-800 py-3 isolation">
    <BaseContainer class="flex items-center justify-between text-white">
      <NuxtLink
        to="/"
        class="uppercase font-semibold text-yellow-500 hover:(opacity-80 text-yellow-500) focus:(opacity-80 text-yellow-500)"
        >омном</NuxtLink
      >

      <button
        class="p-3 cursor-pointer z-50 md:hidden"
        aria-label="Открыть/закрыть меню"
        toggle-nav
        @click="toggleNav"
      >
        <!-- content-open-quote -->
        <span
          class="burger-block block w-8 h-1 bg-white relative rounded-sm"
        ></span>
        <!-- <div class="menu">
          <div v-for="index in 3" :key="index" class="bar"></div>
        </div> -->
      </button>

      <div
        v-if="isNavOpen"
        class="overlay fixed inset-0 bg-dark-700/60 cursor-pointer z-10 md:(hidden)"
        @click.self="closeNav"
      ></div>

      <nav
        class="nav fixed top-0 right-0 bottom-0 w-full max-w-xs w-3/4 px-[16px] pt-16 bg-black shadow shadow-md shadow-light-300 z-20 md:(static w-full max-w-full pl-0 pr-0 pt-0 is-paddingless bg-transparent shadow-none z-1)"
        :class="{ 'is-open': isNavOpen }"
      >
        <ul
          class="nav__list flex flex-col gap-4 md:(w-full flex-row items-center justify-end)"
        >
          <li v-for="item in menuItems" :key="item.text" class="nav__item">
            <NuxtLink
              :to="item.url"
              class="nav__link"
              :class="{ 'nav__link--btn': item.isBtn }"
              @click.native="closeNav"
              >{{ item.text }}</NuxtLink
            >
          </li>
        </ul>
        <!-- /.nav__list -->
      </nav>
      <!-- /.nav -->
    </BaseContainer>
  </header>
</template>

<script setup>
import { ref } from '@nuxtjs/composition-api';
import BaseContainer from './BaseContainer.vue';

const menuItems = ref([
  {
    id: 1,
    url: '/catalogue',
    text: 'Каталог',
  },
  {
    id: 2,
    url: '#deliver',
    text: 'Доставка',
  },
  {
    id: 3,
    url: '#contacts',
    text: 'Контакты',
  },
  {
    id: 4,
    url: '#about',
    text: 'О нас',
  },
  {
    id: 5,
    url: '/menu',
    text: 'Меню',
    isBtn: true,
  },
]);

const isNavOpen = ref(false);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openNav = () => {
  document.querySelector('html').classList.add('!overflow-y-hidden');

  isNavOpen.value = true;
};
const closeNav = () => {
  document.querySelector('html').classList.remove('!overflow-y-hidden');
  isNavOpen.value = false;
};

const toggleNav = () => {
  isNavOpen.value ? closeNav() : openNav();
};
</script>

<style lang="scss" scoped>
button[toggle-nav] {
  .burger-block {
    @apply transform transition-transform duration-150 before:(content-[''] absolute left-0 right-0 -top-[10px] w-full h-1 rounded-sm origin-center bg-cyan-500 z-1) after:(content-[''] absolute left-0 right-0 -bottom-[10px] w-full h-1 rounded-sm origin-center bg-red-500 z-1);

    &.opened {
      @apply transform -translate-x-10/10 before:(content-[''] transform translate-x-10/10 rotate-x-45) after:(content-[''] transform translate-x-10/10 -rotate-x-45);
    }
  }
}

nav.nav {
  @apply transform translate-x-full transition-transform duration-200 ease-in-out md:(translate-x-0);

  &.is-open {
    @apply transform translate-x-0 transition-transform duration-200 ease-in-out;
  }
}

.nav__link {
  @apply inline-block leading-none text-white;

  &--btn {
    @apply px-6 py-3 rounded-md border-1 mt-5 md:(mt-0);
  }

  &.nuxt-link-exact-active {
    @apply text-yellow-400;
  }
}
</style>
