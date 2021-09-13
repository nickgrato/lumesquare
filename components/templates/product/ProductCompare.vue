// template
<template>
  <div class="compare-wrapper">

    <!-- COMPARE HEADER  -->
    <div class="compare-header-wrapper">
      <div class="compare-header-container">
        <div class="compare-title h2">
          {{title}}
        </div>
        <div class="compare-cta-wrapper" v-if="compareCta">
          <a :href="compareCtaUrl">
            <flat-button
              type="button"
              :text="compareCta"
              icon-name="arrow-right">
            </flat-button>
          </a>
        </div>
      </div>
    </div>

    <!-- COMPARE CARDS  -->
    <div class="compare-container"
      v-if="!compareDateLoading && !isMobile">
      <compare-card
        v-for="(data,index) in compareProducts"
        :key="index"
        :data="data">
      </compare-card>
    </div>

    <!-- COMPARE CARDS MOBILE -->
    <div class="compare-container"
      v-if="!compareDateLoading && isMobile">
      <swiper
        :options="swiperOptions"
        ref="compareSwiper">
        <swiper-slide
          v-for="(data,index) in compareProducts"
          :key="index">

          <compare-card
            :data="data">
          </compare-card>

        </swiper-slide>
      </swiper>
    </div>


  </div>
</template>

// JavaScript
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import FlatButton from '~/components/shared/buttons/FlatButton.vue'
import CompareCard from '~/components/templates/product/CompareCard.vue'
import isMobile from '~/mixins/isMobile'

// Fields
const SwiperOptions = {
  slidesPerView: 1.2,
  centeredSlides: false,
  spaceBetween: 10,
  loop: false,
  slidesPerGroup: 1,
  breakpoints: {
    630: {
      slidesPerView: 2.5
    },
    528: {
      slidesPerView: 2.1
    },
    428: {
      slidesPerView: 1.7
    },
    321: {
      slidesPerView: 1.4
    }
  }
}

export default {
  name: 'ProductCompare',
  mixins: [isMobile],
  components: {
    FlatButton,
    CompareCard,
    Swiper,
    SwiperSlide,
  },
  props: {
    handle: String,
    compare_products: Array,
    title:String,
    compareCta:String,
    compareCtaUrl:String
  },
  data: function() {
    return {
      compareProducts: [],
      compareDateLoading: true,
      swiperOptions: SwiperOptions
    }
  },
  computed: {
    swiper() {
      return this.$refs.compareSwiper.$swiper
    }
  },
  methods: {

    /**
     * Get Compare Data
     * Showing cards after ALL promises are completed
     */
    getCompareData() {
      if(!this.compare_products) return
      const promiseArr = []
      const self = this

      this.compare_products.forEach((handle,index) => {
        const newPromise = new Promise((resolve, reject) => {
          self.$dataService.getProductMetafieldData(handle).then((resp) => {
            this.compareProducts[index] = resp
            resolve()
          })
        })

        promiseArr.push(newPromise)
      })

      Promise.all(promiseArr).then(() => {
        this.compareDateLoading = false
      });

    }
  },

  mounted(){
    this.getCompareData()
  }
}
</script>

// SCSS
<style lang="scss" scoped>
  .compare {
    &-wrapper {
      margin: 40px 16px;
      min-height: 800px;// helpful for the scroll to reviews
    }

    &-container {
      display: flex;
      justify-content: center;
    }
  }

  // Header
  .compare-header {
    &-wrapper {
      margin-bottom: 20px;
    }
  }

  .compare-title {
    text-align: center;
    margin-bottom: 16px;
  }

  .compare-cta {
    &-wrapper {
      text-align: center;
    }
  }

</style>
