// template
<template>
    <section class="product-image-wrapper">
      <div class="product-image-container">

        <!-- THUMBNAILS  -->
        <div class="thumbnail-wrapper">
          <div class="thumbnail-container">
            <div class="thumbnail-image-wrapper"
              v-for="(image,index) in images"
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
                size="79x">
              </image-format>

            </div>
          </div>
        </div>

        <!-- Featured Image  -->
        <div class="feaured-image-wrapper">


          <div class="featured-image-container"
            v-if="featuredImage">

            <!-- Pagination  -->
            <div class="pagination-wrapper">

              <!-- BACK ARROW -->
              <icon-button
                label="back arrow"
                class="arrow-prev"
                @clicked="slidePrev()"
                size="24px"
                icon="arrow_left">
              </icon-button>

              <!-- NEXT ARROW -->
              <icon-button
                label="next arrow"
                class="arrow-next"
                @clicked="slideNext()"
                size="24px"
                icon="arrow_right">
              </icon-button>

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

import ImageFormat from '~/components/shared/image/ImageFormat.vue'
import IconButton from '~/components/shared/buttons/IconButton.vue'
import Icon from '~/components/shared/icons/Icon.vue'

export default {
  name: 'FeaturedImages',
  props: {
    images:Array
  },
  data: function() {
    return {
      featuredImage:{},
      imageIndex: 0,
      imageTransition: false
    }
  },
  components: {
    ImageFormat,
    IconButton,
    Icon
  },
  computed: {},
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
  mounted(){
    console.log('images',this.images)
  },
  created: function() {
    this.initFeaturedImage()
  }
}
</script>

// SCSS
<style lang="scss" scoped>
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
      padding-left: 3.5px;
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
    }

    &-image {
      &-wrapper {
        position: relative;
        display: flex;
        margin-bottom: 8%;

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

  .pagination {
    &-wrapper {
      position: absolute;
      top: 50%;
      padding: 0px 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .play-icon-overlay {
    height: 100%;
    width: 100%;
    top:0px;
    left:0px;
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
