export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Yubi Bursa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  env: {
    API_URL: process.env.API_URL,
    API_SECRET: process.env.API_SECRET
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'vuesax/dist/vuesax.css',
    '~assets/styles/main.css',
    '~assets/styles/bootstrap-grid.css',
    {
      src: '@hokify/vuejs-datepicker/dist/vuejs-datepicker.css',
      lang: 'css'
    }
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/vuesax',
    '~plugins/core-components',
    '~plugins/vee-validate',
    '~plugins/repositories',
    '~plugins/axios',
    '~plugins/v-tooltip',
    { src: '~plugins/vue2-editor', mode: 'client' },
    { src: '~plugins/vuejs-datepicker', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [['@nuxtjs/dotenv', { systemvars: true }], '@nuxtjs/moment'],
  moment: {
    defaultLocale: 'id',
    locales: ['id']
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // 'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-mq',
      {
        // Default breakpoint for SSR
        defaultBreakpoint: 'lg',
        breakpoints: {
          xs: 578,
          sm: 768,
          md: 992,
          lg: 1200,
          xl: Infinity
        }
      }
    ],

    'nuxt-material-design-icons',
    'cookie-universal-nuxt',
    'vue-currency-input/nuxt'
  ],

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL // Used as fallback if no runtime config is provided
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vee-validate/dist/rules']
  }
}
