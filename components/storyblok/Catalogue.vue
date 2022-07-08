<template>
  <section id="catalogue" v-editable="blok" class="relative pt-20">
    <BaseContainer>
      <div class="grid gap-3 md:(grid-cols-2)">
        <component
          v-for="item in blok.categories"
          :is="item.content.component"
          :key="item._uid"
          :blok="item"
        />
      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import BaseContainer from '../Base/BaseContainer.vue';

defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
