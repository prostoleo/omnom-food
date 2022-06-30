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
              <!-- label="Сортировка" -->
              <b-field>
                <b-select
                  v-model="sortOption"
                  placeholder="Выберите сортировку"
                  rounded
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
            <!-- <div>
              <b-field label="Название">
                <b-select
                  v-model="nameSort"
                  placeholder="Выберите сортировку"
                  rounded
                >
                  <option
                    v-for="nameSortVal in Object.values(NAME_SORT_OPT)"
                    :key="nameSortVal"
                    :value="nameSortVal"
                  >
                    {{ nameSortVal }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div>
              <b-field label="Цена">
                <b-select
                  v-model="priceSort"
                  placeholder="Выберите сортировку"
                  rounded
                >
                  <option
                    v-for="priceSortVal in Object.values(PRICE_SORT_OPT)"
                    :key="priceSortVal"
                    :value="priceSortVal"
                  >
                    {{ priceSortVal }}
                  </option>
                </b-select>
              </b-field>
            </div> -->
          </div>
        </div>

        <!-- style="grid-auto-rows: 1fr" -->
        <transition-group
          v-if="dataToShow.length > 0"
          tag="ul"
          name="products"
          class="mt-10 grid gap-5 sm:(grid-cols-2) lg:(grid-cols-3 gap-7)"
        >
          <!-- v-for="story in state.products.stories" -->
          <!-- class="h-full" -->
          <li v-for="story in dataToShow" :key="story.uuid">
            <component
              :is="story.content.component"
              v-if="story.content.component"
              :key="story.content._uid"
              :blok="story.content"
            />
          </li>
        </transition-group>
        <div v-else>
          <p class="text-center mt-10">
            К сожалению, по данному запросу ничего не было найдено
          </p>
        </div>
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

/* const NAME_SORT_OPT = {
  // DEF: `по умолчанию`,
  ASC: `по возрастанию`,
  DESC: `по убыванию`,
};
const PRICE_SORT_OPT = {
  // DEF: `по умолчанию`,
  ASC: `по возрастанию`,
  DESC: `по убыванию`,
}; */

/* const nameSort = ref(null);
const priceSort = ref(null);
console.log('PRICE_SORT_OPT: ', Object.values(PRICE_SORT_OPT)); */

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
  let filteredData = null;

  if (selected.value) {
    // return state.products.stories.filter((story) => {
    data = data.filter((story) => {
      return story.content.name === selected.value;
    });
    filteredData = data;
  }

  if (searchQuery.value.length > 0) {
    // return state.products.stories.filter((story) => {
    data = data.filter((story) => {
      return story.content.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    });
    filteredData = data;
  }

  /* if (nameSort.value === NAME_SORT_OPT.ASC) {
    data.sort((a, b) => {
      // return a.content.name.toString() - b.content.name.toString()
      return a.content.name.localeCompare(b.content.name);
    });
  }

  if (nameSort.value === NAME_SORT_OPT.DESC) {
    data.sort((a, b) => {
      return b.content.name.localeCompare(a.content.name);
    });
  }

  if (priceSort.value === PRICE_SORT_OPT.ASC) {
    data.sort((a, b) => {
      // return a.content.name.toString() - b.content.name.toString()
      return a.content.price - b.content.price;
    });
  }

  if (nameSort.value === NAME_SORT_OPT.DESC) {
    data.sort((a, b) => {
      // return b.content.name.localeCompare(a.content.name);
      return b.content.price - a.content.price;
    });
  } */
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
.products-move {
  transition: transform 0.75s ease-out;
}
/* b-autocomplete {
  input {
    // @apply border border-solid border-gray-200;
    border-color: red !important;
  }
} */
</style>
