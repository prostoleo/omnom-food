<template>
  <!-- <section>
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </section> -->
  <b-loading
    v-if="fetchState.pending"
    v-model="fetchState.pending"
    :is-full-page="true"
  ></b-loading>
  <!-- <b-loading v-if="loading" v-model="loading" :is-full-page="true"></b-loading> -->

  <!-- <div v-else>
    <pre>{{ story }}</pre>
    </div> -->
  <!-- <div v-else-if="!fetchState.pending"> -->
  <div v-else-if="!fetchState.pending">
    <!-- <NuxtLink class="bg-red-500 p-2 text-white" to="/?payment=success"
      >red</NuxtLink
    > -->
    <!-- <pre class="bg-yellow-200">{{ story }}</pre> -->
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </div>
  <!-- <div>
    <component
      :is="story.data.content.component"
      v-if="story.data.content.component"
      :key="story.data.content._uid"
      :blok="story.data.content"
    />
  </div> -->
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
  useAsync,
  onMounted,
  nextTick,
  useRouter,
  watch,
} from '@nuxtjs/composition-api';

// import StoryblokClient from 'storyblok-js-client';
import {
  useStoryblok,
  useStoryblokApi,
  useStoryblokBridge,
} from '@storyblok/nuxt-2';
import { ToastProgrammatic as Toast } from 'buefy';
import Page from '~/components/storyblok/Page.vue';
import { useCartStore } from '~/store/cart';

const loading = ref(false);

// const cv = now.

/* const now = Date.now().toString();
// console.log('now: ', now);

const cv = now.slice(0, 6) + now.slice(-4);
console.log('cv: ', cv); */
const context = useContext();
// console.log('context: ', context);
const route = useRoute();
console.log('route: ', route);
// console.log('route: ', route);
const router = useRouter();

// console.log('router: ', router);
const cartStore = useCartStore();

watch(
  route,
  (newVal) => {
    console.log('newVal: ', newVal);
    const duration = 5000;

    if (newVal?.query?.payment === 'success') {
      console.log('cartStore: ', cartStore);
      cartStore.removeItemsFromLocalStorage();
      cartStore.$reset();

      Toast.open({
        message: `Ваш заказ принят на обработку. С Вами свяжутся как можно скорее`,
        pauseOnHover: true,
        duration,
        type: 'is-success',
      });

      setTimeout(() => {
        router.replace({ query: null });
      }, duration);
    }
  },
  {
    immediate: true,
  }
);

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

/* const storyblokApi = useStoryblokApi();
// const story = ref(null);
const story = async useAsync(async () => {
  const res = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
    version,
    ...(resolveRelations && { resolve_relations: resolveRelations }),
    resolve_links: 'url',
  });

  // story.value = res;
  // console.log('res.value.data: ', res.value.data);
  return res;
});
// console.log('story: ', story);

onMounted(() => {
  console.log('story: ', story);
  useStoryblokBridge(story.id, (story) => (story.value = story));
}); */

/* const store = useStore();

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_KEY,
}); */
</script>
