<template>
  <!-- <section>
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </section> -->
  <div v-if="fetchState.pending">Loading...</div>
  <!-- <div v-else>
    <pre>{{ story }}</pre>
    </div> -->
  <div v-else>
    <!-- <pre class="bg-yellow-200">{{ story }}</pre> -->
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </div>
</template>

<script setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ref,
  useFetch,
  provide,
  useStore,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api';

// import StoryblokClient from 'storyblok-js-client';
import { useStoryblok } from '@storyblok/nuxt-2';
import Page from '~/components/storyblok/Page.vue';

// const cv = now.

/* const now = Date.now().toString();
// console.log('now: ', now);

const cv = now.slice(0, 6) + now.slice(-4);
console.log('cv: ', cv); */
const context = useContext();
// console.log('context: ', context);
const route = useRoute();
// console.log('route: ', route);
// const router = useRouter();
// console.log('router: ', router);

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
// console.log('story: ', story);
// console.log('fetchState: ', fetchState);

// const

/* const store = useStore();

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_KEY,
}); */

// const store = useStore();
/* const data = ref(null);
const directions = ref(null);
const postsForCards = ref(null);

const { fetch, fetchState } = useFetch(async () => {
  data.value = await Storyblok.get('cdn/stories/', {
    // version: 'draft',
    version: 'published',
    starts_with: 'home',
  })
    .then((res) => {
      return res.data;
      // return res.data;
    })
    .catch((err) => {
      console.warn(`💣💣💣 - ${err.response}`);
    });

  // todo направления
  directions.value = await Storyblok.get('cdn/stories/', {
    // version: 'draft',
    version: 'published',
    starts_with: 'directions',
  })
    .then((res) => {
      store.dispatch('addDirections', res.data);

      return res.data;
      // return res.data;
    })
    .catch((err) => {
      console.warn(`💣💣💣 - ${err.response}`);
    });

  // todo для карточек
  postsForCards.value = await Storyblok.get('cdn/stories', {
    // version: 'draft',
    version: 'published',
    starts_with: 'posts',
    excluding_fields: 'markdown_block,flex_gallery,grid_gallery',
    sort_by: 'published_at:desc',
  })
    .then((res) => {
      store.dispatch('addPostsForCards', res.data);

      return res.data;
      // return res.data;
    })
    .catch((err) => {
      console.warn(`💣💣💣 - ${err.response}`);
    });
});

// Manually trigger a refetch
fetch();

provide('postsForCards', postsForCards);
provide('directions', directions); */
</script>
