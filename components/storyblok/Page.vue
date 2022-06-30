<template>
  <div v-editable="blok" class="">
    <!-- <pre class="text-black">{{ blok }}</pre> -->
    <!-- <h2>{{ blok.component }}</h2> -->
    <component
      v-for="info in blok.body"
      :is="info.component"
      :key="info._uid"
      :blok="info"
    />
    <!-- <div class="text-white text-2xl">{{ blok.component }}</div> -->
    <!-- <pre>{{ blok.body }}</pre> -->
    <!-- <ul>
      <li v-for="info in blok.body" :key="info._uid">
        <pre>{{ info }}</pre>
      </li>
    </ul> -->
  </div>
</template>

<script setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import Hero from './Hero.vue';
import Category from './Category.vue';
// import Hero from '~/components/storyblok/Hero.vue';
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>
