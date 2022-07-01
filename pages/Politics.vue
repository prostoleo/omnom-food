<template>
  <b-loading
    v-if="fetchState.pending"
    v-model="fetchState.pending"
    :is-full-page="true"
  ></b-loading>
  <div v-else-if="!fetchState.pending">
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </div>
</template>

<script setup>
import {
  // ref,
  // useFetch,
  // provide,
  // useStore,
  useContext,
  useRoute,
  // useAsync,
  // onMounted,
} from '@nuxtjs/composition-api';

import { useStoryblok } from '@storyblok/nuxt-2';
// import Page from '~/components/storyblok/Page.vue';

// const loading = ref(false);

const context = useContext();
const route = useRoute();

const version =
  context.query._storyblok || context.isDev ? 'draft' : 'published';
const fullSlug =
  route.value.path === '/' || route.value.path === ''
    ? 'home'
    : route.value.path;

const resolveRelations =
  route.value.path === '/' || route.value.path === ''
    ? 'Catalogue.categories,Popular.products'
    : false;

// const { story, fetchState } = useStoryblok('home', {
const { story, fetchState } = useStoryblok(fullSlug, {
  // version: 'draft',
  // version: 'published',
  version,
  // starts_with: 'home',
  ...(resolveRelations && { resolve_relations: resolveRelations }),
  resolve_links: 'url',
  // cv,
});
</script>
