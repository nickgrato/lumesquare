<template>
  <section class="section">
    <div class="group-link-title">
      {{ slice.primary.group_label}}
    </div>
    <div v-for="(item, i) in slice.items" :key="`slice-item-${i}`">
      <a href="#">{{ item.category_link_label }}</a>
    </div>
  </section>
</template>

<script>
export default {
  name: "GroupOfLinks",
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

.group-link-title {
  font-weight: bold;
}
</style>
