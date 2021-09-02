<template>

  <button
    :aria-label="ariaLabel"
    class="circle-button"
    :type="type"
    :disabled="disabled"
    @click="onButtonClick()">
    <icon
      :name="iconName"
      :size="size"
      fillClass="circle-button-icon">
    </icon>
  </button>

</template>

<script>
import Icon from '~/components/shared/icons/Icon.vue'

const Emit = {
  Clicked: 'clicked',
}

export default {
  name: 'CircleButton',
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: '18px',
    },
    iconName: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      default: "pagination"
    }
  },
  methods: {
    onButtonClick() {
      this.$emit(Emit.Clicked)
    },
  },
}
</script>

<style lang="scss" scoped>
.circle-button {
  @include size(55);
  border-radius: 28px;
  background-color: $white;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);

  // &:focus {
  //   border: 2px solid $teal;
  // }

  &:focus,
  &:hover {
    .circle-button-icon {
      fill: $b-bright-blue;
    }
  }

  &:disabled,
  &[disabled] {
    background-color: $b-form-gray;
    .circle-button-icon {
      fill: $b-gray-disabled;
    }
  }

  &-icon {
    fill: $b-black;
  }
}
</style>
