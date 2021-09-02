
<template >
  <button
    :aria-label="label"
    class="icon-button"
    type="button"
    :class="buttonClass"
    :disabled="disabled"
    @click="buttonClick" >
    <icon
      v-if="icon"
      :name="icon"
      :size="size"
      :fill-class="getFillType" >
    </icon>
    <span class="u-sr-only"> {{ label }} </span>
  </button>
</template>

<script>
  import Icon from '~/components/shared/icons/Icon.vue';

  const Emit = {
    Clicked: 'clicked'
  }

  const FillTypes = {
    Black: 'black',
    White: 'white'
  }

  export default {
    components: { Icon },
    name: 'IconButton',
    props: {
      buttonClass: String,
      icon: String,
      size: String,
      label: String,
      disabled: {
        type: Boolean,
        default: false,
      },
      fillType: {
        type: String,
        default: FillTypes.Black,
      }
    },
    computed: {
      getFillType() {
        if(this.fillType === FillTypes.Black) return 'icon-button-black';

        if(this.fillType === FillTypes.White) return 'icon-button-white';
      }
    },
    methods: {
      buttonClick() {
        this.$emit(Emit.Clicked);
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
