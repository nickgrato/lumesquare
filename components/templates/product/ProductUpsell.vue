<template>
  <div class="upsell-wrapper">
    <div class="upsell-container">

      <!-- DESCRIPTION  -->
      <div class="description-wrapper">

        <div class="description-container">
          <!-- MESSAGE -->
          <span class="upsell-description">
            {{ this.description }}
          </span>
          <!-- PRODUCT TITLE  -->
          <a :href="`/products/${handle}`" class="upsell-title">
            {{ productData.title }}
          </a>
        </div>

        <!-- ADD TO CART  -->
        <div class="cart-button-container">
          <general-button
            @clicked="onAddToCart()"
            category="primary"
            type="button">
            Add To Order - {{ price | money(currencySymbole, true)}}
          </general-button>
        </div>
      </div>

      <!-- FEATURED IMAGE  -->
      <div class="upsell-image-wrapper">
        <a :href="`/products/${handle}`">
          <image-format
            :specs="{ height: 128, width: 99 }"
            :src="featuredImage"
            alt="upsell image"
            size="120x">
          </image-format>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
// Components
import Currency from '~/components/base/Currency.vue'
import ImageFormat from '~/components/shared/image/ImageFormat.vue'
import GeneralButton from '~/components/shared/buttons/GeneralButton.vue'

export default {
  name: 'ProductUpsell',
  extends: Currency,
  props: {
    handle: String,
    description: String,
  },
  data: function() {
    return {
      productData: Object,
      isLoading: true,
      currencySymbole: '$',
      featuredImage:''
    }
  },
  components: {
    ImageFormat,
    GeneralButton,
  },
  computed:{
    variantID(){
      if(!this.productData || !this.productData.variants) return

      const id = this.productData.variants[0].id
      return id
    },
    price() {
      if(!this.productData || !this.productData.variants) return

      const price = this.productData.variants[0].priceV2.amount
      return price
    },
  },
  methods: {

    onAddToCart() {
      const lineItemsToAdd = [{
        variantId: this.variantID,
        quantity: 1
      }]

      this.$store.dispatch('checkout/addItem', lineItemsToAdd)
        .catch((error) =>
          console.error('unable to add product')
        )
        .then(() => {
          this.$store.dispatch('checkout/openSidecart')
        })
    },

    async getProductData(productHandle){
      this.productData = await this.$shopify.product.fetchByHandle(productHandle)
      this.featuredImage = this.productData.images[0].src
      console.log('upsell',this.productData)

    },
  },
  created: function() {
    // Get Product Data
    this.getProductData(this.handle)
  },
}
</script>


<style lang="scss" scoped>
.upsell {
  &-wrapper {
    background-color: $b-background-gray;
    padding: 20px;
  }

  &-container {
    display: flex;
    margin-bottom: 5px;
  }

  &-description {
    @include primary-font();
    @include font-size(12);
    color: $b-dark-blue;
    letter-spacing: 0;
    line-height: 22px;
  }

  &-title {
    @include primary-font(600);
    @include font-size(12);
    color: $b-bright-blue;
    letter-spacing: 0;
    line-height: 22px;
  }

  &-image-wrapper {
    margin-left: 5px;
    min-width: 99px;
  }
}

.description-wrapper {
  margin-right: 8px;
}

.description-container {
  margin-bottom: 16px;
}

</style>
