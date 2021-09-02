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
        v-if="metafields.show_announcement_text && metafields.show_announcement_text.value == 'true'"
        v-html="metafields.announcement_text.value">
      </div>
    </div>

    <!-- WATCH VIDEO BUTTON  -->
    <div class="video-button-container" v-if="metafields.has_video_button && metafields.has_video_button.value == 'true'">
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

        <accordion-section
          color="light"
          title="Description">
          <template  v-slot:body>
            <div class="accordion-description" v-if="metafields.description_text" v-html="metafields.description_text.value">

            </div>
          </template>
        </accordion-section>

        <accordion-section
          color="light"
          title="Product Features">
          <template  v-slot:body>
            <div>
              <ul>
                <li class="accordion-list" v-for="(feature,index) in features"
                  :key="index">
                  {{feature}}
                </li>
              </ul>
            </div>
          </template>
        </accordion-section>

        <accordion-section
          color="light"
          title="In the Box">
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
        v-if="metafields.show_announcement_text == 'true'"
        v-html="metafields.announcement_text">
      </div>
    </div>

    <!-- SHIPPING NOTICE  -->
    <!-- <div class="shipping-notice-container" v-if="!isGiftCard" >
      <div class="shipping-notice"
        v-html="productSettings.settings.shipping_details_content">
      </div>
    </div> -->

  </div>
</template>

// JavaScript
<script>
//Mixins
import isTablet from '~/mixins/isMobile'
import util from '~/mixins/util'
//Services
// import { ProductService } from 'scripts/services/product.service.js'
// import { mapState } from 'vuex'
// import { CartDispatch, ToastDispatch, ModalDispatch } from 'scripts/store/dispatch.js'
// Components
import Currency from '~/components/base/Currency.vue'
import Icon from '~/components/shared/icons/Icon.vue'
import AccordionSection from '~/components/shared/accordions/AccordionSection.vue'
import AccordionWrapper from '~/components/shared/accordions/AccordionWrapper.vue'
import GeneralButton from '~/components/shared/buttons/GeneralButton.vue'
// Const
// const productService = new ProductService()
// Emit Events
const Emit = {
  PlayVideoButtonClick:'playVideoButtonClick',
  ReviewStarClick: 'reviewStarClick'
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

      const id = this.productData.variants[0].id
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

    // ...mapState({
    //   productSettings: (state) => state.dtoProductSettings.productSettings,
    // }),
  },
  methods: {

    createAccordionData() {
      this.boxs = this.metafields.box ? this.metafields.box.value.split(',') : ''
      this.features = this.metafields.features ? this.metafields.features.value.split(','): ''
    },

    onAddToCart() {

      const lineItemsToAdd = [{
        variantId: this.variantID,
        quantity: 1,
        customAttributes: [{key: "handle", value:this.productData.handle}]
      }]

      this.$store.dispatch('checkout/addItem', lineItemsToAdd)
        .catch((error) =>
          console.error(error)
        )
        .then(() => {
          this.$store.dispatch('checkout/openSidecart')
        })

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
  mounted(){
    // this.setUpKlarnHack()
    this.$shopify.checkout.fetch(this.$store.state.checkout.checkoutId).then((checkout) => {
      // Do something with the checkout
      console.log('checkout- current ',checkout)
    });

    console.log('item object',this.productData)

  },
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
      // /deep/ * {
      //   @include primary-font();
      //   @include font-size(14);
      //   color: $b-dark-blue;
      //   letter-spacing: 0;
      //   line-height: 24px;
      //   margin:0px;
      // }
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
    // /deep/ *{
    //   @include primary-font();
    //   @include font-size(12);
    //   color: $b-dark-blue;
    //   letter-spacing: 0;
    //   line-height: 22px;
    //   text-align: center;
    // }

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
    // /deep/ * {
    //   @include body-md
    // }
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
