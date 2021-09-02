<template>
  <div class="selector-wrapper"
  :class="{active: isActive }">
    <div class="selector-container">
      <button
        class="qty-button"
        type="button"
        @click="decrement">
        -
      </button>
      <span class="current-qty">
        {{ currentQty }}
      </span>
      <button
        class="qty-button"
        type="button"
        @click="increment">
        +
      </button>
    </div>
  </div>
</template>

<script>

const Emit = {
  Changed : 'changed'
}

export default {
  name: 'QtySelector',
  props: {
    qty: 0,
  },
  data: function() {
    return {
      currentQty:0,
      isActive: false
    }
  },
  watch: {
    qty: function (next, prev) {
      if(next == prev) return
      this.animateSelector()
      this.currentQty = next
    }
  },
  methods: {
    decrement(){
      if(this.currentQty === 0)return

      this.animateSelector()
      this.currentQty = this.currentQty - 1
      this.$emit(Emit.Changed,this.currentQty)
    },

    increment() {
      this.animateSelector()
      this.currentQty = this.currentQty + 1
      this.$emit(Emit.Changed,this.currentQty)
    },

    setQty(qty){
      this.currentQty = qty
    },

    animateSelector(){
      var self = this
      this.isActive = true

      setTimeout(() => {
        self.isActive = false
      }, 500)
    }
  },
  created(){
    this.currentQty = this.qty
  }
}
</script>

<style scoped lang="scss">
  .selector {
    &-wrapper {
      border: 2px solid $b-form-gray;
      border-radius: 17px;
      display: inline-block;
      transition: box-shadow 0.3s ease-in-out;
      &.active {
        -webkit-box-shadow: 0px 0px 13px 0px rgba(41,155,254,0.27);
        box-shadow: 0px 0px 13px 0px rgba(41,155,254,0.27);
      }
    }

    &-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 104px;
      padding: 0 4px;
    }
  }

  .current-qty {
    @include primary-font();
    @include font-size(12);
    padding:5px 10px;
  }

  .qty-button {
    padding:5px 10px;
    color: $b-light-gray;

    &:hover {
      cursor: pointer;
      color: $b-dark-blue;
    }
  }

</style>
