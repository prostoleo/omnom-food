<template>
  <div v-editable="blok" class="py-10 text-3xl text-center">
    {{ blok.headline }}
  </div>
</template>

<script>
export default {
  name: 'TeaserComponent',
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
