<template>
  <footer class="py-5 bg-black text-white">
    <BaseContainer>
      <div class="footer-content">
        <BaseLogo />

        <div class="nav mt-5">
          <ul class="nav__list flex flex-col gap-1">
            <li
              v-for="item in footerMenuItems"
              :key="item.text"
              class="nav__item"
            >
              <NuxtLink
                :to="item.url"
                class="nav__link text-white hover:(opacity-80)"
              >
                {{ item.text }}
              </NuxtLink>
            </li>
            <!-- /.nav__item -->
          </ul>
          <!-- /.nav__list -->
        </div>
        <!-- /.nav -->

        <small class="footer-copy block mt-4">
          {{ yearComp }}
        </small>

        <small class="block text-xs text-light-300">
          Сайт разработан Леонидом Радостновым
        </small>
      </div>
    </BaseContainer>
  </footer>
</template>

<script setup>
import { computed, ref } from '@nuxtjs/composition-api';
import BaseLogo from './BaseLogo.vue';
import BaseContainer from './BaseContainer.vue';

const footerMenuItems = ref([
  {
    text: `Политика конфиденциальности`,
    url: '/politics',
  },
  {
    text: `Оферта`,
    url: '/offer',
  },
]);

const yearComp = computed(() => {
  const year = new Date().getFullYear();
  console.log('year: ', year);

  if (year === 2022) {
    return `© 2022.  Все права защищены`;
  }

  return `© 2022 - ${year}. Все права защищены`;
});
// console.log('yearComp: ', yearComp);
</script>

<style lang="scss" scoped></style>
