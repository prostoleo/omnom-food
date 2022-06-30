<template>
  <div v-if="state.category && state.products">
    <component
      :is="state.category.story.content.component"
      v-if="state.category.story.content.component"
      :key="state.category.story.content._uid"
      :blok="state.category.story.content"
    />
    <BaseContainer>
      <section class="py-7 md:(py-12)">
        <div
          class="flex flex-col gap-3 md:(grid grid-cols-2 gap-5 items-center justify-between)"
        >
          <h2 class="text-2xl font-bold text-dark-800 w-[fit-content]">
            Продукты
          </h2>

          <div searchbox class="max-w-[50ch] md:(ml-auto)">
            <b-autocomplete
              v-model="searchQuery"
              rounded
              :data="filteredDataArray"
              placeholder="шашлык"
              icon="magnify"
              clearable
              @select="(option) => (selected = option)"
            >
              <template #empty>Не найдено</template>
            </b-autocomplete>
          </div>

          <div
            filters
            class="flex flex-col gap-1 md:(flex-row items-center gap-3)"
          >
            <div>
              <b-field label="Название">
                <b-select placeholder="Выберите сортировку" rounded>
                  <option value="по возрастанию">по возрастанию</option>
                  <option value="по убыванию">по убыванию</option>
                </b-select>
              </b-field>
            </div>
            <div>
              <b-field label="Цена">
                <b-select placeholder="Выберите сортировку" rounded>
                  <option value="по возрастанию">по возрастанию</option>
                  <option value="по убыванию">по убыванию</option>
                </b-select>
              </b-field>
            </div>
          </div>
        </div>

        <ul class="mt-10 grid gap-5 sm:(grid-cols-2) lg:(grid-cols-3 gap-7)">
          <li
            v-for="story in state.products.stories"
            :key="story.uuid"
            class=""
          >
            <component
              :is="story.content.component"
              v-if="story.content.component"
              :key="story.content._uid"
              :blok="story.content"
            />
          </li>
        </ul>
      </section>
    </BaseContainer>
  </div>
</template>

<script setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ref,
  reactive,
  useFetch,
  provide,
  useStore,
  useContext,
  useRoute,
  onMounted,
  computed,
} from '@nuxtjs/composition-api';

// import StoryblokClient from 'storyblok-js-client';
import {
  useStoryblok,
  useStoryblokBridge,
  useStoryblokApi,
} from '@storyblok/nuxt-2';
import Page from '~/components/storyblok/Page.vue';
import BaseContainer from '~/components/Base/BaseContainer.vue';

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
    ? 'Catalogue.categories'
    : false;

// const { story, fetchState } = useStoryblok('home', {
/**
 * * работает
 */
/*   const { story, fetchState } = useStoryblok(fullSlug, {
    // version: 'draft',
  // version: 'published',
  version,
  // starts_with: 'home',
  // ...(resolveRelations && { resolve_relations: resolveRelations }),
  // resolve_relations: 'uuid',
  resolve_links: 'uuid',
  // by_uuids: 'uuid',
  // cv,
});
console.log('story: ', story); */

/* const category = ref(null);
function getCategory() {
  const res = useStoryblok(fullSlug, {
    // version: 'draft',
    // version: 'published',
    version,
    // starts_with: 'home',
    // ...(resolveRelations && { resolve_relations: resolveRelations }),
    // resolve_relations: 'uuid',
    // resolve_links: 'uuid',
    // by_uuids: 'uuid',
    // cv,
  });

  category.value = res.story;
  console.log('category: ', category);
} */

// const { story: storyProducts, fetchState2 } = useStoryblok(``, {
/* const answer = useStoryblok(``, {
  // version: 'draft',
  // version: 'published',
  version,
  starts_with: 'products/',
  // resolve_relations: 'Product.category_info',
  resolve_links: 'story',
  // cv,
});
// console.log('storyProducts: ', storyProducts);
console.log('answer: ', answer);
// console.log('story: ', story); */

/* const storyblokApi = useStoryblokApi();
// const state = reactive({ story: data.story });
const state = reactive({ story: null });
// const story = reactive({ data: null });
async function getData(params) {
  const { data } = await storyblokApi.get('cdn/stories/', {
    version,
    starts_with: 'products/',
    resolve_relations: 'Product.category_info',
  });
  console.log('data: ', data);

  state.story = data;
  // story.data = data.stories;
}

onMounted(async () => {
  await getData();
  useStoryblokBridge(state.story.id, (story) => (state.story = story));
}); */

const storyblokApi = useStoryblokApi();
// const state = reactive({ story: data.story });
const state = reactive({ products: null, category: null });
// const story = reactive({ data: null });
async function getCategory() {
  const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
    version,
    // starts_with: 'products/',
    // by_uuids: story.uuid,
    // by_uuids: category.value.uuid,
    excluding_fields: 'products',
  });
  // console.log('data: ', data);

  state.category = data;
  // story.data = data.stories;
}

async function getProducts() {
  // console.log('state.category: ', state.category);
  // console.log('state.category.story.uuid: ', state.category.story.uuid);
  const { data } = await storyblokApi.get('cdn/stories/', {
    version,
    starts_with: 'products/',
    filter_query: {
      category_info: {
        in: state.category.story.uuid,
      },
    },
  });
  // console.log('data: ', data);

  state.products = data;
  // story.data = data.stories;
}

// inputSearch
const searchQuery = ref('');
const selected = ref(null);
const suggestions = ref([]);

const filteredDataArray = computed(() =>
  suggestions.value.filter((option) => {
    return (
      option
        .toString()
        .toLowerCase()
        // .indexOf(searchQuery.value.toLowerCase()) >= 0
        .includes(searchQuery.value.toLowerCase())
    );
  })
);

function getProductNames() {
  suggestions.value = state.products.stories.map((story) => story.content.name);
}

onMounted(async () => {
  await getCategory();
  await getProducts();

  getProductNames();

  useStoryblokBridge(state.products.id, (story) => (state.products = story));
  useStoryblokBridge(state.category.id, (story) => (state.category = story));
});

/* const dataToShow = computed(() => {
  if (searchQuery.value.length > 0) {
  }
}); */
</script>

<style lang="scss" scoped>
/* b-autocomplete {
  input {
    // @apply border border-solid border-gray-200;
    border-color: red !important;
  }
} */
</style>
