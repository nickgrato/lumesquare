// Template
<template>
  <!-- v-view="viewHandler" -->
  <section class="section-wrapper" >

    <div class="featured-header">
      <div class="featured-title h2"> {{ title }} </div>
    </div>

    <transition name="fade">
      <!-- v-if="showSection" -->
      <div class="featured-collection-wrapper" >
        <div class="featured-collection-container">

          <circle-button
            class="pagination-button prev"
            v-if="!disabledPrev"
            @clicked="slidePrev()"
            icon-name="arrow-left"
            type="button">
          </circle-button>

          <circle-button
            class="pagination-button next"
            v-if="!disabledNext"
            @clicked="slideNext()"
            icon-name="arrow-right"
            type="button">
          </circle-button>

          <swiper class="swiper-component"
            :key="swiperOptions.slidesPerView"
            :options="swiperOptions"
            ref="featuredSwiper"
            @slideChangeTransitionEnd="onSlideChangeTransitionEnd">

            <swiper-slide
              v-for="(product, index) in products"
              :key="index">
              <product-card
                :product="product">
              </product-card>
            </swiper-slide>
          </swiper>

        </div>
      </div>
    </transition>

  </section>
</template>

// JS
<script>
// Components
import ProductCard from '~/components/shared/cards/ProductCard.vue'
const CircleButton = () => import('~/components/shared/buttons/CircleButton.vue')
// Swiper
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// Constants
const SwiperOptions = {
  slidesPerView: 3,
  loop: false,
  slidesPerGroup: 1,
  centeredSlides: true,
  breakpoints: {
    1433: {
      slidesPerView: 6,
      centeredSlides: false,
      slidesOffsetAfter: 275,
      loop: false,
    },
    1133: {
      slidesPerView: 5,
      centeredSlides: false,
      slidesOffsetAfter: 275,
      loop: false,
    },
    835: {
      slidesPerView: 4,
      centeredSlides: false,
      slidesOffsetAfter: 275,
      loop: false,
    },
    463: {
      slidesPerView: 3,
      centeredSlides: false,
      slidesOffsetAfter: 275,
      loop: false,
    },
  },
}

export default {
  name: 'FeaturedCollection',
  components: {
    ProductCard,
    Swiper,
    SwiperSlide,
    CircleButton,
  },
  data() {
    return {
      numberOfProducts: 12,
      products: [],
      swiperOptions: SwiperOptions,
      disabledNext: false,
      disabledPrev: true,
      currentIndex: 0,
      // showSection: false
    }
  },
  computed: {
    swiper() {
      return this.$refs.featuredSwiper.$swiper
    },
  },
  props: {
    title: {
      type: String,
      default: 'Featured Collection',
    },
    linkText: String,
    linkUrl: String,
    collectionId: {
      type: String,
      default: '',
    },
  },
  methods: {
    slidePrev() {
      this.swiper.slidePrev()
    },

    slideNext() {
      this.swiper.slideNext()

      // Note: swiper seems to have a small but where the on slide change
      // hook is not catching the right 'isEnd' this is a back up to catch that
      if(this.swiper.isEnd) { this.disabledNext = true }
    },

    /**
     * @param { string } handle
     */
    getCollectionAndProducts(handle) {

      if (!this.collectionId) return

      this.$shopify.collection.fetchWithProducts(this.collectionId, {productsFirst: 10}).then((collection) => {
        this.products = collection.products
      })

    },

    onSlideChangeTransitionEnd() {
      this.currentIndex = this.swiper.activeIndex
      this.disabledNext = this.swiper.isEnd
      this.disabledPrev = this.swiper.isBeginning
    },

    // viewHandler(e){
    //   if(e.percentInView === 1) {
    //     this.showSection = true
    //   }
    // }
  },
  mounted() {
    // get collection products.
    this.getCollectionAndProducts()
  },
}
</script>

// SCSS
<style lang="scss" scoped>
// used to scale swiper
$swiper-breakpoint: 1646px;

.section-wrapper {
  background-color: $white;
  padding: 40px 0px;
  position: relative;
  background-color: $white;

  @include tablet-large-down {
    padding: 40px 0px;
  }
}

.featured-header {

  text-align: center;

  @include tablet-down {
    display: initial;
    max-width: 400px;
  }

  @include mobile-down {
    max-width: 375px;
  }

  @include iphone-5 {
    max-width: 320px;
  }
}

.featured-title {

  @include tablet-down {
    margin-bottom: 8px;
  }
}


.featured-collection-wrapper {
  display: flex;
  justify-content: center;

  @media (max-width: $swiper-breakpoint) {
    justify-content: flex-start;
    overflow: hidden;
  }

  @media (max-width: 462px) {
    justify-content: center;
  }
}

.featured-collection-container {
  position: relative;
  width: 1632px;
  min-width: 1632px;
  // overflow: hidden;

  // These are specific break points for the slider only
  @media (max-width: 1432px) {
    width: 1360px;
    min-width: 1360px;
  }

  @media (max-width: 1132px) {
    width: 1088px;
    min-width: 1088px;
  }

  @media (max-width: 834px) {
    width: 816px;
    min-width: 816px;
  }

  @media (max-width: 580px) {
    width: 720px;
    min-width: 720px;
  }

  @media (max-width: 462px) {
    // width: 464px;
    // min-width: 464px;
  }

}

.swiper-component {
  margin-top: 29px;

  @include tablet-down {
    margin-top: 32px;
  }
}

.pagination-wrapper {
  position: absolute;
  width: 92px;
  display: flex;
  justify-content: space-between;
  right: 35px;
  top: 45px;

  @include tablet-down {
    display: none;
  }
}

.pagination-button {


    &.next {
      position: absolute;
      display: initial;
      top:185px;
      left: 1592px;
      z-index: 2;


      @media (max-width: 1707px) {
        left: 1319px;
      }

      @media (max-width: 1417px) {
        left: 1042px;
      }

      @media (max-width: 1127px) {
        left: 765px;
      }
    }

    &.prev {
      position: absolute;
      display: initial;
      top:185px;
      left: -14px;
      z-index: 2;

      @media (max-width: 1707px) {
        left: 9px;
      }
    }

    &.next,&.prev {
      @include tablet-down {
        display: none;
      }
    }

  }
</style>
