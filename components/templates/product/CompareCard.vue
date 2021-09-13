// template
<template>
  <div class="card-wrapper">
    <div class="card-container">

      <!-- FEATURED IMAGE  -->
      <div class="image-wrapper">

        <image-format
          :specs="{ height: 300, width: 232 }"
          :src="compareDate.image"
          :alt="compareDate.title"
          size="600x">
        </image-format>

        <!-- ATTR TAG  -->
        <div class="tag-wrapper"
          v-if="compareDate.tag">
          <div class="tag-container">
            {{compareDate.tag}}
          </div>
        </div>

        <!-- CTA BUTTON  *** TODO SET CORRECT ANCHORE LINK -->
        <a :href="`/products/${data.handle}`"
          class="card-cta-button">
          <general-button
            type="text"
            icon-name="arrow-right"
            icon-size="18px"
            text="Details">
          </general-button>
        </a>
      </div>

      <!-- TITLE  -->
      <div class="card-title">
        {{compareDate.title}}
      </div>

      <!-- PRICE  -->
      <div class="card-price">
        {{price | money(currencySymbole, true) }}
      </div>

      <!-- LINE DATA  -->
      <div class="card-attr-wrapper">
        <div class="card-attr"
          v-for="(attr,index) in compareDate.data"
          :key="index">
          {{attr}}
        </div>
      </div>

      <div class="add-to-cart-wrapper">
        <!-- ADD TO CART  -->
        <general-button
          @clicked="quckAdd($event)"
          type="text"
          category="tert"
          text="Add to Cart">
        </general-button>
      </div>

    </div>
  </div>
</template>

// JavaScript
<script>
import ImageFormat from '~/components/shared/image/ImageFormat.vue'
import Currency from '~/components/base/Currency.vue'
import GeneralButton from '~/components/shared/buttons/GeneralButton.vue'
// import { CartDispatch, ToastDispatch, ModalDispatch } from 'scripts/store/dispatch.js'

export default {
  name: 'CompareCard',
  extends: Currency,
  components: {
    ImageFormat,
    GeneralButton
  },
  props: {
    data: {}
  },
  data: function() {
    return {
      currencySymbole: '$'
    }
  },
  computed: {

    compareDate() {
      const value = this.data.compare_data
        ? JSON.parse(this.data.compare_data.value)
        : ''
      return value
    },

    price() {
      if(!this.data) return

      const price = this.data.variants.edges[0].node.priceV2.amount
      return price
    },

    variantID(){
      if(!this.data) return

      const id = this.data.variants.edges[0].node.id
      return id
    },

  },
  methods: {
    /**
     * @param event Event
     * On quick add click
     */
    quckAdd(event) {

      const lineItemsToAdd = [{
        variantId: this.variantID,
        quantity: 1,
        customAttributes: [{key: "handle", value:this.data.handle}]
      }]

      this.$store.dispatch('checkout/addItem', lineItemsToAdd)
        .catch((error) =>
          console.error(error)
        )
        .then(() => {
          this.$store.dispatch('checkout/openSidecart')
        })
    }

  },
  mounted() {}
}
</script>

// SCSS
<style lang="scss" scoped>

  .card {
    &-wrapper {
      margin: 8px 40px;
      width: 232px;

      @include desktop-down() {
        margin: 8px;
      }

      @include tablet-down() {
        margin: 0px;
      }

      &:hover {
        .card-cta-button {
          display: initial;
        }
      }
    }

    &-cta-button {
      position: absolute;
      bottom: 16px;
      right: 56px;
      display: none;
    }

    &-title {
      @include primary-font(600);
      @include font-size(16);
      color: $b-dark-blue;
      letter-spacing: 0;
      line-height: 24px;
    }

    &-price {
      @include primary-font();
      @include font-size(14);
      color: $b-dark-blue;
      letter-spacing: 0;
      line-height: 24px;
      margin-bottom: 24px;
    }

    &-attr {
      @include primary-font();
      @include font-size(12);
      color: $b-dark-blue;
      letter-spacing: 0;
      line-height: 25px;
      margin-bottom: 24px;

      &-wrapper {
        margin-bottom: 24px;
      }
    }
  }

  .tag {
    &-wrapper {
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 8px;
      width: 100%;
      display: flex;
      justify-content: center
    }

    &-container {
      @include primary-font(900);
      @include font-size(11);
      text-transform: uppercase;
      color: $white;
      letter-spacing: 0.92px;
      line-height: 17px;
      background: $b-green;
      border-radius: 5px;
      padding: 6px 10px;
    }
  }

  .image-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .add-to-cart-wrapper {
    display: flex;
  }

</style>
