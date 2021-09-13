// template
<template>
  <div class="u-relative">

    <div class="review-price-wrapper">

      <!-- REVIEW STARS  -->
      <div class="review-star-wrapper"
        v-if="!reviewLoading"
        @click="reviewStarClick()">

        <div
          class="review-star-container"
          v-for="start in getCountArray(fullStarCount)"
          :key="start.id">
          <icon
            class="review-star"
            name="review-star"
            fill-class="star-fill"
            size="14px">
          </icon>
        </div>

        <div
          class="review-star-container"
          v-for="start in getCountArray(emptyStarCount)"
          :key="start.id">
          <icon
            class="review-star"
            name="review-star-empty"
            fill-class="star-fill"
            size="14px">
          </icon>
        </div>

        <div class="review-count">({{ reviewCount }} Reviews)</div>
      </div>


      <div class="margin-bottom-10" v-if="isTablet">

        <!-- COMPARE PRICE (HIGHER NUMBER)  -->
        <span
          class="price compare"
          v-if="compareAtPrice">
            {{compareAtPrice | money(currencySymbole, true) }}
        </span>

        <!-- CURRENT PRICE  -->
        <span class="price" :class="isOnSale">{{ price | money(currencySymbole,true) }}</span>
      </div>

    </div>


    <!-- TITLE  -->
    <h1 class="product-title h2">{{productData.title}}</h1>

    <!-- DESCRIPTION  -->
    <div class="description-wrapper">
      <div class="description-body" v-html="productData.description"></div>
    </div>


    <!-- PRICE  -->
    <div class="price-wrapper" v-if="!isTablet">

      <!-- COMPARE PRICE (HIGHER NUMBER)  -->
      <span
        class="price compare"
        v-if="compareAtPrice">
          {{ compareAtPrice | money(currencySymbole, true) }}
      </span>

      <!-- CURRENT PRICE  -->
      <span class="price" :class="isOnSale">{{ price | money(currencySymbole, true) }}</span>
    </div>


    <!-- KLARNA CONTAINER-->
    <div class="klarna-container"></div>

    <!-- ADD TO CART BUTTON - MOBILE -->
    <div class="cart-button-container"
      v-if="isTablet">
      <general-button
        @clicked="onAddToCart()"
        text="Add To Cart"
        type="button">
      </general-button>

      <!-- ANNCOUNCEMENT TEXT  -->
      <div class="announcement-text"
        v-if="showAnnouncementText"
        v-html="announcementText">
      </div>
    </div>

    <!-- WATCH VIDEO BUTTON  -->
    <div class="video-button-container" v-if="hasVideoButton">
      <general-button
        @clicked="onPlayVideoButtonClick()"
        text="How to"
        iconName="play"
        category="quad"
        type="button">
      </general-button>
    </div>

    <!-- Accordion -->
    <div class="accordion-wrapper" v-if="!isGiftCard">

      <accordion-wrapper>

        <!-- PRODUCT FEATURES  -->
        <accordion-section
          color="light"
          title="What Does This Product Do?">
          <template  v-slot:body>
            <div>
              <ul>
                <li class="accordion-list" v-for="(feature,index) in features"
                  :key="index"
                  v-html="feature">
                </li>
              </ul>
              <!-- <button v-if="feature_show" class="accordion-link" @click="featuredClick()">View Tech Specs</button> -->
            </div>
          </template>
        </accordion-section>

        <!-- IN THE BOX  -->
        <accordion-section
          color="light"
          title="What's In The Box?">
          <template  v-slot:body>
            <div>
              <ul>
                <li class="accordion-list" v-for="(box,index) in boxs"
                  :key="index">
                  {{box}}
                </li>
              </ul>
            </div>
          </template>
        </accordion-section>

      </accordion-wrapper>
    </div>

    <!-- ADD TO CART BUTTON  -->
    <div class="cart-button-container"
      v-if="!isTablet" >
      <general-button
        @clicked="onAddToCart()"
        text="Add To Cart"
        type="button">
      </general-button>

      <!-- ANNCOUNCEMENT TEXT  -->
      <div class="announcement-text body-md"
        v-if="showAnnouncementText"
        v-html="announcementText">
      </div>
    </div>

    <!-- SHIPPING NOTICE  -->
    <div class="shipping-notice-container" v-if="!isGiftCard" >
      <div class="shipping-notice" >
        <prismic-rich-text :field="$store.state.productSettings.shippingDetailsContent"/>
      </div>
    </div>

  </div>
</template>

// JavaScript
<script>
//Mixins
import isTablet from '~/mixins/isMobile'
import util from '~/mixins/util'
// Components
import Currency from '~/components/base/Currency.vue'
import Icon from '~/components/shared/icons/Icon.vue'
import AccordionSection from '~/components/shared/accordions/AccordionSection.vue'
import AccordionWrapper from '~/components/shared/accordions/AccordionWrapper.vue'
import GeneralButton from '~/components/shared/buttons/GeneralButton.vue'
// Emit Events
const Emit = {
  PlayVideoButtonClick:'playVideoButtonClick',
  ReviewStarClick: 'reviewStarClick',
  FeaturedClick: 'featuredClick'
}

export default {
  name: 'ProductInformation',
  extends: Currency,
  mixins: [isTablet,util],
  props: {
    productData:Object,
    metafields:Object,
    isGiftCard: false
  },
  data: function() {
    return {
      boxs:[],
      features:[],
      currencySymbole: '$',
      reviewLoading: false,
      // reviewLoading: true,
      fullStarCount: 5,
      emptyStarCount: 5,
      reviewCount: 0,
      klarnaId: '351085f2-cfb5-4961-af9c-4ea28169aad2'
    }
  },
  components: {
    Icon,
    AccordionSection,
    AccordionWrapper,
    GeneralButton
  },
  computed:{
    variantID(){
      if(!this.productData) return

      const id = this.productData.variants.edges[0].node.id
      return id
    },

    compareAtPrice(){
      if(!this.productData) return

      const compareAtPrice = this.productData.variants.edges[0].node.compareAtPrice
      const compareAtPriceFinal = compareAtPrice ? compareAtPrice : 0
      return compareAtPriceFinal
    },

    price() {
      if(!this.productData) return

      const price = this.productData.variants.edges[0].node.priceV2.amount
      return price
    },

    isOnSale(){
      let onSale = ''
      if(this.productData.variants.edges[0].node.compareAtPrice > 0) {
        onSale = 'on-sale'
      }
      return onSale
    },

    announcementText() {
      const value = this.metafields.announcement_text
        ? this.metafields.announcement_text.value
        : ''
      return value
    },

    showAnnouncementText() {
      const value = this.metafields.show_announcement_text
        ? this.metafields.show_announcement_text.value === 'true'
        : false
      return value
    },

    hasVideoButton() {
      const value = this.metafields.has_video_button
        ? this.metafields.has_video_button.value === 'true'
        : false
      return value
    }

  },
  methods: {

    createAccordionData() {
      this.boxs = this.metafields.box ? this.metafields.box.value.split(',') : ''
      this.features = this.metafields.features ? this.metafields.features.value.split(','): ''
    },

    featuredClick(){
      this.$emit(Emit.FeaturedClick)
    },


    onAddToCart() {

      const lineItemsToAdd = [{
        variantId: this.variantID,
        quantity: 1,
        customAttributes: [{key: "handle", value:this.productData.handle}]
      }]

      this.$store.dispatch('checkout/openSidecart')
      this.$store.dispatch('checkout/addItem', lineItemsToAdd)
        .catch((error) =>
          // todo maybe add a better ui here with a toast
          console.error(error)
        )

    },

    onPlayVideoButtonClick() {
      this.$emit(Emit.PlayVideoButtonClick)
    },

    initProductReviews(){
      // NO REVIEWS
      if(!this.metafields.review_summary) {
        this.fullStarCount = 0
        this.emptyStarCount = 0
        return
      }

      const okendo = JSON.parse(this.metafields.review_summary.value)
      this.reviewCount = okendo.reviewCount
      this.fullStarCount = Math.round(okendo.reviewAverageValue)
      this.emptyStarCount = 5 - this.fullStarCount
      // this.reviewLoading = this.reviewCount == null
    },

    reviewStarClick() {
      // this.$emit(Emit.ReviewStarClick)
    },

  },
  mounted(){},
  created: function() {
    this.createAccordionData()
    this.initProductReviews()
  },
}
</script>

// SCSS
<style lang="scss" scoped>

  .product-title {
    @include primary-font();
    @include font-size(23);
    line-height: 27px;
    margin-bottom: 8px;
  }

  .price {
    @include primary-font(600);
    @include font-size(14);
    color: $b-dark-blue;
    letter-spacing: 0;
    line-height: 20px;

    &-wrapper {
      margin-bottom: 16px;
    }

    &.compare {
      text-decoration: line-through;
      color: $b-dark-blue;
      margin-right: 10px;
    }
  }

  .on-sale {
    color:$b-bright-blue;
  }

  .description {

    &-wrapper {
      margin-bottom: 8px;
    }

    &-body {
      ::v-deep {
        @include primary-font();
        @include font-size(12);
        color: $b-dark-blue;
        letter-spacing: 0;
        line-height: 24px;
        margin:0px;
      }
    }
  }

  .accordion-wrapper {
    width: 100%;
    margin-bottom: 16px;
  }

  .accordion-list {
    @include primary-font();
    @include font-size(14);
    color: $b-dark-blue;
    letter-spacing: 0;
    line-height: 24px;
  }

  .accordion-description {
    @include primary-font();
    @include font-size(14);
    color: $b-dark-blue;
    letter-spacing: 0;
    line-height: 22px;
  }

  .video-button-container {
    margin-bottom: 16px;

    @include tablet-down() {
      button {
        width: 100%;
      }
    }
  }

  .shipping-notice {

      @include primary-font();
      @include font-size(12);
      color: $b-dark-blue;
      letter-spacing: 0;
      line-height: 22px;
      text-align: center;


    &-container {
      margin-bottom: 10px;
    }
  }

  .cart-button-container {
    button {
      width: 100%;
    }
    margin-bottom: 16px;
  }

  .announcement-text {
    text-align: center;
    margin: 10px 0px;
    ::v-deep {
      @include body-md
    }
  }

  .klarna-container {
    width: auto;
  }

  /*-------------------------------
  REVIEW STARS
  -------------------------------*/

  .review-star-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &:hover {
      cursor: pointer;
    }
  }

  .review-star-container {
    display: flex;
  }

  .review-star {
    margin: 0px 2px;
  }

  .review-count {
    @include primary-font();
    @include font-size(12);
    color: $b-dark-blue;
    letter-spacing: 0;
    margin-left: 4px;
    letter-spacing: 0;
    line-height: 25px;
    padding-top: 2px;
  }

  .star-fill {
    fill: $b-bright-blue;
  }

  .review-price-wrapper {
    display: flex;
    justify-content:space-between;
    align-items: center;
  }

</style>
