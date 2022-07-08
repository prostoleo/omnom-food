<template>
  <div v-if="state.category && state.products">
    <component
      :is="state.category.story.content.component"
      v-if="state.category.story.content.component"
      :key="state.category.story.content._uid"
      :blok="state.category.story.content"
    />
    <BaseContainer>
      <!-- <ProductsSection></ProductsSection> -->
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
    </BaseContainer>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  // useFetch,
  // provide,
  // useStore,
  useContext,
  useRoute,
  onMounted,
  computed,
} from '@nuxtjs/composition-api';

// import StoryblokClient from 'storyblok-js-client';
import {
  // useStoryblok,
  useStoryblokBridge,
  useStoryblokApi,
} from '@storyblok/nuxt-2';
// import Page from '~/components/storyblok/Page.vue';
import BaseContainer from '~/components/Base/BaseContainer.vue';
import ProductList from '~/components/ProductList.vue';
// import ProductsSection from '~/components/ProductsSection.vue';

const context = useContext();
const route = useRoute();

const version =
  context.query._storyblok || context.isDev ? 'draft' : 'published';
const fullSlug =
  route.value.path === '/' || route.value.path === ''
    ? 'home'
    : route.value.path;

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

onMounted(async () => {
  await getCategory();
  await getProducts();

  getProductNames();

  useStoryblokBridge(state.products.id, (story) => (state.products = story));
  useStoryblokBridge(state.category.id, (story) => (state.category = story));
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

<style lang="scss" scoped>
[searchbox] {
  input {
    // @apply border border-solid border-gray-200;
    // border-color: red !important;
    // @apply md:(text-lg);
  }
}
</style>
