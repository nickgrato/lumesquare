<template>
  <div>
    <icon-store/>

    <header-prismic/>
    <nuxt />

    <!-- <div class="p-8">
    <h1 class="font-bold text-2xl mb-8">Rick and Morty Characters</h1>
    <div class="grid grid-cols-3 gap-8">
      <article
        v-for="character in characters.results"
        :key="character.id"
        class="flex flex-col items-start"
      >
        <h2 class="font-bold">{{ character.name }}</h2>
        <div class="text-sm text-gray-800">
          <p>Gender: {{ character.gender }}</p>
          <p>Location: {{ character.location.name }}</p>
        </div>
        <NuxtLink
          :to="`/character/${character.id}`"
          class="border rounded px-2 py-1 text-gray-800 border-gray-800 text-sm mt-2"
        >
          Read more
        </NuxtLink>
      </article>
    </div>
  </div> -->
  <!-- :cartFreeshipping="parseInt(cartFreeshipping)"
      :cartFreeshippingToggle="cartFreeshippingToggle" -->
    <inlinecart-modal
      class="inlinecart-modal">
    </inlinecart-modal>
  </div>
</template>

<script>
import HeaderPrismic from '~/components/HeaderPrismic.vue'
import InlinecartModal from '~/components/modals/inline-cart/InlinecartModal.vue'
import { homePage } from '~/apollo/queries/test.gql'
import gql from 'graphql-tag'
import IconStore from '~/components/shared/icons/iconStore.vue'
import util from '~/mixins/util'

const ALL_CHARACTERS_QUERY = gql`
  query ALL_CHARACTERS_QUERY {
    characters {
      results {
        id
        name
        gender
        location {
          name
        }
      }
    }
  }
`;

export default {
  mixins: [util],
  components: {
    HeaderPrismic,
    IconStore,
    InlinecartModal
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
  // apollo: {
  //   characters: {
  //     query: ALL_CHARACTERS_QUERY,
  //     prefetch: true,
  //   },
  // },

  // apollo: {
  //   homePage: {
  //     prefetch: true,
  //     query: homePage
  //   }
  // },

  // apollo: {
  //   homePage: gql`query MEU_QUERY {
  //     three_nav {
  //       _meta{
  //         id
  //       }
  //     }
  //   }`,
  // },

  // Called before rendering the layout (even for error page)
  async middleware({ store, $prismic }) {
    const dto = {
    "current_currency": {
        "name": "United States Dollar",
        "iso_code": "USD",
        "symbol": "$"
    },
    "currency_options": [
        {
            "name": "Australian Dollar",
            "iso_code": "AUD"
        },
        {
            "name": "Euro",
            "iso_code": "EUR"
        },
        {
            "name": "United States Dollar",
            "iso_code": "USD"
        }
      ]
    }

    // Use commit to call a mutation - if not using the action atall.. consider
    // this.$store.commit('fruits/addFruit', newFruit)
    await store.dispatch('fetchMenu', $prismic)
    await store.dispatch('currency/setCurrencySetting', dto)





    // $prismic.api.getSingle('three_nav').then(resp => {
    //   console.log('best_sellers',resp)
    // })
    // $prismic.api.query('').then(function(response) {
    //     // response is the response object, response.results holds the documents
    //   console.log('response',response)

    // })
  },
  methods: {
    initCheckout() {

      const { store, $shopify, $localHostService } = this.$nuxt.context
      const CHECKOUT_ID = 'checkout_id'
      const checkout_id = $localHostService.localStorageGet(CHECKOUT_ID)

      if(!checkout_id) {
        // no checkout -  create new cart here.
        let self = this
        $shopify.checkout.create().then((checkout) => {
          // Save new checkout id to the local storage
          $localHostService.localStorageSave(CHECKOUT_ID, checkout.id)
          // Set NewId to store
          store.dispatch('checkout/setCheckout', checkout.id)
        })
        return
      }

      // // Get Current Id
      store.dispatch('checkout/setCheckout', checkout_id)

    }
  },
  mounted() {
    const { $prismic } = this.$nuxt.context

    const query = `{
      main_navigation {
       display_name
     }
    }`


    // console.log('$prismic',$prismic)

    // $prismic.api.query($prismic.predicates.at('document.type','main_navigation')).then(resp => {
    //   console.log('main_navigation',resp)
    // })
  },
  created() {
    this.initCheckout()
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.inlinecart-modal {
 position: absolute;
 top: 0px;
}
</style>
