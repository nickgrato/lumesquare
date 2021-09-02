// Template
<template>
  <div id="inlineCartContent" class="inlineCart__content">

    <div
      class="inlineCart__title"
      :class="{ borderBottom: !cartFreeshippingToggle }">
      Your Cart <span class="inlineCart__title-count">({{totalItems}} items)</span>
    </div>

    <div class="progress-wrapper">
      <div class="progress-container">
        <div class="progress-base"></div>
        <div class="progress-length" :style="getProgressStyle"></div>
      </div>
    </div>

    <div v-if="cartFreeshippingToggle" class="inlineCart__cta">
      <span v-if="dollarThreshold">Spend {{ dollarThreshold | money(currencySymbole, true)}} more to get free shipping!</span>
      <span v-if="!dollarThreshold">You Have Unlocked Free Shipping!</span>
    </div>

    <div class="inlineCart__content cart_content">
      <div v-if="lineItems.length" class="inlineCart__cart">

        <line-item
          v-for="item in lineItems"
          :key="item.id"
          :item="item"
          @deleted="onItemDelete($event)">
        </line-item>


        <!-- <div class="upsell-wrapper" v-if="showUpsell" >
          <div id="upsellWrapper" class="upsell-container">
            <div class="upsell-title">
              {{ upsellTitle }}
            </div>
            <upsell-item
              @offerAdded="onOfferAdded($event)"
              v-for="(offer,index) in offerItemData.slice(0, 3)"
              :key="index"
              :item="offer">
            </upsell-item>
          </div>
        </div> -->
      </div>

      <!-- <div v-if="items.length" class="inlineCart__checkout-container">
        <div class="subtotal__container">
          <span class="cart__subtotal">Subtotal</span>
          <span class="cart__subtotal">{{ totalPrice | money }}</span>
        </div>
        <div class="checkout__button-container">
          <a @click="onCheckoutClick">
            <general-button :text="checkout"> </general-button>
          </a>
        </div>
      </div> -->

      <!-- <div v-if="items.length === 0" class="inlineCart__empty">
        <span>Your cart is empty.</span>
        <a @click="closeCart"></a>
      </div> -->
    </div>
  </div>
</template>

// Javascript
<script>
//Mixins
// import isTablet from '~/mixins/isMobile'
import util from '~/mixins/util'
import Currency from '~/components/base/Currency.vue'
// import { ProductService } from 'scripts/services/product.service'
// import GeneralButton from 'scripts/components/shared/buttons/GeneralButton.vue'
import LineItem from '~/components/modals/inline-cart/LineItem.vue'
// import UpsellItem from 'scripts/components/modals/inline-cart/UpsellItem.vue'
import { mapState } from 'vuex'
// import { DiscountDispatch, ModalDispatch } from 'scripts/store/dispatch.js'
// import { localStorageSave, localStorageGet } from 'scripts/helpers/local-storage.js'

// Fields
// const productService = new ProductService()
const DISCOUNT_CODE = 'discount_code'
const PRODUCTS_OFFERED = 'products_offered' // used to compare when deleteing items off cart
const OFFER_ACCEPTED = 'offer_accepted'

export default {
  name: 'InlinecartContent',
  mixins: [util],
  components: {
    LineItem,
    Currency,
    // UpsellItem,
    // GeneralButton,
  },
  props: {
    emptyTitle: {
      type: String,
      default: 'Continue Shopping',
    },
    checkout: {
      type: String,
      default: 'Checkout',
    },
    checkoutUrl: {
      type: String,
      default: '/checkout',
    },
    cartFreeshipping: {
      type: Number
    },
    cartFreeshippingToggle: Boolean,
  },
  data() {
    return {
      showUpsell: false,
      upsellData: [],
      isLoadingUpsell: true,
      offerItems: [],
      offerItemData: [],
      upsellTitle: '',
      currentDiscountCode: '',
      offerAccepted: false,
      offerFound:false,
      currencySymbole: '$'
    }
  },
  computed: {
    ...mapState({
      lineItems: (state) => state.checkout.lineItems,
      totalPrice: (state) => state.checkout.totalPrice,
    //   itemsSubtotal: (state) => state.cart.items_subtotal_price,
    //   totalDiscount: (state) => state.cart.total_discount,
    //   totalItems: (state) => state.cart.item_count,
    //   isOpen: (state) => state.inlineCart.isOpen,
    //   name: (state) => state.inlineCart.name,
    }),

    /**
     * Configure Cart Qty
     */
    totalItems() {
      let count = 0

      this.lineItems.forEach(item => {
        count = count + item.quantity
      })

      return count
    },

    dollarThreshold: function() {
      let difference = this.cartFreeshipping - this.totalPrice
      if (difference <= 0) difference = false
      return difference
    },

    getProgressStyle() {
      console.log('this.totalPrice,', this.totalPrice)
      console.log('this.cartFreeshipping', this.cartFreeshipping)

      const progressWidth = this.percentage(this.totalPrice, this.cartFreeshipping)
      console.log('progressWidth', progressWidth)
      return { 'width': `${progressWidth}%` }
    }

  },
  methods: {

    // closeCart() {
    //   this.$store.dispatch(ModalDispatch.closeInlineCart)
    // },

    // goToCheckout() {
    //   const offerAccepted = localStorageGet(OFFER_ACCEPTED) === 'true'
    //   const discountCode = localStorageGet(DISCOUNT_CODE)

    //   const url = offerAccepted
    //     ? `/checkout?discount=${discountCode}`
    //     : '/checkout'
    //   window.location = url
    // },

    // onCheckoutClick() {
    //   this.closeCart()
    //   this.goToCheckout()
    // },



    /****************
     * UPSELL
    ****************/

    /**
     * Check If published upsell
     */
    // checkForUpsell() {
    //   this.upsellData.forEach((offer) => {
    //     if (this.isRuleSatisfied(offer.data)) {
    //       if(!this.offerFound) this.applyOffer(offer.data)
    //     }
    //   })
    // },


    /**
     * Get Upsell Data
     */
    // async getUpsellData() {
    //   const data = await FIREBASE_FIRESTORE.collection("upsell").where("status", "!=", "draft").get()
    //   return data.docs.map((doc) => {
    //     return {
    //       data: doc.data(),
    //       // id: doc.id,
    //     }
    //   })
    // },


    /**
     * @param rule Rule{}
     * Check if Cart satsfies a rule
     */
    // checkAgainstCart(rule) {
    //   let satisfied = false

    //   // If qualifier = ANY just check its in the cart
    //   if (rule.qualifier == 'any') {
    //     this.items.forEach((item) => {
    //       if (item.handle == rule.handle) {
    //         satisfied = true
    //       }
    //     })
    //   }

    //   // If qualifier = EXACTLY check qty matches
    //   if (rule.qualifier == 'exactly') {
    //     this.items.forEach((item) => {
    //       if (item.handle == rule.handle && Number(item.quantity) == Number(rule.quantity)) {
    //         satisfied = true
    //       }
    //     })
    //   }

    //   return satisfied
    // },


    /**
     * @param offer Offer{}
     * Look through rules and see if they satisfy
     */
    // isRuleSatisfied(offer) {
    //   let satisfied = false

    //   offer.rules.forEach((rule) => {
    //     satisfied = this.checkAgainstCart(rule)
    //   })

    //   return satisfied
    // },


    /**
     * Get Product Data from offer handles
     */
    // getProductOfferData() {

    //   this.offerItems.forEach((handle) => {
    //     productService.getProductData(handle).then((resp) => {
    //       this.offerItemData.push(resp)
    //     })
    //   })
    // },


    /**
     * Stage "current discount" so be submitted to local storage if accepted
     * @param discount string
     */
    // setDiscountCode(discount) {
    //   this.currentDiscountCode = discount
    // },



    /**
     * Offer Has been accepted and code needs to live in a session
     */
    // commitDiscountCodeToStorage() {
    //   // Note: I'm not sure if we will need access to this code somewhere else
    //   // but right now i can only see the use case on the checkout button in the cart..
    //   this.$store.dispatch(DiscountDispatch.setDiscount, this.currentDiscountCode)

    //   // Note: I think we need to add this discount code to the local host as well..
    //   // If a rule is satisfied and the page is refreshed than the 'current discount code'
    //   // will not persists through page loads..
    //   localStorageSave(DISCOUNT_CODE, this.currentDiscountCode)
    // },



    /**
     * @param product Product{}
     * @param rules Rules[]
     * @returns isInCart Boolean
     */
    // isOfferInCart(product,rules) {
    //   let isInCart = false
    //   let isIntentional = false

    //   // Before checking if its in the cart make sure this isnt an
    //   // intentional upsell of the same product like a BOGO.
    //   rules.forEach((rule) => {
    //     if(rule.handle == product.handle){
    //       // Offer and trigger are intentionally the same return false
    //       isIntentional = true
    //     }
    //   })

    //   if(!isIntentional) {
    //     this.items.forEach((item) => {
    //       if (item.handle == product.handle) {
    //         // Found an item set: true
    //         isInCart = true
    //       }
    //     })
    //   }

    //   return isInCart
    // },



    /**
     * @param offer Offer{}
     * Apply offer is rule is satisfied in cart
     */
    // applyOffer(offer) {
    //   this.offerFound = true
    //   this.currentOffer = offer
    //   let isInCart = false
    //   this.upsellTitle = offer.message
    //   this.setDiscountCode(offer.discount)

    //   // Check if offer item is in cart already
    //   offer.products_offered.forEach((product) => {

    //     // Don't duplicate items in upsell display
    //     if(this.offerItems.indexOf(product.handle) == -1 ) {
    //       this.offerItems.push(product.handle)
    //     }

    //     if (this.isOfferInCart(product,offer.rules)) {
    //       // Found an item set: true
    //       isInCart = true
    //     }
    //   })

    //   // If non of the products are in the cart - init upsell data
    //   if(!isInCart) {
    //     const offerDB = FIREBASE_FIRESTORE.collection("upsell").doc(offer.id)
    //     offerDB.update({
    //       "viewed": offer.viewed + 1
    //     })
    //     this.showUpsell = true
    //     this.getProductOfferData()
    //   }

    // },


    /**
     * On acceptance of offer - "adding one ore more items from upsell into cart"
     */
    // onOfferAdded() {
    //   localStorageSave(OFFER_ACCEPTED, 'true')
    //   localStorageSave(PRODUCTS_OFFERED, this.offerItems)

    //   const offerDB = FIREBASE_FIRESTORE.collection("upsell").doc(this.currentOffer.id)
    //   offerDB.update({
    //     "clicked": this.currentOffer.clicked + 1
    //   })
    //   this.commitDiscountCodeToStorage()
    // },



    /**
     * If an item being deleted from the cart is one of the offers
     * than remove the discount code as well.
     */
    onItemDelete(handle) {
      // const productOffered = localStorageGet(PRODUCTS_OFFERED)

      // if (productOffered && productOffered.indexOf(handle) != -1) {
      //   this.setDiscountCode('')
      //   // Clear discount
      //   localStorageSave(DISCOUNT_CODE, '')
      //   // Clear Accepted Flag
      //   localStorageSave(OFFER_ACCEPTED, 'false')
      // }

    },



  },
  created() {
    // this.getUpsellData().then((resp) => {
    //   this.upsellData = resp
    //   this.isLoadingUpsell = false
    //   this.checkForUpsell()
    // })
    const checkoutId = this.$store.state.checkout.checkoutId

    this.$shopify.checkout.fetch(checkoutId).then((checkout) => {
      // Do something with the checkout
      console.log('checkout',checkout);
    })

  },
}
</script>

// SCSS
<style lang="scss" scoped>
.upsell {
  &-wrapper {
    // position: absolute;
    background: $b-background-gray;
    width: 100%;
    // height: 100px;
    // bottom: 207px;
  }

  &-container {
    padding: 10px;
    position: relative;
  }

  &-title {
    @include primary-font(600);
    @include font-size(14);
    color: $b-dark-blue;
    line-height: 21px;
    letter-spacing: 0;
    padding: 16px 0px 12px;
  }
}

.inlineCart {
  &__cart {
    padding: 27px 18px 125px;
    max-height: calc(100vh - 260px);
    overflow-y: scroll;
  }

  &__content {
    background: #fff;
    cursor: auto;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    @include tablet-up() {
      width: 423px;
    }
  }

  .inlineCart__empty {
    color: $black;
    // font-family: $bull-bold;
    font-size: 23px;
    line-height: 28px;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: -80px;
    span {
      padding: 18px 0px;
    }
  }

  &__title {
    @include primary-font(600);
    @include font-size(14);
    color: $b-dark-blue;
    line-height: 21px;
    letter-spacing: 0;
    padding: 16px 26px 8px;
  }

  &__title-count {
    @include primary-font();
    @include font-size(12);
    color: $b-dark-blue;
    letter-spacing: 0;
    line-height: 25px;
  }

  &__cta {
    padding: 0px 26px;

    span {
      @include primary-font();
      @include font-size(12);
      letter-spacing: 0;
      line-height: 25px;
    }
  }

  &__checkout-container {
    position: absolute;
    bottom: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 32px 24px;
    background: #ffffff;

    .button-primary {
      width: 100%;
    }
  }

  .subtotal__container {
    border-top: 1px solid #f6f6f6;
    color: $black;
    // font-family: $bull;
    font-size: 18px;
    line-height: 23px;
    padding: 18px 0px;
    display: flex;
    justify-content: space-between;
    text-align: right;

    .cart__subtotal {
      @include font-size(14);
      color: $b-dark-blue;
      letter-spacing: 0;
      line-height: 24px;
    }
  }

  .checkout-btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .borderBottom {
    border-bottom: 1px solid #f6f6f6;
  }
}


.progress {
  &-wrapper {
    padding: 4px 26px;
  }

  &-container {
    position: relative;
  }

  &-base, &-length  {
    height: 12px;
    border-radius: 6.5px;
  }

  &-base {
    width: 100%;
    background-color: $b-form-gray;
  }

  &-length {
    background-color: $b-bright-blue;
    position: absolute;
    top: 0px;
  }

}
</style>
