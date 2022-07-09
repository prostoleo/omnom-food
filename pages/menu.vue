<template>
  <b-loading v-if="loading" v-model="loading" :is-full-page="true"></b-loading>

  <div v-else-if="!loading">
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
    <BaseContainer>
      <section class="py-7 md:(py-12)">
        <div
          class="flex flex-col gap-3 md:(grid grid-cols-2 gap-5 items-center justify-between)"
        >
          <h2 class="text-2xl font-bold text-dark-800 w-[fit-content]">
            Продукты
          </h2>

          <div
            searchbox
            class="max-w-[50ch] md:(ml-auto) flex items-center gap-2"
          >
            <!-- icon="magnify" -->
            <b-autocomplete
              v-model="searchQuery"
              rounded
              :data="filteredDataArray"
              placeholder="шашлык"
              clearable
              size="is-medium"
              @select="(option) => (selected = option)"
            >
              <!-- class="md:(text-lg)" -->
              <template #empty>Не найдено</template>
            </b-autocomplete>
            <!-- @keydown.enter="searchProducts" -->
            <button
              class="p-2 rounded-sm bg-light-300 hover:(bg-yellow-500 text-white)"
              aria-label="Искать продукты"
              @click="searchProducts"
            >
              <b-icon icon="magnify"></b-icon>
            </button>
          </div>

          <!-- flex-col -->
          <div
            filters
            class="flex items-center gap-3 w-full md:(flex-row items-center gap-5)"
          >
            <!-- <div
              class="left flex items-center gap-3 md:(flex-row items-center gap-5)"
            > -->
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
            <!-- </div> -->
          </div>
          <ul v-if="numberOfPages > 1" class="right pagination ml-auto">
            <li
              v-for="index in numberOfPages"
              :key="index"
              class="pagination-item p-1 text-yellow-500 font-medium w-8 h-8 aspect-square rounded-sm cursor-pointer leading-none inline-flex items-center justify-center"
              :class="
                index === currentPage
                  ? `bg-yellow-500 text-white font-semibold`
                  : ``
              "
              @click="showPage(index)"
            >
              {{ index }}
            </li>
          </ul>
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
  watch,
} from '@nuxtjs/composition-api';

import {
  useStoryblok,
  useStoryblokApi,
  useStoryblokBridge,
} from '@storyblok/nuxt-2';
// import Page from '~/components/storyblok/Page.vue';
import { PRODUCTS_PER_PAGE } from '~/utils/config';
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
const { story } = useStoryblok(fullSlug, {
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
    excluding_fields: 'products',
  });
  // console.log('data: ', data);

  state.categories = data;
  // story.data = data.stories;
}

async function getProducts(page = 1, searchQuery = '') {
  const response = await storyblokApi.get('cdn/stories/', {
    version,
    sort_by: 'content.name:asc',
    page,
    per_page: PRODUCTS_PER_PAGE,
    ...(searchQuery && { search_term: searchQuery }),
    starts_with: 'products/',
  });
  // console.log('response: ', response);

  state.products = response;
  // story.data = data.stories;
}

/**
 * * pagination
 */
const currentPage = ref(1);
const numberOfPages = computed(() => {
  if (!state.products) {
    return null;
  }

  //* если количество товаров больше количество товаров на страницу - рассчитываем кол-во страниц
  if (state.products.total > PRODUCTS_PER_PAGE) {
    const num = Math.ceil(state.products.total / PRODUCTS_PER_PAGE);

    return num;
  }

  return 1;
});

async function showPage(page) {
  if (page === currentPage.value || !page) {
    return;
  }
  // console.log('page: ', page);

  currentPage.value = page;

  await getProducts(page);
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
  suggestions.value = state.products.data.stories.map(
    (story) => story.content.name
  );
}

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

//* поиск продуктов
async function searchProducts() {
  // console.log(`search`);
  /* if (!searchQuery.value) {
    return;
  } */
  currentPage.value = 1;
  await getProducts(1, searchQuery.value);
}

//* если значение пустое - возращаем, то что было
watch(searchQuery, async (newVal) => {
  if (newVal.length === 0) {
    await getProducts(currentPage.value || 1);
  }
});

const dataToShow = computed(() => {
  let data = state.products.data.stories;
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
