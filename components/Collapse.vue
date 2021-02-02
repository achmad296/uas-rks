<template>
  <vs-collapse :style="custom">
    <vs-collapse-item>
      <div slot="header" :class="this.$mq === 'md' ? '' : 'pr-5'">{{ title }}</div>
      {{ desc }}
    </vs-collapse-item>
  </vs-collapse>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  },
  computed: {
    custom() {
      return 'background: #EBF4FC; border-radius: 10px;'
    }
  }
}
</script>

<style>
.pr-32 {
  padding-right: 32px;
}
.vs-collapse {
  padding: 11px 8px 11px 24px;
  line-height: 150%;
  color: #00171f;
}
.vs-collapse-item--header {
  padding: 0;
}
.con-content--item {
  padding: 8px 24px 5px 0;
  font-size: 16px;
  line-height: 150%;
  color: #847f82;
}
</style>
