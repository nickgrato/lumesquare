<template>
  <section class="section">

    {{slice}}
    <div v-for="(item, i) in slice.items" :key="`slice-item-${i}`">
      <!-- <sub-sub-nav :field="item.linkBlocks" /> -->

    </div>

  </section>
</template>

<script>
// import
export default {
  name: "SubNav",
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.section {
  position: relative;
  background: #f7f7f7;
  color: #111;
  padding: 4em;
  text-align: center;
}
a {
  color: #111;
}
.title {
  margin-bottom: 2em;
}
</style>
