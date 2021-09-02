<template>

  <div v-if="!loadingPage" class="product-page-wrapper">
      <div class="product-page-container">



        <!-- PDP Main  Above Fold Content  -->
        <div class="main-content-wrapper">
          <div class="main-content-container">
            <!-- Desktop Images  -->
            <div v-if="!isTablet" >
              <featured-images
                :images="product.images.edges">
              </featured-images>
            </div>

            <!-- Mobile Header ( slider title etc..)  -->
            <div v-if="isTablet">
              <mobile-header
                :images="product.images.edges">
              </mobile-header>
            </div>

            <!-- Product information  -->
            <div class="product-inforation-wrapper" id="product-info" >
              <product-information
                @playVideoButtonClick="onPlayVideoButtonClick()"
                @reviewStarClick="onReviewStarClick()"
                :productData="product"
                :is-gift-card="isGiftCard"
                :metafields="metafields">
              </product-information>


              <product-upsell
                v-if="metafields.upsell_handle && metafields.upsell_handle.value.length"
                :handle="metafields.upsell_handle.value"
                :description="metafields.upsell_description.value">
              </product-upsell>
            </div>

          </div>
        </div>

        <!-- Featured Video  -->
        <!-- <featured-video
          v-if="metafields.featured_video"
          :title="metafields.featured_video_title"
          :id="metafields.featured_video">
        </featured-video> -->

        <!-- FIFTY FIFTY  -->
        <!-- <fifty-fifty
          v-if="metafields.ff_show == 'true'"
          :image="metafields.ff_image"
          :image-mobile="metafields.ff_image_mobile"
          :subheading="metafields.ff_subheading"
          :heading="metafields.ff_heading"
          :body="metafields.ff_body"
          :enable-cta="metafields.ff_enable_cta == 'true'"
          :cta-text="metafields.ff_cta"
          :cta-url="metafields.ff_cta_url"
          layout="right"
          cta-type="primary"
          text-background-type="color"
          text-background-color="#F8F8F8"
          subheading-color="#0D1542"
          body-color="#0D1542"
          heading-color="#0D1542">
        </fifty-fifty> -->

        <!-- PRODUCT COMPARE  -->
        <!-- <product-compare
          v-if="metafields.compare_show == 'true'"
          :compare_products="metafields.compare_products"
          :handle="handle"
          :title="metafields.compare_title"
          :compare-cta="metafields.compare_cta"
          :compare-cta-url="metafields.compare_cta_url">
        </product-compare> -->

        <!-- Reviews  -->
        <!-- <div class="reviews-wrapper">
          <div class="reviews-scroll-flag" ref="reviews"></div>
          <div class="reviews-container">
            <div class="reviews-title h2">Customer Reviews</div>
            <slot name="reviews"></slot>
          </div>
        </div> -->

        <!-- Featured Collection   -->
        <div class="featured-collection-wrapper" v-if="product.collections.edges">
          <featured-collection
            :collection-id="product.collections.edges[0].node.id"
            title="Related Products">
          </featured-collection>
        </div>

      </div>
    </div>
</template>

<script>
import FeaturedImages from '~/components/templates/product/FeaturedImages.vue'
import ProductInformation from '~/components/templates/product/ProductInformation.vue'
import ProductUpsell from '~/components/templates/product/ProductUpsell.vue'
import MobileHeader from '~/components/templates/product/MobileHeader.vue'
import FeaturedCollection from '~/components/sections/FeaturedCollection.vue'

//Mixins
import isTablet from '~/mixins/isMobile'

export default {
  data() {
    return {
      product: {},
      metafields: {},
      loadingPage:true,
      showVideo: false,
      isGiftCard: false, //todo

    };
  },
  mixins: [isTablet],
  components: {
    FeaturedImages,
    ProductInformation,
    ProductUpsell,
    MobileHeader,
    FeaturedCollection
  },
  methods:{
    async getProductData(productHandle){
      // this.product = await this.$shopify.product.fetchByHandle(productHandle)
      this.product = await  this.$dataService.getProductData(productHandle)

      this.metafields = await this.$dataService.getProductMetafieldData(productHandle)
      console.log('meta',this.product)
      console.log('product',this.metafields)
      this.loadingPage = false
    },
    onPlayVideoButtonClick() {
      this.showVideo = true
    },
  },
  mounted() {
    const productHandle = this.$route.params.id

    // If no param do somethin here....
    if(!productHandle) return

    this.getProductData(productHandle)

    // this.$shopify.product.fetchByHandle(productHandle).then( product => {
    //     // console.log('product',this.product)
    //     console.log('product',product)
    //     this.product = product
    //     this.loadingPage = false
    // })

    // // need to make this service... maybe rename?
    // this.$dataService.getProductMetafieldData(productHandle).then(resp => {
    //   console.log('meta data', resp)
    // })


  },
};
</script>



// SCSS
<style lang="scss" >

.product-page-wrapper {
  display: flex;
  justify-content: center;
  color:$dark-grey;
}

.product-page-container {
  width: 100%;
  margin-top: 48px;

  @include desktop-down {
    margin-top: initial;
  }
}

.product-inforation-wrapper {
  padding: 0px 0px 16px 72px;
  max-width: 434px;
  min-width: 434px;
  width: 434px;

  @include desktop-down {
    padding: 16px;
    max-width: 100%;
    min-width: 100%;
    width: 100%;
  }
}

.main-content {
  &-wrapper {
    display: flex;
    justify-content: center;
    padding: 0px 16px;
  }

  &-container {
    max-width: 1400px;
    display: flex;

    @include desktop-down {
      flex-direction: column;
    }
  }
}

</style>
