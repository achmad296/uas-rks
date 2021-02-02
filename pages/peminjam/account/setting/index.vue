<template>
  <div>
    <headerbar back-to="/peminjam/account" title="Pengaturan" />
    <div class="nav-items">
      <nuxt-link to="/peminjam/account/setting/account" class="nav-item">
        <body-2>Akun</body-2>
      </nuxt-link>
      <!-- <nuxt-link to="/peminjam/account/setting/business" class="nav-item">
        <body-2>Bisnis</body-2>
      </nuxt-link> -->
      <nuxt-link to="/peminjam/account/setting/bank-account" class="nav-item">
        <body-2>Rekening Bank</body-2>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'cms'
}
</script>

<style scoped>
.nav-items {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  padding: 16px;
  cursor: pointer;
  border-radius: 16px;
}

.nav-item:hover {
  background-color: rgb(230, 230, 230);
}
</style>
