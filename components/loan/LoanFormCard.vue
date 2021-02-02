<template>
  <div class="loan-form-card">
    <subtitle-1 style="color: #3c91e6">{{ section }}</subtitle-1>
    <hr />
    <body-2 style="margin-top: 23px; margin-bottom: 16px; color: #00171f">{{ caption }}</body-2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    section: { type: String, default: '' },
    caption: { type: String, default: '' }
  }
}
</script>

<style scoped>
.loan-form-card {
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  background: #fff;
}

hr {
  margin-top: 14px;
  margin-bottom: 20px;
  border: 0.7px solid #ebeaea;
}
</style>
