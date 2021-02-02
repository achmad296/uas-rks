<template>
  <div class="loan-scheme-card">
    <div class="icon">
      <img :src="image" alt="icon" />
    </div>
    <div class="content">
      <subtitle-2 style="color: #847f82"> {{ title }} </subtitle-2>
      <subtitle-2>{{ subtitle.toLocaleString('id-ID') }}</subtitle-2>
      <p class="body3" style="margin-top: 8px">{{ desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    desc: { type: String, default: '' }
  }
}
</script>

<style scoped>
.loan-scheme-card {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #d8e9fa;
  width: 100%;
  height: 136px;
  display: flex;
}

.icon {
  margin-right: 16px;
}
</style>
