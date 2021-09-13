// template
<template>
    <section class="product-image-wrapper">
      <div class="product-image-container">

        <!-- THUMBNAILS  -->
        <div class="thumbnail-wrapper">

          <!-- PREVIOUS  -->
          <circle-button
            class="pagination-button prev"
            @clicked="slidePrev()"
            icon-name="arrow_left"
            type="button">
          </circle-button>

          <!-- NEXT  -->
          <circle-button
            class="pagination-button next"
            @clicked="slideNext()"
            icon-name="arrow_left"
            type="button">
          </circle-button>

          <div class="thumbnail-container">

             <swiper class="swiper-component"
              :options="swiperOptions"
              ref="imageSwiper">
              <swiper-slide
                v-for="(image,index) in images"
                :key="index">

                <!-- THUMNB NAILS  -->
                <div class="thumbnail-image-wrapper"
                  :key="index"
                  @click="thumbnailClick(image,index)"
                  :class="{active: index == imageIndex}">

                  <div class="play-icon-overlay"
                     v-if="isGif(image.node.originalSrc)">
                    <icon
                      class="play-icon"
                      fill-class="icon-fill"
                      name="play"
                      size="30px">
                    </icon>
                  </div>

                  <image-format
                    classes="fade-in"
                    :isLazy="true"
                    :src="image.node.originalSrc"
                    :alt="image.node.altText"
                    size="79x"
                    :specs="{ height: 102, width: 79 }">
                  </image-format>

                </div>
              </swiper-slide>
            </swiper>

          </div>
        </div>

        <!-- Featured Image  -->
        <div class="feaured-image-wrapper">


          <div class="featured-image-container"
            v-if="featuredImage">

            <!-- Pagination  -->
            <div class="pagination-wrapper">
              <circle-button
                aria-label="previous click"
                class="arrow-prev"
                @clicked="slidePrev()"
                icon-name="arrow_left"
                type="button">
              </circle-button>
              <circle-button
                aria-label="next click"
                class="arrow-next"
                @clicked="slideNext()"
                icon-name="arrow_right"
                type="button">
              </circle-button>
            </div>

            <image-format
              classes="fade-in"
              class="featured-image"
              :class="{ transition : imageTransition }"
              :src="featuredImage.node.originalSrc"
              :alt="featuredImage.node.altText"
              size="581x"
              @loaded="onFeaturedImageLoad">
            </image-format>
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
import IconButton from '~/components/shared/buttons/IconButton.vue'
import Icon from '~/components/shared/icons/Icon.vue'
const CircleButton = () => import('~/components/shared/buttons/CircleButton.vue')

const SwiperOptions = {
  slidesPerView: 5,
  loop: false,
  slidesPerGroup: 1,
  direction: 'vertical',
  observer: true,
  observeParents: true,
}

export default {
  name: 'FeaturedImages',
  props: {
    images:Array
  },
  data: function() {
    return {
      swiperOptions: SwiperOptions,
      featuredImage:{},
      imageIndex: 0,
      imageTransition: false
    }
  },
  components: {
    ImageFormat,
    IconButton,
    Icon,
    Swiper,
    SwiperSlide,
    CircleButton
  },
  computed: {
    swiper() {
      return this.$refs.imageSwiper.$swiper
    },
  },
  methods: {
    initFeaturedImage() {
      // Init to first image availabe
      this.featuredImage = this.images[0]
    },

    /**
    * @param { image } Image Object
    * @param { index } number
    */
    thumbnailClick(image,index){
      if(this.imageIndex == index) return

      this.transitionImage(()=>{
        this.imageIndex = index
        this.setFeaturedImage(image)
      })
    },

    onFeaturedImageLoad(){
      // Show Image!
      this.imageTransition = false
    },

    transitionImage(callback) {
      var self = this
      this.imageTransition = true
      // CSS Transtion is over - change image
      setTimeout(function(){
        callback()
      }, 100)
    },

    setFeaturedImage(image){
      this.featuredImage = image
    },

    slideNext() {
      this.transitionImage(this.onNext)
    },

    onNext(){
      if(this.imageIndex == this.images.length - 1){
        this.imageIndex = 0
      } else {
        this.imageIndex = this.imageIndex + 1
      }
      this.swiper.slideTo(this.imageIndex)
      const nextImage = this.images[this.imageIndex]
      this.setFeaturedImage(nextImage)
    },


    slidePrev() {
      this.transitionImage(this.onPrev)
    },

    onPrev() {
      if(this.imageIndex == 0){
        this.imageIndex = this.images.length - 1
      } else {
        this.imageIndex = this.imageIndex - 1
      }
      this.swiper.slideTo(this.imageIndex)
      const nextImage = this.images[this.imageIndex]
      this.setFeaturedImage(nextImage)
    },

    /**
    * @param { String } src "image src"
    */
    isGif(src) {
      return src.includes('.gif')
    }

  },
  mounted(){},
  created: function() {
    this.initFeaturedImage()
  }
}
</script>

// SCSS
<style lang="scss" scoped>
   .pagination-button {
    position: absolute;
    left: 12px;

    &.next {
      bottom: 0px;
      transform: rotate(-90deg);
    }

    &.prev {
      top: 0px;
      transform: rotate(90deg);
    }
  }

  .product-image {
    &-container {
      display: flex;
    }
  }

  .featured-image {
    @include webkit(opacity, 100ms, ease-in-out);

    &.transition {
      opacity: 0;
    }

    &-wrapper {
      position: relative;
    }

    &-container {
      position: relative;
      display: flex;
      background-color: #efece8;
      img.image-format {
        border: solid 2px $white;
        width: 743px;
        @include desktop-down {
          width: 580px;
        }
      }
    }
  }

  .thumbnail {
    &-wrapper {
      padding-right: 5.5px;
      display: flex;
      align-items: center;
      position: relative;
    }

    &-container, .swiper-component {
      max-height: 600px;
      overflow: hidden;
      height: 600px;
      width: 84px;
    }

    &-image {
      &-wrapper {
        position: relative;
        display: flex;
        margin-bottom: 4px;
        height: 102px;

        &:hover, &.active {
          .image-format-wrapper {
            outline: 2px solid $b-bright-blue;
            outline-offset: -2px;
            cursor: pointer;
            opacity: 1;
          }
        }

      }
    }
  }

  ::v-deep .swiper-slide {
    height: 120px!important;
  }

  ::v-deep .swiper-container {
    height: 100%;
    margin-top: 10px;
  }

  .pagination {
    &-wrapper {
      position: absolute;
      top: 50%;
      padding: 0px 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      z-index: 1;
    }
  }

  .play-icon-overlay {
    height: 100px;
    width: 77px;
    top: 1px;
    left: 1px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($black, 0.5);
  }

  .icon-fill {
    fill:$white;
  }

</style>
