<template>
  <button
    v-if="!isLink"
    class="px-[1.25em] py-[0.5em] inline-block rounded-md bg-yellow-500 border border-transparent text-dark-800 font-semibold md:(text-lg) lg:(text-2xl) hover:(opacity-80)"
  >
    <slot />
  </button>
  <NuxtLink
    v-else
    class="px-[1.25em] py-[0.5em] inline-block rounded-md bg-yellow-500 border border-transparent text-dark-800 font-semibold md:(text-lg) lg:(text-2xl) hover:(opacity-80)"
    :to="url"
  >
    <slot />
  </NuxtLink>
</template>

<script setup>
defineProps({
  isLink: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: '/',
  },
});
</script>

<style lang="scss" scoped></style>
