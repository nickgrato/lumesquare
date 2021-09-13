// Template
<template>
  <button
    :aria-label="text"
    class="button-flat"
    :type="type"
    :disabled="disabled"
    @click="onButtonClick">
    <span :class="{ has_icon: hasIcon }">{{ text }}</span>
    <icon
      v-if="showIcon"
      :name="iconName"
      size="18px"
      fillClass="icon-fill">
    </icon>
  </button>
</template>

// JS
<script>
import Icon from '~/components/shared/icons/Icon.vue'

const Emit = {
  Clicked: 'clicked',
}

export default {
  name: 'FlatButton',
  components: {
    Icon,
  },
  computed: {},
  props: {
    text: String,
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
    }
  },
  data: function() {
    return {
      hasIcon: false
    }
  },
  computed: {
    showIcon: function() {
      return this.iconName.length > 0
    },
  },
  methods: {
    onButtonClick() {
      this.$emit(Emit.Clicked)
    }
  },
  mounted() {
    // init button class
    this.hasIcon = this.iconName.length ? true : false
  },
}
</script>

// SCSS
<style lang="scss" scoped>
/** Most button styles are in "button.scss" in the global files **/
  .has_icon {
    margin-right: 5px;
  }

  .icon-fill {
    fill: $b-dark-blue;
  }
</style>
