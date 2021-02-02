<template>
  <div class="bank-box" :class="active && 'active'">
    <div class="bank-info">
      <bank-images :id="bank.id" />
      <body-2>{{ bank.name }}</body-2>
    </div>

    <span class="material-icons" :class="active && 'active'"> check_circle </span>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    bank: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.bank-box {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background: #fafbfc;
  border: 1px solid #d6d4d5;
  border-radius: 8px;
  margin-bottom: 4px;
  align-items: center;
  cursor: pointer;
}

.bank-box.active {
  background: #ebf4fc;
  border: 1px solid #3c91e6;
}

.bank-box.active .body2 {
  color: #3c91e6;
}

.bank-info {
  display: flex;
  align-items: center;
}

.bank-info .body2 {
  margin-left: 16px;
}

.material-icons {
  color: #ebeaea;
}

.material-icons.active {
  color: #3c91e6;
}
</style>
