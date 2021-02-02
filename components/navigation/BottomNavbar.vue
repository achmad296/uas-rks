<template>
  <div class="d-flex">
    <nuxt-link v-for="navItem in navItems" :key="navItem.name" v-slot="{ isActive, navigate }" :to="navItem.to">
      <div
        :class="isActive ? 'nav-item-active' : 'nav-item'"
        class="nav flex-fill d-flex flex-column justify-content-center text-center"
        @click="navigate"
      >
        <img
          class="mx-3 category-icon"
          :src="require(`~/assets/icons/${isActive ? navItem.iconActive : navItem.icon}`)"
        />
        <body-2 :class="isActive ? 'blue' : ''" class="my-auto">{{ navItem.name }}</body-2>
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
          name: 'Dashboard',
          to: '/peminjam/dashboard',
          icon: 'category.svg',
          iconActive: 'category-active.svg'
        },
        {
          name: 'Pinjaman',
          to: '/peminjam/pinjaman',
          icon: 'work.svg',
          iconActive: 'work-active.svg'
        },
        {
          name: 'Akun',
          to: '/peminjam/account',
          icon: 'profile.svg',
          iconActive: 'profile-active.svg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.bar {
  background: #ffffff;
}
.nav {
  padding: 8px;
  cursor: pointer;
}
.nav-item {
  background: #ffffff;
}
.nav-item-active {
  background: #ffffff;
}
</style>
