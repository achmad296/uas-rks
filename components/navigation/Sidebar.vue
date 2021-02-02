<template>
  <client-only>
    <div class="outer-sidebar">
      <div ref="sidebar" class="sidebar">
        <div class="top text-center">
          <nuxt-link to="/">
            <img class="logo" src="~/assets/logo/yubibursa-white.png" alt="logo-yubibursa-white" />
          </nuxt-link>
        </div>
        <div class="card-account text-center">
          <!-- <vs-avatar v-if="account.img" class="avatar" size="64px" :src="account.img" /> -->
          <vs-avatar class="avatar" size="64px" :text="fullName" :src="avatar" />
          <p v-if="fullName.length > 20" class="body3 black acc-name">{{ fullName.slice(0, 20) + '...' }}</p>
          <p v-else class="body3 black acc-name">{{ fullName }}</p>
          <p class="body3 blue1">Peminjam</p>
          <div class="d-flex align-items-center pt-16 pb-8">
            <div class="px-16">
              <img src="~/assets/icons/store.svg" alt="store-icon" />
            </div>
            <div class="flex-fill text-left pr-8">
              <caption-1 class="black-60">Bisnismu</caption-1>
              <p class="body3 black">{{ activeBusinessTitle }}</p>
            </div>
          </div>
          <div class="seperator" />
          <nuxt-link v-slot="{ isActive, navigate }" to="/peminjam/account/wallet">
            <div
              :class="isActive ? 'wallet-container-active' : ''"
              class="wallet-container d-flex align-items-center py-8"
              @click="navigate"
            >
              <div class="px-16">
                <img src="~/assets/icons/wallet.svg" alt="wallet-icon" />
              </div>
              <div class="flex-fill text-left pr-8">
                <caption1 class="black-60">Saldo</caption1>
                <p :class="saldoStyle(activeWallet)">{{ currencyFormat(activeWallet) }}</p>
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="nav-list">
          <nuxt-link
            v-for="(navItem, idx) in navItems"
            :key="navItem.name"
            v-slot="{ isActive, navigate }"
            class=""
            :to="navItem.to"
          >
            <div
              :class="
                isActive || (idx === 2 && $nuxt.$route.name.includes('peminjam-account-setting'))
                  ? 'nav-item-active'
                  : 'nav-item'
              "
              class="nav"
              @click="navigate"
            >
              <img
                class="mr-3 category-icon"
                :src="
                  require(`~/assets/icons/${
                    isActive || (idx === 2 && $nuxt.$route.name.includes('peminjam-account-setting'))
                      ? navItem.iconActive
                      : navItem.icon
                  }`)
                "
              />
              <body-2
                :class="isActive || (idx === 2 && $nuxt.$route.name.includes('peminjam-account-setting')) ? 'blue' : ''"
                class="my-auto"
              >
                {{ navItem.name }}
              </body-2>
            </div>
          </nuxt-link>
        </div>

        <div class="nav-list logout-container">
          <div class="nav nav-item" style="display: flex" @click="logout">
            <img class="mr-3 category-icon" src="~assets/icons/logout.svg" />
            <body-2 class="my-auto flex-fill">Keluar</body-2>
          </div>
          <caption-2 style="margin-left: 18px" class="black-60">Yubibursa v1.1.0</caption-2>
        </div>
      </div>
      <div class="sidebar-toggle" @click="toggleSidebar">
        <span class="material-icons">{{ sidebarIcon }}</span>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  async fetch() {
    this.$vs.loading()

    try {
      this.activeBusinessIdx = this.$store.getters['user/getActiveBusinessIdx']
      this.account = await this.$store.getters['user/getUserAccount']

      const businessRes = await this.$repositories.business.getByUser(this.account.id)
      this.businesses = businessRes.data.response.results

      const avatarRes = await this.$repositories.account.getAccountAvatar(this.account.id)
      this.avatar = avatarRes.data.response.results[0].url

      this.$vs.loading.close()
    } catch (err) {
      this.$vs.loading.close()
      throw new Error(err)
    }
  },
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
          name: 'Pengaturan',
          to: '/peminjam/account/setting/account',
          icon: 'setting.svg',
          iconActive: 'setting-active.svg'
        }
      ],
      account: {
        first_name: '',
        last_name: ''
      },
      activeBusinessIdx: 0,
      businesses: [
        {
          balance: 0
        }
      ],
      sidebarIcon: 'reorder',
      avatar: null
    }
  },
  computed: {
    fullName() {
      return this.account.first_name + ' ' + this.account.last_name
    },
    activeBusinessTitle() {
      return this.businesses[this.activeBusinessIdx].title
    },
    activeWallet() {
      return this.businesses[this.activeBusinessIdx].balance
    },
    yubivStyle() {
      return this.$mq === 'md' || this.$mq === 'lg' ? ' text-center' : ''
    }
  },

  methods: {
    currencyFormat(val) {
      return 'Rp ' + val.toLocaleString('id-ID')
    },
    saldoStyle(val) {
      if (val.toString().length < 7) {
        return 'saldo h3 blue'
      } else if (val.toString().length < 13) {
        return 'saldo subtitle2 blue'
      } else {
        return 'saldo caption1 blue'
      }
    },
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    toggleSidebar() {
      this.$refs.sidebar.classList.toggle('active')
      this.sidebarIcon === 'reorder' ? (this.sidebarIcon = 'clear') : (this.sidebarIcon = 'reorder')
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 247px;
  background: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 5%;
}

.top {
  background: #d30000;
  background-image: url('~assets/images/account/top-sidebar.png');
  height: 163px;
  border-radius: 0px 0px 24px 24px;
}
.logo {
  margin-top: 18px;
  cursor: pointer;
}
.card-account {
  margin-top: -80px;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  background: #fff;
  box-shadow: 0px 0px 8px rgba(132, 127, 130, 0.08);
  border-radius: 16px;
}
.avatar {
  margin-top: -24px;
  border: 4px solid #fff;
}
.seperator {
  width: 182px;
  margin: 0 auto;
  /* Neutral/Black-10 */
  border: 0.7px solid #ebeaea;
}
.nav-list {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}

.acc-name {
  margin-top: -7px;
}
.material-icons {
  font-size: 24px;
  color: #847f82;
}
.business-select {
  text-align: left;
  cursor: pointer;
}
.wallet-container-active {
  background: #ebf4fc;
}
.wallet-container {
  cursor: pointer;
  border-radius: 0px 0px 16px 16px;
}
.nav {
  display: flex;
  width: 100%;
  padding: 18px;
  border-radius: 16px;
  cursor: pointer;
}

.nav-item {
  background: #ffffff;
}
.nav-item:hover {
  background: #ebf4fc;
}
.nav-item-active {
  background: #ebf4fc;
}
.category-icon {
  filter: #3c91e6;
}
.logout-container {
  margin-top: auto;
}

.sidebar-toggle {
  display: none;
  border-radius: 50%;

  background-color: #d30000;
  padding: 5px;
  position: absolute;
  bottom: 40px;
  right: 15px;
  cursor: pointer;
  z-index: 999999;
}

.sidebar-toggle .material-icons {
  font-size: 48px;
}

.sidebar-toggle .material-icons {
  color: #fff;
}

*::-webkit-scrollbar {
  width: 5px; /* width of the entire scrollbar */
}

*::-webkit-scrollbar-thumb {
  background-color: gray; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

@media only screen and (max-width: 992px) {
  .sidebar {
    display: none;
  }

  .sidebar.active {
    display: block;
  }

  .sidebar-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
