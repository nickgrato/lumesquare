// Template
<template>
  <div class="card-wrapper" :class="getlayout" v-if="product">

    <!-- BADGE  -->
    <div class="card-badge" v-if="badge.length">{{ badge }}</div>

    <a  class="card-container"
      :href="getProductUrl"
      @mouseleave="offHoverCard()"
      @mouseenter="onHoverCard()">

      <div class="image-wrapper" :class="{ loading: imgLoading }">
        <image-format
          :src="featuredImage"
          :specs="getImageSpecs"
          :size="featuredImageSize"
          :alt="product.title"
          @loaded="imageLoaded">
        </image-format>

        <general-button
          @clicked="quckAdd($event)"
          class="hover-button"
          :disabled="!product.variants[0].available"
          :text="product.variants[0].available ? 'Add To Cart':'Out Of Stock'">
        </general-button>

      </div>

      <!-- CARD CONTENTS  -->
      <div v-if="!isShowFullName" class="card-title">{{ product.title | truncate(30)}}</div>
      <div v-if="isShowFullName" class="card-title">{{ product.title }}</div>

      <!-- REVIEW STARS  -->
      <div class="review-star-wrapper" v-if="!reviewLoading">
        <!-- FULL REVIEW STARS -->
        <div
          class="review-star-container"
          v-for="start in getCountArray(fullStarCount)"
          :key="start.id">
          <icon
            class="review-star"
            name="review-star"
            fill-class="star-fill"
            size="16px">
          </icon>
        </div>

        <!-- EMPTY REVIEW STARS -->
        <div
          class="review-star-container"
          v-for="start in getCountArray(emptyStarCount)"
          :key="start.id">
          <icon
            class="review-star"
            name="review-star-empty"
            fill-class="star-fill"
            size="16px">
          </icon>
        </div>

        <div class="review-count">({{ reviewCount }})</div>
      </div>

      <!-- CARD PRICES  -->
      <div class="card-price-wrapper">

        <!-- COMPARE PRICE (HIGHER NUMBER)  -->
        <div class="card-compare-price"
          v-if="comparePrice && price != comparePrice">
          {{ comparePrice | money(currencySymbole, isMoneyFormated) }}
        </div>

        <!-- CURRENT PRICE  -->
        <div class="card-price"
          :class="getPriceStyle">
          {{ price | money(currencySymbole,isMoneyFormated) }}
        </div>

      </div>
    </a>
  </div>
</template>

// JS
<script>
import { getCountArray } from '~/assets/js/util'
// Components
import ImageFormat from '~/components/shared/image/ImageFormat.vue'
import Currency from '~/components/base/Currency.vue'
import GeneralButton from '~/components/shared/buttons/GeneralButton.vue'
import Icon from '~/components/shared/icons/Icon.vue'

export default {
  name: 'ProductCard',
  extends: Currency,
  components: {
    ImageFormat,
    GeneralButton,
    Icon
  },
  data() {
    return {
      featuredImage: '',
      featuredImageStore: '',
      featuredImageSize: '464x600',
      currencySymbole: '$',
      hoverImage: '',
      productImages: [],
      price: 0,
      comparePrice: null,
      selectedVariant: this.product.variants[0].id,
      badge: '',
      imgLoading: true,
      reviewLoading: true,
      fullStarCount: 5,
      emptyStarCount: 5, // how many to subtract from full #
      reviewCount: 0,
      isShowFullName: false
    }
  },
  props: {
    product: Object,
    isCollection: {
      type: Boolean,
      default: false,
    },
    isSearch: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    getProductUrl() {
      return `/products/${this.product.handle}`
    },

    getPriceStyle() {
      if (this.comparePrice && this.comparePrice != this.price) return 'sale'
    },

     getImageSpecs() {
      const desktop = { height: 300, width: 232 }
      const mobileDefault = { height: 251, width: 194 }
      const collection = { height: 220, width: 170 }
      const mobile =  this.isCollection ? collection : mobileDefault

      const specs = this.isMobile() ? mobile : desktop
      return specs
    },

    /**
     * Note: Design wants the collection cards
     * smaller than everywhere else.
     * not sure if we need this just yet...
     */
    getlayout() {
      if (this.isCollection) return 'collection-card'

      return 'defualt-card'
    },

    isMoneyFormated(){
      let isFormatted = true
      if(this.isSearch){
        isFormatted = false
      }
      return isFormatted
    }
  },
  methods: {
    getCountArray,

    isMobile(){
      return this.$mq === 'mobile_small'
    },

    /**
     * Gather General Card Data
     */
    productSetup() {
      this.featuredImageStore = this.product.images[0].src
      this.featuredImage = this.featuredImageStore
      this.hoverImage = this.product.images[1]
        ? this.product.images[1].src
        : null
      this.price = this.product.variants[0].price
      const comparePrice = this.product.variants[0].compareAtPriceV2
      this.comparePrice = comparePrice ? comparePrice.amount : null
      this.getProductBadge()
      this.getProductReviews()
    },

    async getProductReviews() {
      const metafields = await this.$dataService.getProductMetafieldData(this.product.handle)
      const okendo = JSON.parse(metafields.review_summary.value)
      this.reviewCount = okendo.reviewCount
      this.fullStarCount = Math.round(okendo.reviewAverageValue)
      this.emptyStarCount = 5 - this.fullStarCount
      this.reviewLoading = this.reviewCount == null
    },

    /**
     * Get Card Badges
     */
    async getProductBadge() {
      const badgeTag = 'Badge::'
      const additionalData = await this.$dataService.getAdditionalProductData(this.product.handle)

      if(!additionalData.tags) return
      const tag = additionalData.tags.find((tag) => {
        return tag.indexOf(badgeTag) >= 0
      })

      if (!tag) return
      this.badge = tag.replace(badgeTag, '').replace('-', ' ')
    },


    /**
     * Show Hover Image
     */
    showHoverImage() {
      if (this.hoverImage) this.featuredImage = this.hoverImage
    },

    /**
     * Hide Hover Image
     */
    hideHoverImage() {
      if (this.hoverImage) this.featuredImage = this.featuredImageStore
    },

    /******************
     *     EVENTS
     ******************/

    /**
     * On image load
     */
    imageLoaded() {
      this.imgLoading = false
    },

    /**
     * @param event Event
     * On quick add click
     */
    quckAdd(event) {
      event.preventDefault()

      const lineItemsToAdd = [{
        variantId: this.selectedVariant,
        quantity: 1,
        customAttributes: [{key: "handle", value:this.product.handle}]
      }]

      this.$store.dispatch('checkout/addItem', lineItemsToAdd)
        .catch((error) =>
          console.error(error)
        )
        .then(() => {
          this.$store.dispatch('checkout/openSidecart')
        })

    },

    /**
     * On Hover Card
     */
    onHoverCard() {
      if (this.hoverImage) this.showHoverImage()

      this.showFullName(true)
    },

    /**
     * Off Hover Card
     */
    offHoverCard() {
      if (this.hoverImage) this.hideHoverImage()

      this.showFullName(false)
    },

    /**
     * @param show boolean
     * show full name that is usually truncated
     */
    showFullName(show){
      this.isShowFullName = show
    },
  },
  mounted() {
    this.productSetup()
  },
}
</script>

// SCSS
<style lang="scss" scoped>
.card-wrapper {
  width: 232px;
  margin: 20px;
  position: relative;

  @include mobile-down {
    width: 200px;
    margin: 16px;
  }
}

.defualt-card {
  // @include mobile-only {
  //   width: 250px;
  // }
}

.card-badge {
  @include font-size(10);
  padding: 3px 8px;
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  color: $white;
  font-weight: $bold-f;
  letter-spacing: 0.92px;
  line-height: 17px;
  background-color: $b-green;
  border-radius: 6px;
  margin-bottom: 8px;
  display: inline-block;
  text-transform: capitalize;
}

.collection-card {

  @include mobile-down {
    width: 176px;
    margin: 4px;
  }

  .card-title {
    @include mobile-down {
      @include font-size(12);
    }
  }

  .image-wrapper {
    @include mobile-down {
      width: 176px;
    }
  }

  // width: calc(50% - 16px);

  // @include mobile-only {
  //   margin: 20px 8px;
  // }

  // @include tablet-large-up {
  //   width: calc(33% - 40px);
  // }

  // @include desktop-up {
  //   width: calc(50% - 40px);
  // }

  // @include desktop-large-up {
  //   width: calc(33% - 40px);
  // }
}

.card-container {
  display: block;

  &:hover {
    .hover-button {
      display: initial;
    }
  }
}

.card-type {
  @include primary-font(300);
  @include font-size(13);
  color: $black;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.card-title {
  @include primary-font(600);
  @include font-size(14);
  color: $b-dark-blue;
  letter-spacing: 0;
  line-height: 25px;
  margin-bottom: 4px;
}



/*-------------------------------
  PRICES
-------------------------------*/
.card-price-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 8px;
}

.card-price,
.card-compare-price {
  @include primary-font();
  @include font-size(14);
  letter-spacing: 0;
  margin: 0 2px;
}

.card-price {
  color: $black;
}

.card-compare-price {
  text-decoration: line-through;
  color: $b-dark-blue;
  margin-right: 10px;
}

.sale {
  color: $b-bright-blue;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 12px;
  transition: $transition;
  width: 232px;

  @include mobile-down {
    width: 200px;
  }

  img {
    height: auto;
  }

  &.loading {
    // min-height: 159px;

    // @include tablet-up {
    //   min-height: 300px;
    // }
  }
}

.hover-button {
  position: absolute;
  bottom: 16px;
  display: none;

  // @include mobile-only {
  //   width: 145px;
  // }
}

.max-indicator {
  @include primary-font(300);
  @include font-size(13);
  color: $dark-grey;
  letter-spacing: 0;
  line-height: 16px;
  margin-top: 2px;
  margin-left: 2px;
}


/*-------------------------------
  REVIEW STARS
  -------------------------------*/

  .review-star-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .review-star-container {
    display: flex;
  }

  .review-star {
    margin: 0px 2px;
  }

  .review-count {
    @include primary-font();
    @include font-size(14);
    color: $b-orange;
    letter-spacing: 0;
    margin-left: 4px;
  }

  .star-fill {
    fill: $b-orange;
  }

</style>
