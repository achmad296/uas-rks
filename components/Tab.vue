<template>
  <div v-show="isActive" class="tab" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Tab'
    }
  },
  data() {
    return {
      isActive: false,
      style: {
        background: ''
      }
    }
  }
}
</script>
