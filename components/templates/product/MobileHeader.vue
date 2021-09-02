// template
<template >
  <section class="section-wrapper">

    <swiper class="swiper-component"
      :options="swiperOptions"
      ref="imageSwiper"
      @slideChangeTransitionEnd="onSlideChangeTransitionEnd">
      <swiper-slide
        v-for="(image, index) in images"
        :key="index">
        <image-format
          :src="image.src"
          :size="sliderImageSize"
          :alt="image.alt">
        </image-format>
      </swiper-slide>
    </swiper>

    <div class="dot-wrapper">
      <div class="dot-container">
        <div class="dot"
          :class="{active:currentIndex == index}"
          v-for="(dot, index) in images"
          :key="index">
        </div>
      </div>
    </div>

  </section>
</template>

// JavaScript
<script>
// Components
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ImageFormat from '~/components/shared/image/ImageFormat.vue'

const SwiperOptions = {
  slidesPerView: 1.3,
  centeredSlides: true,
  spaceBetween: 10,
  loop: false,
  slidesPerGroup: 1,
  slidesOffsetAfter: 275,
}

export default {
  name: 'MobileHeader',
  props: {
    images:Array
  },
  data: function() {
    return {
      swiperOptions: SwiperOptions,
      currentIndex: 0,
      sliderImageSize:'800x',
      initialSlide: 0,
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ImageFormat
  },

  computed: {
    swiper() {
      return this.$refs.imageSwiper.$swiper
    },
  },
  methods: {
    onSlideChangeTransitionEnd(e) {
      this.currentIndex = this.$refs.imageSwiper.$swiper.activeIndex
    },
  }
}
</script>

// SCSS
<style lang="scss" scoped>
  .section-wrapper {
    max-width: 100vw;
  }

  .dot {
    background: $light-grey;
    @include size(10);
    border-radius: 25px;
    margin: 5px;

    &.active {
      background: $black;
    }

    &-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &-container {
      display: flex;
    }
  }

  ::v-deep .image-format-wrapper {
    display: initial;
  }

</style>
