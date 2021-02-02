<template>
  <div class="account-setting">
    <headerbar title="Bisnis" />
    <separator />
    <div class="search-field-container">
      <basic-input
        id="search-bank-account"
        v-model="searchVal"
        placeholder="Cari nama pemilik/bank"
        icon-prepend="search"
        transparent-prepend
        class="search-input"
      />
      <y-btn label="Tambah Bisnis" />
    </div>
    <div class="business-list">
      <business-card />
      <business-card />
      <business-card />
      <business-card />
    </div>

    <modal-add-business :active-modal.sync="activeModalAddBusiness" />
  </div>
</template>

<script>
export default {
  layout: 'cms',
  data() {
    return { searchVal: '', activeModalAddBusiness: false }
  }
}
</script>

<style scoped>
.account-setting {
  padding: 0 16px 125px 16px;
  background-color: #fff;
}

.search-field-container {
  display: flex;
  margin: 24px 0;
}

.search-input {
  flex: 1;
  margin-right: 16px;
}

.business-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  width: 100%;
}
</style>
