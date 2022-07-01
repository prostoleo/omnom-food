<template>
  <section class="popular-section py-10">
    <BaseContainer>
      <!-- <pre>{{ blok }}</pre> -->
      <BaseSectionTitle>
        {{ blok.title }}
      </BaseSectionTitle>
      <!-- <h2 class="text-xl font-bold md:(text-2xl)">{{ blok.title }}</h2> -->

      <p class="max-w-[50ch] text-gray-600">{{ blok.subtitle }}</p>
      <!-- <pre>{{ blok.products }}</pre> -->

      <ProductList :products="blok.products" />
    </BaseContainer>
  </section>
</template>

<script setup>
import BaseContainer from '../Base/BaseContainer.vue';
import ProductList from '../ProductList.vue';
import BaseSectionTitle from '../Base/BaseSectionTitle.vue';

defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
