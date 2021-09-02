// Template
<template>

  <div class="image-format-wrapper">
    <img
      :style="getStyle"
      v-if="isLazy"
      v-lazyload
      class="image-format"
      :data-url="formatImage"
      :class="classes"
      @click="onImageClick"
      :alt="alt"
      v-on:load="loadState"
    />

    <img
      :style="getStyle"
      v-if="!isLazy"
      class="image-format"
      :src="formatImage"
      :class="classes"
      @click="onImageClick"
      :alt="alt"
      v-on:load="loadState"
    />
  </div>
</template>

// Javascript
<script>
const square = 'square'
const top = 'top'
const center = 'center'
const bottom = 'bottom'
const left = 'left'
const right = 'right'

const Emits = {
  Loaded: 'loaded',
  Clicked: 'clicked',
}

export default {
  name: 'ImageFormat',
  data() {
    return {
      isLoaded: false,
    }
  },
  computed: {
    formatImage() {
      if (this.src && this.size) {
        return this.formatImageSize()
      }
    },

    getStyle(){
        if(!this.specs) return

        const symbol = this.specs.percent ? '%':'px'

        if(this.specs.height && this.specs.width) {
          return {
            'height': `${this.specs.height}${symbol}`,
            'width': `${this.specs.width}${symbol}`
          }
        }

        if(this.specs.height) {
          return {
            'height': `${this.specs.height}${symbol}`,
          }
        }

        if(this.specs.width) {
          return {
            'width': `${this.specs.width}${symbol}`
          }
        }

    }
  },
  props: {
    src: String,
    alt: {
      type: String,
      required: false,
      default: 'lume cube image',
    },
    specs: [Object,Boolean],
    size: String,
    crop: String,
    classes: String,
    isLazy: false,
  },
  methods: {
    loadState() {
      this.isLoaded = true
      this.$emit(Emits.Loaded)
    },
    onImageClick() {
      this.$emit(Emits.Clicked)
    },
    formatCrop() {
      if (this.crop === square) {
        return `_${this.size}_crop_${center}`
      }
      if (this.crop === top) {
        return `_${this.size}_crop_${top}`
      }
      if (this.crop === bottom) {
        return `_${this.size}_crop_${bottom}`
      }
      if (this.crop === left) {
        return `_${this.size}_crop_${left}`
      }
      if (this.crop === right) {
        return `_${this.size}_crop_${right}`
      }

      return ''
    },
    formatImageSize() {
      // JPG
      if (this.src.includes('.jpg')) {
        return this.getFormat('.jpg', '.progressive.jpg')
      }
      // JPG Caps
      if (this.src.includes('.JPG')) {
        return this.getFormat('.JPG', '.progressive.JPG')
      }
      // JPEG
      if (this.src.includes('.jpeg')) {
        return this.getFormat('.jpeg', '.progressive.jpeg')
      }
      // JPEG
      if (this.src.includes('.JPEG')) {
        return this.getFormat('.jpeg', '.progressive.JPEG')
      }
      // PNG
      if (this.src.includes('.png')) {
        return this.getFormat('.png', '.png')
      }

      // gif
      if (this.src.includes('.gif')) {
        return this.getFormat('.gif', '.gif')
      }

    },
    /**
     * @param { string } fileType
     * @param { string } format
     */
    getFormat(fileType, format) {
      let splitUrl = this.src.split(fileType)
      splitUrl[0] =
        splitUrl[0] + (this.crop ? this.formatCrop() : `_${this.size}`)
      let joinedUrl = splitUrl.join(format)
      return joinedUrl
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
.fade-in {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 1s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.image-format-wrapper {
  display: flex;
}
</style>
