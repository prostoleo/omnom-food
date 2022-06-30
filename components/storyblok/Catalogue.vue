<template>
  <section v-editable="blok" class="relative py-10">
    <BaseContainer>
      <!-- <pre>{{ blok.categories }}</pre> -->
      <div class="grid gap-3">
        <component
          v-for="item in blok.categories"
          :is="item.content.component"
          :key="item._uid"
          :blok="item"
        />
        <!-- <ul>
          <li v-for="item in blok.categories" :key="item._uid">
            <p>Компонент: {{ item.content.component }}</p>
          </li>
        </ul> -->
      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
// import { computed } from '@nuxtjs/composition-api';
// import { useStoryblokApi } from '@storyblok/nuxt-2';
import BaseContainer from '../Base/BaseContainer.vue';
// console.log('useStoryblokApi: ', useStoryblokApi);

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
// console.log('props: ', props);

// const storyApi = useStoryblokApi();
// console.log('storyApi: ', storyApi);

/* const richtext = computed(() =>
  storyApi.richTextResolver.render(props.blok.subtitle)
); */
</script>

<style lang="scss" scoped></style>
