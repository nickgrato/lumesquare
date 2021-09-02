
<template>
  <svg
    :class="[iconClass, fillClass]"
    :style="iconStyle" v-on="$listeners">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="iconName"/>
  </svg>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: String,
      size: {
        type: String,
        default: '24px'
      },
      fillClass: String
    },
    computed: {
      iconClass () {
        let iconClass = { 'icon': true };

        iconClass[`icon--${this.name}`] = true;

        return iconClass
      },
      iconStyle () {
        return {
          'height': this.size,
          'width': this.size
        }
      },
      iconName () {
        return `#icon-${this.name}`
      }
    }
  }
</script>

<style></style>
