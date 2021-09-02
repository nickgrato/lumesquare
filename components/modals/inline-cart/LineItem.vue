// Template
<template>
  <div
    class="line__item"
    :data-variant-id="item.variant.id"
    :data-variant-quantity="item.quantity">

    <!-- Remove Undo  -->
    <div class="line__item-undo" :class="{ 'is-showing': showUndo }">
      {{ item.title }} has been removed from your cart.
      <div class="undo-btn" @click="undoClear">Undo</div>
    </div>

    <!-- Remove Item  -->
    <div class="line__item-remove">
      <a @click="removeItem()">
        <icon fill-class="close-fill" name="trash" size="16px"> </icon>
      </a>
    </div>

    <!-- Item  -->
    <div class="line__item-wrap">
      <div class="line__item-image">
        <image-format
          :specs="{ height: 96, width: 74 }"
          :src="item.variant.image.src"
          :alt="item.variant.image.altText"
          size="300x">
        </image-format>
      </div>

      <div class="line__item-content">
        <a :href="productHandle" class="line__item-title">
          {{ item.title | truncate(40) }}
        </a>

        <div class="line__item-price-wrapper">

          <div v-if="item.variant.compareAtPrice && item.variant.price != item.variant.compareAtPrice" class="line__item-price compare">
            {{ item.variant.compareAtPrice| money(currencySymbole,true) }}
          </div>

          <div class="line__item-price" :class="getPriceStyle">
            {{ item.variant.price | money(currencySymbole,true) }}
          </div>

        </div>

        <qty-selector
          ref="qtySelector"
          @changed="qtyChange"
          :qty="item.quantity">
        </qty-selector>

      </div>
    </div>
  </div>
</template>

<script>

import { debounce } from '~/assets/js/util'
// Components
import ImageFormat from '~/components/shared/image/ImageFormat.vue'
import Icon from '~/components/shared/icons/Icon.vue'
import Currency from '~/components/base/Currency.vue'
import QtySelector from '~/components/shared/forms/QtySelector.vue'

const Emit = {
  Deleted: 'deleted',
}

export default {
  name: 'LineItem',
  extends: Currency,
  data() {
    return {
      showUndo: false,
      undoTimeout: '',
      currencySymbole: '$',
      updating:false
    }
  },
  components: {
    ImageFormat,
    Icon,
    QtySelector
  },
  props: {
    item: {
      type: Object,
    }
  },
  computed : {
    getPriceStyle() {
      if (this.item.variant.compareAtPrice && this.item.variant.compareAtPrice != this.item.variant.price) return 'sale'
    },
    productHandle(){
      const customAttribute = this.item.customAttributes.find(element => element.key === 'handle')
      return `/product/${customAttribute.value}`
    },
    qtySelector(){
      return this.$refs.qtySelector
    }
  },
  methods: {

    /**
    * @param { number } qty
    */
    qtyChange(qty) {
      if(qty === 0){
        this.removeItem()
        return
      }
      this.updateQuantity(qty)
    },

    removeItem() {
      this.showUndo = true
      this.undoTimeout = setTimeout(() => {
        this.onRemoveItem()
      }, 3500)
      return true
    },

    onRemoveItem() {
      this.updating = true
      this.$emit(Emit.Deleted,this.productHandle)

      const lineItemIdsToRemove = [this.item.id]
      this.$store.dispatch('checkout/removeItems', lineItemIdsToRemove)
        .catch((error) =>
          console.error(error)
        )
        .then(() => {
          this.updating = false
      })

    },

    undoClear() {
      clearTimeout(this.undoTimeout)
      this.qtySelector.setQty(1)
      this.showUndo = false
    },

    updateQuantity: debounce(function(newQuantity) {

      this.updating = true

      if (newQuantity < 1) {
        this.removeItem()
        return
      }

      const lineItemsToUpdate = [{ id: this.item.id, quantity: newQuantity}]

      this.$store.dispatch('checkout/updateItem', lineItemsToUpdate)
        .catch((error) =>
          console.error(error)
        )
        .then(() => {
          this.updating = false
      })
    }, 100)


  }
}
</script>

// SCSS
<style lang="scss" scoped>
.close-fill {
  fill: $black;
}

.cart_content {
  .line__item {
    display: flex;
    justify-content: space-between;
    text-align: left;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid $b-form-gray;
    position: relative;

    &:not(:first-of-type) {
      margin-top: 27px;
    }

    &-undo {
      position: absolute;
      background-color: #f8f8f8;
      height: 100%;
      width: 100%;
      flex-direction: column;
      padding: 46px 30px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: $black;
      font-size: 14px;
      line-height: 18px;
      z-index: 1;
      opacity: 0;
      visibility: hidden;
      transition: opacity 250ms ease-in-out;

      &.is-showing {
        opacity: 1;
        visibility: visible;
      }

      .undo-btn {
        cursor: pointer;
        color: $b-bright-blue;
        font-size: 14px;
        padding-top: 5px;
        text-decoration: underline;
      }
    }

    &-remove {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
    }

    &-wrap {
      display: flex;
    }

    &-image {
      margin-right: 24px;
      width: 74px;
      height: 96px;

      ::v-deep .image-format-wrapper {
        display: initial;
      }

    }
    &-content {
      color: $black;
      font-size: 12px;
      letter-spacing: 0.2px;
      line-height: 18px;
    }
    &-title {
      @include font-size(12);
      color: $black;
      padding-right: 5px;
      font-weight: 400;
      margin-bottom: 8px;
      display: block;
    }

    &-price-wrapper {
      display: flex;
    }

    &-price {
      display: flex;
      justify-content: flex-end;
      @include font-size(12);
      font-weight: 500;
      color: $black;
      letter-spacing: 0.23px;
      line-height: 18px;
      text-align: right;
      margin-bottom: 10px;
    }

    &-price.sale {
      color: $b-bright-blue;
    }

    &-price.compare {
      text-decoration: line-through;
      color: $b-dark-blue;
      margin-right: 10px;
    }

  }
}
</style>
