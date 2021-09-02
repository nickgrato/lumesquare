<template>
  <div class="accordion-section">
    <div class="accordion-section-title-wrapper">

      <div class="accordion-section-title">
        <span class="accordion-title" @click="setToggleActive()">{{title}}</span>
        <span class="title-slot">
          <!-- TITLE SLOT -->
          <slot name='title'></slot>
          <!-- ACTION -->
          <span class="accordion-section-action" @click="onActionClick()">{{action}}</span>
        </span>
      </div>


      <div class="accordion-actions"
        @click="setToggleActive()"
        v-if="!active">
        <icon
          :class="gitFill"
          name="plus"
          size="14px">
        </icon>
      </div>

      <div class="accordion-actions"
        @click="setToggleActive()"
        v-if="active">
        <icon
          :class="gitFill"
          name="minus"
          size="14px">
        </icon>
      </div>
    </div>


    <!-- ACCORDION CONTENT -->
    <transition name="vertical">
      <div class="accordion-section-contents"
        v-show='active'>
        <slot name="body"></slot>
      </div>
    </transition>

  </div>
</template>

// JS
<script>
import Icon from '~/components/shared/icons/Icon.vue'
import { Colors, Emit } from './const.js'

export default {
  name: 'AccordionSection',
  components: {
    Icon,
  },
  props: {
    title: String,
    action: String,
    color: {
      type: String,
      default: 'dark',
    },
  },
  data: function() {
    return {
      active: false,
      hoverMinus: false,
      hoverPlus: false,
    }
  },
  computed: {
    gitFill() {
      return Colors[this.color]
    },
  },
  methods: {
    setToggleActive() {
      this.active = !this.active
      let uniqueId = this._uid
      this.$parent.$emit(Emit.SectionClicked, uniqueId)
      this.$emit(Emit.SectionClicked, this.active)
    },

    setNotActive() {
      this.active = false
      this.hoverPlus = false
    },

    onActionClick() {
      this.$emit(Emit.ActionClicked)
    },
  },
}
</script>

// SCSS
<style lang="scss" scoped>
.accordion-section {
  border-bottom: $b-form-gray 1px solid;
}

.accordion-title {
  @include primary-font();
  @include font-size(14);
  color: $b-dark-blue;
  letter-spacing: 0;
  line-height: 25px;
}

.accordion-section-title {
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  &-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
  }
}

.accordion-section-contents {
  height: 100%;
  padding: 0px 18px 10px 18px;
}

.accordion-section-action {
  @include font-size(14);
  color: $black;
  letter-spacing: 0.2px;
  line-height: 18px;
  text-decoration: underline;
  padding-left: 18px;
  &:hover {
    color: $red;
    cursor: pointer;
  }
}

.accordion-actions {
  &:hover {
    cursor: pointer;
  }
}

.title {
  &-slot {
    padding-left: 18px;
  }
}

.light-theme {
  fill: $b-dark-blue;
}

.dark-theme {
  fill: $white;
}
</style>
