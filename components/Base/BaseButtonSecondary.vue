<template>
  <button
    v-if="!isLink"
    class="px-[1.25em] py-[0.5em] inline-block rounded-md bg-transparent text-yellow-500 border border-solid border-yellow-500 font-semibold md:(text-lg) lg:(text-2xl) hover:(text-yellow-500 opacity-80)"
    @click="clickHandler"
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

const emit = defineEmits(['click-btn']);

const clickHandler = () => {
  console.log(`click`);
  emit('click-btn');
};
</script>

<style lang="scss" scoped></style>
