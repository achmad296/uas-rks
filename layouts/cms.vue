<template>
  <client-only>
    <div v-if="dekstopView && !this.$route.name.includes('peminjam-account-setting')" class="cms">
      <sidebar />
      <div class="content">
        <nuxt style="width: 100%" />
      </div>
    </div>
    <div v-else-if="dekstopView && this.$route.name.includes('peminjam-account-setting')" class="cms">
      <sidebar />
      <div class="content-wrapper">
        <headerbar title="Pengaturan" style="width: 100%"></headerbar>
        <div class="content-item">
          <setting-sidebar style="margin-right: 24px"></setting-sidebar>
          <nuxt style="width: 100%" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="mobile-content">
        <nuxt />
      </div>
      <BottomNavbar class="bottom-navbar" />
    </div>
  </client-only>
</template>

<script>
export default {
  computed: {
    dekstopView() {
      if (this.$mq === 'xs' || this.$mq === 'sm') {
        return false
      } else {
        return true
      }
    }
  },
  middleware: 'authBusiness'
}
</script>

<style scoped>
.cms {
  display: flex;
}

.bottom-navbar {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.content {
  display: flex;
  flex-grow: 1;
  overflow: auto;
  height: 100vh;
  background: #f4f7f8;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  background: #f4f7f8;
  overflow-x: hidden;
}

.content-item {
  display: flex;
  margin: 24px;
}
.mobile-content {
  overflow: auto;
  min-height: calc(100vh - 64px);
  margin-bottom: 56px;
  background: #f4f7f8;
}
</style>
