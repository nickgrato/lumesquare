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
        <featured-video
          v-if="featuredVideo"
          :title="featuredVideoTitle"
          :id="featuredVideo">
        </featured-video>

        <!-- FIFTY FIFTY  -->
        <fifty-fifty
          v-if="ffShow"
          :image="ffImage"
          :image-mobile="ffImageMobile"
          :subheading="ffSubheading"
          :heading="ffHeading"
          :body="ffBody"
          :enable-cta="ffEnableCta"
          :cta-text="ffCta"
          :cta-url="ffCtaUrl"
          layout="right"
          cta-type="primary"
          text-background-type="color"
          text-background-color="#F8F8F8"
          subheading-color="#0D1542"
          body-color="#0D1542"
          heading-color="#0D1542">
        </fifty-fifty>

        <!-- PRODUCT COMPARE  -->
        <product-compare
          v-if="compareShow"
          :compare_products="compareProducts"
          :handle="handle"
          :title="compareTitle"
          :compare-cta="compareCta"
          :compare-cta-url="compareCtaUrl">
        </product-compare>

        <!-- Reviews  TODO need okendo api -->
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
const FiftyFifty = () => import('~/components/sections/FiftyFifty.vue')
const FeaturedVideo = () => import('~/components/shared/video/FeaturedVideo.vue')
const ProductCompare = () => import('~/components/templates/product/ProductCompare.vue')

//Mixins
import isTablet from '~/mixins/isMobile'

export default {
  data() {
    return {
      product: {},
      metafields: {},
      loadingPage:true,
      showVideo: false,
      isGiftCard: false,
      handle:''
    };
  },
  mixins: [isTablet],
  components: {
    FeaturedImages,
    ProductInformation,
    ProductUpsell,
    MobileHeader,
    FeaturedCollection,
    FiftyFifty,
    FeaturedVideo,
    ProductCompare
  },
  methods:{
    async getProductData(productHandle){
      this.product = await  this.$dataService.getProductData(productHandle)
      this.metafields = await this.$dataService.getProductMetafieldData(productHandle)
      this.isGiftCard = this.product.productType === 'Gift Card'
      this.loadingPage = false

      console.log('product',this.product)
      console.log('meta',this.metafields)
    },
    onPlayVideoButtonClick() {
      this.showVideo = true
    },
  },
  computed: {
    featuredVideo() {
      const value = this.metafields.featured_video
        ? this.metafields.featured_video.value
        : ''
      return value
    },

    featuredVideoTitle() {
      const value = this.metafields.featured_video_title
        ? this.metafields.featured_video_title.value
        : ''
      return value
    },

    ffShow() {
      const value = this.metafields.ff_show
        ? this.metafields.ff_show.value === 'true'
        : false
      return value
    },

    ffImage() {
      const value = this.metafields.ff_image
        ? this.metafields.ff_image.value
        : ''
      return value
    },

    ffImageMobile() {
      const value = this.metafields.ff_image_mobile
        ? this.metafields.ff_image_mobile.value
        : ''
      return value
    },

    ffSubheading() {
      const value = this.metafields.ff_subheading
        ? this.metafields.ff_subheading.value
        : ''
      return value
    },

    ffHeading() {
      const value = this.metafields.ff_heading
        ? this.metafields.ff_heading.value
        : ''
      return value
    },

    ffBody() {
      const value = this.metafields.ff_body
        ? this.metafields.ff_body.value
        : ''
      return value
    },

    ffCta() {
      const value = this.metafields.ff_cta
        ? this.metafields.ff_cta.value
        : ''
      return value
    },

    ffCtaUrl() {
      const value = this.metafields.ff_cta_url
        ? this.metafields.ff_cta_url.value
        : ''
      return value
    },

    ffEnableCta() {
      const value = this.metafields.ff_enable_cta
        ? this.metafields.ff_enable_cta.value === 'true'
        : false
      return value
    },

    compareShow() {
      const value = this.metafields.compare_show
        ? this.metafields.compare_show.value
        : ''
      return value
    },

    compareProducts() {
      const value = this.metafields.compare_products
        ? JSON.parse(this.metafields.compare_products.value)
        : ''
      return value
    },

    compareTitle() {
      const value = this.metafields.compare_title
        ? this.metafields.compare_title.value
        : ''
      return value
    },

    compareCta() {
      const value = this.metafields.compare_cta
        ? this.metafields.compare_cta.value
        : ''
      return value
    },

    compareCtaUrl() {
      const value = this.metafields.compare_cta_url
        ? this.metafields.compare_cta_url.value
        : ''
      return value
    },


  },
  mounted() {
    const productHandle = this.$route.params.id

    // If no param do somethin here....
    if(!productHandle) return

    this.handle = productHandle

    this.getProductData(productHandle)

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
