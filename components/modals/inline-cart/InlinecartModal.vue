<template>
  <div>

    <!-- OVERLAY  -->
    <transition name="fade">
      <div v-if="isOpen" class="inlineCart__overlay"></div>
    </transition>

    <transition name="off-canvas-right">
      <!-- v-scroll-lock="isOpen && !isMobile" -->
      <div class="inlineCart"
        v-if="isOpen"
        @click="onModalClick">

        <!-- CLOSE BUTTON  -->
        <div class="inlineCart-close">
          <icon
            fill-class="close-fill"
            name="close"
            size="14px">
          </icon>
        </div>

        <!-- CART CONTENT  -->
        <inlinecart-content
          :cartFreeshipping="parseInt(cartFreeshipping)"
          :cartFreeshippingToggle="cartFreeshippingToggle">
        </inlinecart-content>

      </div>
    </transition>
  </div>
</template>

<script>
// Services
import { mapState } from 'vuex'
// Components
import Icon from '~/components/shared/icons/Icon.vue'
import InlinecartContent from '~/components/modals/inline-cart/InlinecartContent.vue'
// Mixins
import keySubscribeMixin from '~/mixins/keySubscribeMixin'
import isTablet from '~/mixins/isMobile'

export default {
  name: 'InlinecartModal',
  mixins: [keySubscribeMixin, isTablet],
  components: {
    Icon,
    InlinecartContent,
  },
  props: {
    cartFreeshipping: {
      type: Number,
      default: 100
    },
    cartFreeshippingToggle: {
      type: Boolean,
      default: true
    },
  },
  data: function() {
    return {
      // isOpen: true,
      name: 'Name'
    }
  },
  computed: {
    ...mapState({
      isOpen: (state) => state.checkout.sidecartOpen,
      // name: (state) => state.inlineCart.name,
    }),
  },
  watch: {
    isOpen: function (next, prev) {

      if(!this.checkMobile()) return

      const App = document.getElementById('app')
      if(next == true){
        App.style.overflow = "hidden";
        App.style.height = "80vh";

      }else{
        App.style.overflow = "initial";
        App.style.height = "initial";
      }
    }
  },
  methods: {
    /**
     * On Close Modal
     */
    onCloseModalClick() {
      this.$store.dispatch('checkout/closeSidecart')
    },

    /**
     * General Modal Click Capture
     */
    onModalClick({ target }) {
      if (document.getElementById('inlineCartContent').contains(target)) {
        return false
      } else {
        this.onCloseModalClick()
      }
    },

    /**
     * Abstract Method from Subscribe Mixin
     */
    close() {
      this.onCloseModalClick()
    },
  },
  created() {},
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.close-fill {
  fill: $black;
}

.inlineCart {
  z-index: 60;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;

  .inlineCart-close {
    position: absolute;
    top: 0;
    right: 10px;
    padding: 22px 0px 13px;
    z-index: 9;
    svg {
      stroke: $black !important;
    }
  }
}

.inlineCart__overlay {
  background: rgba(0, 30, 60, 0.5);
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 9;
}
</style>
