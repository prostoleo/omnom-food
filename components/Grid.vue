<template>
  <ul v-editable="blok" class="flex py-8 mb-6">
    <li v-for="info in blok.columns" :key="info._uid" class="flex-auto px-6">
      <component :is="info.component" :blok="info" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GridComponent',
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
}
</script>
