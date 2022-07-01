<template>
  <button
    v-if="!isLink"
    class="px-[1.25em] py-[0.5em] inline-block rounded-md bg-transparent text-yellow-500 border border-solid border-yellow-500 font-semibold md:(text-lg) lg:(text-2xl) hover:(text-yellow-500 opacity-80)"
  >
    <slot />
  </button>
  <NuxtLink
    v-else
    class="px-[1.25em] py-[0.5em] inline-block rounded-md bg-transparent text-yellow-500 border border-solid border-yellow-500 font-semibold md:(text-lg) lg:(text-2xl) hover:(text-yellow-500 opacity-80)"
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
