<template>
  <transition-group
    v-if="products.length > 0"
    tag="ul"
    name="products"
    class="mt-10 grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:(grid-cols-[repeat(auto-fit,minmax(270px,1fr))]) lg:(gap-7)"
  >
    <!-- v-for="story in state.products.stories" -->
    <!-- class="h-full" -->
    <li v-for="story in products" :key="story.uuid">
      <component
        :is="story.content.component"
        v-if="story.content.component"
        :key="story.content._uid"
        :blok="story.content"
      />
    </li>
  </transition-group>
  <div v-else>
    <p class="text-center mt-10">
      К сожалению, по данному запросу ничего не было найдено
    </p>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array || null,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.products-move {
  transition: transform 0.75s ease-out;
}
</style>
