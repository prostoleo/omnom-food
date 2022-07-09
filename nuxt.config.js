import { dynamicRoutes } from './utils/dynamicRoutes';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'omnom',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/buefy.scss', '~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv',

    'nuxt-windicss',
    '@nuxtjs/composition-api/module',
    [
      '@storyblok/nuxt-2/module',
      {
        accessToken: process.env.STORYBLOK_KEY,
        bridge: true,
        apiOptions: {
          cache: {
            clear: 'auto',
            type: 'memory', // memory | none
          },
        }, // storyblok-js-client options
        useApiClient: true,
      },
    ],
    '@pinia/nuxt',
    '@aceforth/nuxt-netlify',
  ],

  env: {
    YANDEX_FUNC_SUBMIT: process.env.YANDEX_FUNC_SUBMIT,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // * для SSG
  generate: {
    fallback: true,

    // * воздаем динамические пути
    routes: dynamicRoutes,
  },

  netlify: {
    headers: {
      '/*': ['Access-Control-Allow-Origin: *'],
    },
  },
};
