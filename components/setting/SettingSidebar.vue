<template>
  <div class="setting-sidebar">
    <nuxt-link v-for="(navItem, idx) in navItems" :key="idx" v-slot="{ isActive, navigate }" :to="navItem.to">
      <div :class="isActive ? 'nav-item active' : 'nav-item'" @click="navigate">
        <img
          :src="require(`~/assets/icons/setting/${isActive ? navItem.iconActive : navItem.icon}`)"
          alt="Icon Setting"
        />
        <body-2>{{ navItem.title }}</body-2>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          title: 'Akun',
          to: '/peminjam/account/setting/account',
          icon: 'profile-nav.svg',
          iconActive: 'profile-nav-active.svg'
        },
        // {
        //   title: 'Bisnis',
        //   to: '/peminjam/account/setting/business',
        //   icon: 'business-nav.svg',
        //   iconActive: 'business-nav-active.svg'
        // },
        {
          title: 'Rekening bank',
          to: '/peminjam/account/setting/bank-account',
          icon: 'bank-nav.svg',
          iconActive: 'bank-nav-active.svg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.setting-sidebar {
  max-width: 242px;
  width: 100%;
  padding: 16px;
  height: 100%;
  background-color: #fff;
  border-radius: 16px;
}

.nav-item {
  display: flex;
  padding: 16px 26px;
  border-radius: 16px;
  cursor: pointer;
}

.nav-item.active {
  background-color: #ebf4fc;
}

.nav-item .body2 {
  margin-left: 18px;
}

.nav-item.active .body2 {
  color: #3c91e6;
}
</style>
