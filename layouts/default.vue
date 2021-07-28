<template>
  <div class="homepage">
    <header-prismic/>
    <nuxt />
  </div>
</template>

<script>
import HeaderPrismic from '~/components/HeaderPrismic.vue'

export default {
  components: {
    HeaderPrismic
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
  // Called before rendering the layout (even for error page)
  async middleware({ store, $prismic }) {
    await store.dispatch('fetchMenu', $prismic)

    // $prismic.api.getSingle('three_nav').then(resp => {
    //   console.log('best_sellers',resp)
    // })
    // $prismic.api.query('').then(function(response) {
    //     // response is the response object, response.results holds the documents
    //   console.log('response',response)

    // })
  },
  mounted() {
    const { $prismic } = this.$nuxt.context

    // $prismic.api.getSingle('main_navigation').then(resp => {
    //   console.log('main_navigation',resp)
    // })
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
</style>
