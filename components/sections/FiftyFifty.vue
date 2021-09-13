<template>
<!-- v-view="viewHandler" -->
  <div class="ff-wrapper" >
    <transition name="fade">
      <div class="ff-container"
        :class="getLayoutStyle">

        <!-- TEXT BLOCK -->
        <div class="text-block-wrapper"
          :style="getTextBlockStyle">

          <div class="text-block-container">

            <!-- SUB HEADING  -->
            <div class="sub-header h3-sub" :style="`color:${subheadingColor}`">
              {{ subheading }}
            </div>

            <!-- HEADING -->
            <h2 class="header h2" :style="`color:${headingColor}`">
              {{ heading }}
            </h2>

            <!-- BODY COPY  -->
            <div class="body-copy body-md" :style="`color:${bodyColor}`">
              {{ body }}
            </div>

            <!-- CTA -->
            <a :href="ctaUrl" v-if="enableCta">
              <general-button
                :text="ctaText"
                :category="ctaType"
                type="button">
              </general-button>
            </a>

            <slot class="ff-slot"></slot>
          </div>
        </div>

        <!-- IMAGE BLOCK -->
        <div class="image-block-wrapper">
          <img alt="lifestyle" :src="imageSrc" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// Components
import GeneralButton from '~/components/shared/buttons/GeneralButton.vue'

// Data Models
const BackgroundTypes = {
  Color: 'color',
  Image: 'image',
}

const LayoutTypes = {
  Right: 'right',
  Left: 'left',
}

export default {
  name: 'FiftyFifty',
  components: {
    GeneralButton,
  },
  props: {
    layout: String, // 'left' or 'right'
    textBackgroundType: String, // 'color' or 'image'
    image: String,
    imageMobile: String,
    textBackgroundImage: String,
    textBackgroundImageMobile: String,
    textBackgroundColor: String,
    subheading: String,
    subheadingColor: String,
    heading: String,
    headingColor: String,
    body: String,
    bodyColor: String,
    enableCta: Boolean,
    ctaText: String,
    ctaUrl: String,
    ctaType: String,
  },
  data() {
    return {
      showSection: false
    }
  },
  methods:{
     viewHandler(e){
      if(e.percentInView === 1) {
        this.showSection = true
      }
    }
  },
  computed: {
    getTextBlockStyle() {
      if (this.textBackgroundType === BackgroundTypes.Color)
        return `background: ${this.textBackgroundColor}`

      if (this.textBackgroundType === BackgroundTypes.Image) {
        // Default Mobile
        let imageValue = this.textBackgroundImageMobile

        if (this.$mq != 'mobile') imageValue = this.textBackgroundImage

        return `backgroundImage: url(${imageValue})`
      }
    },

    getLayoutStyle() {
      if (this.layout === LayoutTypes.Left) return

      if (this.layout === LayoutTypes.Right) return 'layout-reverse'
    },

    imageSrc() {
      if (this.$mq === 'mobile' || this.$mq === 'mobile_small' || this.$mq === 'tablet') return this.imageMobile

      return this.image
    },
  }
}
</script>

<style lang="scss" scoped>

.ff-wrapper {
  display: flex;
  justify-content: center;
  padding: 32px 0px;
  background-color: $white;
}

.ff-container {
  // max-width: 1048px;
  max-width: $max-section-width;
  display: flex;
  margin: 0 16px;

  @include desktop-down {
    flex-direction: column-reverse;
    width: 100%;
  }

  &.layout-reverse {
    flex-direction: row-reverse;

    @include desktop-down {
      flex-direction: column-reverse;
    }
  }
}

.text-block-wrapper {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @include desktop-down {
    width: 100%;
  }
}

.text-block-container {
  width: 413px;

  @include desktop-down {
    padding: 24px 16px 48px 16px;
    text-align: center;
  }

  @include tablet-down {
    width: 344px;
  }
}

.image-block-wrapper {
  width: 50%;
  margin-bottom: -4px;

  img {
    width: 100%;
  }

  @include desktop-down {
    width: 100%;
  }
}

.sub-header {
  margin-bottom: 8px;

  @include desktop-down {
    margin-bottom: 4px;
  }
}

.header {
  color: $b-dark-blue;
  margin-bottom: 16px;

  @include desktop-down {
    margin-bottom: 8px;
  }
}

.body-copy {
  color: $b-dark-blue;
  margin-bottom: 24px;

  @include desktop-down {
    margin-bottom: 16px;
  }
}
</style>
