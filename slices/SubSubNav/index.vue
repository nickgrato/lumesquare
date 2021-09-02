<template>
  <section class="section">
    <div>{{$prismic.asText(slice.primary.title)}}</div>
    <div v-for="(item, i) in slice.items" :key="`slice-item-${i}`">
      <prismic-link :field="item.link">My Link</prismic-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "SubSubNav",
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
