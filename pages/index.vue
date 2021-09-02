<!--
Looking for more information about the Slice Zone? Here's the documentation about it:
https://www.slicemachine.dev/documentation/nuxt/add-the-slice-zone-to-your-page
-->
<template>
   <section>
    <!-- <slice-zone type="mega_menu" uid="shop-location" /> -->

    <!-- <slice-zone type="home-page" queryType="single" /> -->

    <!-- <slice-zone type="home-page" queryType="single" /> -->

    <div class="header-wrapper">
      <img class="logo" :src="logo" alt="logo">

      <div class="link-block"
          v-for="(link,index) in links"
          :key="index">
        <a  href="#">
          {{link.primary.group_label}}
        </a>

        <div class="mega-nav-container">

          <slice-zone
            v-for="(slice,index) in link.items"
            :key="index"
            type="mega_menu"
            :uid="slice.mega_menu.uid"
          />

        </div>

      </div>
    </div>

  </section>
</template>

<script>
import SliceZone from "vue-slicezone";

export default {
  components: {
    SliceZone
  },
  data() {
    return {
      logo:'',
      links:[]
    }
  },
  // asyncData ({ $prismic }) {

  //   $prismic.api.query($prismic.predicates.at('document.type','main_navigation')).then(resp => {
  //     console.log('main_navigation 2',resp)
  //   })

  // },
  created() {
    const { $prismic } = this.$nuxt.context

    $prismic.api.getSingle('super_nav').then(resp => {
      console.log('super_nav',resp)
      const data = resp.data
      this.logo = data.logo.url
      this.links = data.body
    })

  },
  mounted() {
    // Fetch all products in your shop
    // this.$shopify.product.fetchAll().then((products) => {
    //   // Do something with the products
    //   console.log(products);
    // });

    // this.$dataService.getProductList({type: 'awesome type'}).then(resp => {
    //   console.log('resp', resp)
    // })

    this.$dataService.getProductData('ring-light').then(resp => {
      console.log('ring light data', resp)
    })

    // Fetch a single product by ID
    // const productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzg5NzQ3MDUyOTU5Mw==';

    // this.$shopify.product.fetch(productId).then((product) => {
    //   // Do something with the product
    //   console.log(product);
    // });


  }
};
</script>


<style scoped lang="scss">
  .header-wrapper {
    display: flex;
  }

  .logo {
    width: 300px;
  }

  .mega-nav-container {
    display: none;
  }

  .link-block:hover {
    .mega-nav-container {
      display: initial;
    }
  }
</style>

