import smConfig from "./sm.json"

if (!smConfig.apiEndpoint) {
  console.warn("Looks like Slice Machine hasn't been bootstraped already.\nCheck the `Getting Started` section of the README file :)");
}

const { getStoriesPaths } = require('slice-machine-ui/helpers/storybook')

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "slice-library-starter-nuxt",
    meta: [{
      charset: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      hid: "description",
      name: "description",
      content: ""
    }],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "vue-essential-slices/src/styles/styles.scss"
  ],
  styleResources: {
    scss: [
      '@/assets/scss/main.scss'
    ]
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/service.js',
    '~/plugins/directives.js',
    '~/plugins/mq.js',
    '~/plugins/filters.js',
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' }
  ],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ['@nuxtjs/google-fonts',{
      families: {
        Poppins: {
          wght: [100,200,300,400,500,600,700,800,900],
          ital: [100,200,300,400,500,600,700,800,900]
        }
      },
      display: 'swap'
    }]
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    ["@nuxtjs/prismic", {
      endpoint: smConfig.apiEndpoint || "",
      apiOptions: {
        routes: [{
          type: "page",
          path: "/:uid"
        }]
      }
    }],
    ['@nuxtjs/axios'],
    ["nuxt-sm"],
    ["@nuxtjs/apollo"],
    ['nuxt-shopify'],
    ['@nuxtjs/style-resources']
  ],

  publicRuntimeConfig: {
    shopifyDomain: process.env.SHOPIFY_DOMAIN,
    shopifyToken: process.env.SHOPIFY_TOKEN,
  },

  shopify: {
    /**
     * Your shopify domain
     */
    domain: process.env.SHOPIFY_DOMAIN,

    /**
     * Your shopify storefront access token
     */
    storefrontAccessToken: process.env.SHOPIFY_TOKEN,

    /**
     * This will be larger than the optimized version, as it will contain all fields that are available in the
     * Storefront API. (https://help.shopify.com/en/api/custom-storefronts/storefront-api/reference)
     * This should only be used when you need to add custom queries to supplement the JS Buy SDK queries.
     */
    unoptimized: false

  },

  prismic: {
    endpoint: "https://lumesquare.cdn.prismic.io/api/v2"
  },

  generate: {
    fallback: true
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ["vue-slicezone", "nuxt-sm"]
  },
  storybook :{
    stories: [...getStoriesPaths(), /*...*/]
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js'
    }
  }

};

