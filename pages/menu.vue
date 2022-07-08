<template>
  <!-- <b-loading
    v-if="fetchState.pending"
    v-model="fetchState.pending"
    :is-full-page="true"
  ></b-loading>
  <b-loading
    v-else-if="fetchProducts.pending"
    v-model="fetchProducts.pending"
    :is-full-page="true"
  ></b-loading> -->
  <b-loading v-if="loading" v-model="loading" :is-full-page="true"></b-loading>

  <!-- <div v-else>
    <pre>{{ story }}</pre>
    </div> -->
  <!-- <div v-else-if="!fetchState.pending"> -->
  <!-- <div v-else-if="!fetchState.pending || !fetchProducts.pending"> -->
  <div v-else-if="!loading">
    <!-- <pre class="bg-yellow-200">{{ story }}</pre> -->
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
    <!-- <pre>{{ state.products }}</pre> -->
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
              size="is-medium"
              @select="(option) => (selected = option)"
            >
              <!-- class="md:(text-lg)" -->
              <template #empty>Не найдено</template>
            </b-autocomplete>
          </div>

          <!-- flex-col -->
          <div
            filters
            class="flex items-center gap-3 md:(flex-row items-center gap-5)"
          >
            <div>
              <!-- label="Сортировка" -->
              <b-field>
                <b-select
                  v-model="sortOption"
                  placeholder="Выберите сортировку"
                  rounded
                  size="is-medium"
                >
                  <option
                    v-for="sortVal in Object.values(SORT_OPT)"
                    :key="sortVal"
                    :value="sortVal"
                  >
                    {{ sortVal }}
                  </option>
                </b-select>
              </b-field>
            </div>

            <div>
              <button
                class="sort-button"
                :aria-label="
                  ascending
                    ? `отсортировать по убыванию`
                    : `отсортировать по возрастанию`
                "
                @click="ascending = !ascending"
              >
                <b-icon v-if="ascending" icon="sort-ascending"></b-icon>
                <b-icon v-else icon="sort-descending"></b-icon>
              </button>
            </div>
          </div>
        </div>

        <ProductList :products="dataToShow" />
      </section>

      <!-- <ProductList :products="state.products.stories" /> -->
    </BaseContainer>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  computed,
  // useFetch,
  // provide,
  // useStore,
  useContext,
  useRoute,
  // useAsync,
  onMounted,
} from '@nuxtjs/composition-api';

import {
  useStoryblok,
  useStoryblokApi,
  useStoryblokBridge,
} from '@storyblok/nuxt-2';
// import Page from '~/components/storyblok/Page.vue';
import BaseContainer from '~/components/Base/BaseContainer.vue';
import ProductList from '~/components/ProductList.vue';

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

const loading = ref(true);

// const { story, fetchState } = useStoryblok('home', {
//* для компонента menuHero
const { story, fetchState } = useStoryblok(fullSlug, {
  // version: 'draft',
  // version: 'published',
  version,
  // starts_with: 'home',
  ...(resolveRelations && { resolve_relations: resolveRelations }),
  resolve_links: 'url',
  // cv,
});

const storyblokApi = useStoryblokApi();

const state = reactive({
  products: null,
  categories: null,
});

async function getCategories() {
  const { data } = await storyblokApi.get(`cdn/stories/`, {
    version,
    starts_with: 'categories/',
    // by_uuids: story.uuid,
    // by_uuids: category.value.uuid,
    excluding_fields: 'products',
  });
  // console.log('data: ', data);

  state.categories = data;
  // story.data = data.stories;
}

async function getProducts() {
  // console.log('state.category: ', state.category);
  // console.log('state.category.story.uuid: ', state.category.story.uuid);
  const { data } = await storyblokApi.get('cdn/stories/', {
    version,
    per_page: 24,

    starts_with: 'products/',
    // resolve_relations: 'Product.category_info',
  });
  // console.log('data: ', data);

  state.products = data;
  // story.data = data.stories;
}

// inputSearch
const searchQuery = ref('');
const selected = ref(null);
const suggestions = ref([]);

const ascending = ref(true);

const SORT_OPT = {
  ALPHABET: `по алфавиту`,
  PRICE: `по цене`,
};

const sortOption = ref(SORT_OPT.ALPHABET);

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

/* onMounted(async () => {
  await getCategory();
  await getProducts();

  getProductNames();

  useStoryblokBridge(state.products.id, (story) => (state.products = story));
  useStoryblokBridge(state.category.id, (story) => (state.category = story));
}); */

onMounted(async () => {
  await getProducts();
  await getCategories();
  getProductNames();
  loading.value = false;

  useStoryblokBridge(state.products.id, (story) => (state.products = story));
  useStoryblokBridge(
    state.categories.id,
    (story) => (state.categories = story)
  );
});

const dataToShow = computed(() => {
  let data = state.products.stories;
  // console.log('data: ', data.slice());
  // let filteredData = null;

  if (selected.value) {
    // return state.products.stories.filter((story) => {
    data = data.filter((story) => {
      return story.content.name === selected.value;
    });
    // filteredData = data;
  }

  if (searchQuery.value.length > 0) {
    // return state.products.stories.filter((story) => {
    data = data.filter((story) => {
      return story.content.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    });
    // filteredData = data;
  }

  if (sortOption.value === SORT_OPT.ALPHABET) {
    data = data
      .slice()
      .sort((a, b) => a.content.name.localeCompare(b.content.name));
  }

  if (sortOption.value === SORT_OPT.PRICE) {
    data = data.slice().sort((a, b) => a.content.price - b.content.price);
  }

  if (!ascending.value) {
    data.reverse();
  }

  // return state.products.stories;
  return data;
});
</script>

<style lang="scss" scoped></style>
