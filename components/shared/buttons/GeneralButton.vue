// Template
<template>
  <button
    :id="cssId"
    :aria-label="text"
    :class="buttonClass"
    :type="type"
    :disabled="disabled"
    @click="onButtonClick($event)">
    <span :class="{ has_icon: hasIcon }">{{ text }}</span>
    <icon
      v-if="showIcon"
      :name="iconName"
      :size="iconSize"
      :fillClass="iconClass">
    </icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

// JS
<script>
import Icon from '~/components/shared/icons/Icon.vue'

const Emit = {
  Clicked: 'clicked',
}

const ButtonTypes = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tert: 'tert',
  Quad: 'quad'
}

export default {
  name: 'GeneralButton',
  components: {
    Icon,
  },
  computed: {},
  props: {
    text: String,
    category: {
      type: String,
      default: ButtonTypes.Primary,
    },
    type: {
      type: String,
      default: 'button',
    },
    iconName: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconSize: {
      type: String,
      default: '24px',
    },
    cssId: {
      type: String,
      default: '',
    },
  },
  data: function() {
    return {
      buttonClass: 'button-primary',
      iconClass: 'button-primary-icon',
      hasIcon: false
    }
  },
  computed: {
    showBottonLine: function() {
      return this.buttonClass !== 'button-secondary'
    },
    showIcon: function() {
      return this.iconName.length > 0
    }
  },
  methods: {
    onButtonClick(e) {
      this.$emit(Emit.Clicked,e)
    },

    setButtonClass() {
      switch (this.category) {
        case ButtonTypes.Primary:
          this.buttonClass = 'button-primary'
          this.iconClass = 'button-primary-icon'
          break
        case ButtonTypes.Secondary:
          this.buttonClass = 'button-secondary'
          this.iconClass = 'button-secondary-icon'
          break
        case ButtonTypes.Tert:
          this.buttonClass = 'button-tert'
          this.iconClass = 'button-primary-icon'
          break
        case ButtonTypes.Quad:
          this.buttonClass = 'button-quad'
          this.iconClass = 'button-quad-icon'
          break
      }
    }

  },
  mounted() {
    // init botton class
    this.setButtonClass()
    this.hasIcon = this.iconName.length ? true : false
  },
}
</script>

// SCSS
<style lang="scss" scoped>
.has_icon {
  margin-right: 5px;
}
/** Most button styles are in "button.scss" in the global files **/
</style>
