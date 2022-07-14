// import path from 'path';
// import PurgecssPlugin from 'purgecss-webpack-plugin';
// import glob from 'glob-all';

import { dynamicRoutes } from './utils/dynamicRoutes';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'omnom | Мясные и рыбные продукты и напитки по-домашнему в Томске',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Закажите доставку вкусной домашней еды в Томске. Мы предлагаем свежие мясные и рыбные продукты с доставкой к вашему столу. Приятного аппетита!',
      },
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
    /* [
      'nuxt-purgecss',
      {
        mode: 'postcss', // webpack | postcss
      },
    ], */
    // 'nuxt-purgecss',
    // '@nuxt/image',
  ],

  /* image: {
    storyblok: {
      baseURL: 'https://a.storyblok.com',
    },
  }, */

  env: {
    YANDEX_FUNC_SUBMIT: process.env.YANDEX_FUNC_SUBMIT,
  },

  publicRuntimeConfig: {
    STORYBLOK_KEY: process.env.STORYBLOK_KEY,
    STORYBLOK_PUBLIC_KEY: process.env.STORYBLOK_PUBLIC_KEY,
    YANDEX_FUNC_SUBMIT: process.env.YANDEX_FUNC_SUBMIT,
    YANDEX_ORDER_SUBMIT: process.env.YANDEX_ORDER_SUBMIT,
    YOU_MONEY_WALLET_ID: process.env.YOU_MONEY_WALLET_ID
  }

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
      lang: 'ru',
    },
    icon: {
      source: '~/static/icon.png',
    },
    meta: {
      name: "omnom | Мясные и рыбные продукты и напитки по-домашнему в Томске'",
      author: 'Leonid Radostnov, Леонид Радостнов, prostoleo, prostoleo-dev',
      description:
        'Закажите доставку вкусной домашней еды в Томске. Мы предлагаем свежие мясные и рыбные продукты с доставкой к вашему столу. Приятного аппетита!',
      theme_color: '#f59e0b',
      lang: 'ru',
      ogHost: 'https://omnom-food.netlify.app/',
      ogImage: {
        path: '~/static/icon.png',
        width: 512,
        height: 512,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extractCSS: true, // extractCSS
    // extend(config, { isDev, isClient }) {
    //   if (!isDev && isClient) {
    //     config.plugins.push(
    //       new PurgecssPlugin({
    //         paths: glob.sync([
    //           path.join(__dirname, './pages/**/*.vue'),
    //           path.join(__dirname, './layouts/**/*.vue'),
    //           path.join(__dirname, './components/**/*.vue'),
    //         ]),
    //         whitelist: ['html', 'body'],
    //       })
    //     );
    //   }
    // },
  },

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
