<template>
  <div class="account">
    <div class="top text-center">
      <nuxt-link to="/">
        <img class="logo" src="~/assets/logo/yubibursa-white.png" alt="logo-yubibursa-white" />
      </nuxt-link>
    </div>
    <div class="container">
      <div class="card-account text-center">
        <vs-avatar v-if="avatar.length" class="avatar" size="64px" :src="avatar" />
        <vs-avatar v-else class="avatar" size="64px" :text="fullName" />
        <p class="body3 black acc-name">{{ fullName }}</p>
        <p class="body3 blue1">Peminjam</p>
        <div class="container py-8">
          <div class="row align-items-center">
            <div class="col-2">
              <img src="~/assets/icons/store.svg" alt="store-icon" />
            </div>
            <div class="col-7 business-select">
              <caption-1 class="black-60">Bisnismu</caption-1>
              <p class="body3 black">{{ activeBusinessTitle }}</p>
            </div>
          </div>
        </div>
        <div class="seperator"></div>
        <nuxt-link v-slot="{ isActive, navigate }" to="/peminjam/account/wallet">
          <div
            :class="isActive ? 'wallet-container-active' : ''"
            class="wallet-container container py-8"
            @click="navigate"
          >
            <div class="row align-items-center">
              <div class="col-2">
                <img src="~/assets/icons/wallet.svg" alt="wallet-icon" />
              </div>
              <div class="saldo-container col-9">
                <caption1 class="black-60">Saldo</caption1>
                <p :class="saldoStyle(activeWallet)">Rp {{ activeWallet.toLocaleString('id-ID') }}</p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <nuxt-link to="account/setting" class="nav nav-item flex-fill d-flex mb-16">
        <img class="mx-3 category-icon" src="~assets/icons/setting.svg" />
        <body-2 class="my-auto flex-fill">Pengaturan</body-2>
      </nuxt-link>
      <div v-if="$mq !== 'xs'">
        <div class="nav nav-item flex-fill d-flex" @click="logout">
          <img class="mx-3 category-icon" src="~assets/icons/logout.svg" />
          <body-2 class="my-auto flex-fill">Keluar</body-2>
        </div>
        <caption-2 class="black-60 mt-8 mx-16">Yubibursa v1.1.0</caption-2>
      </div>
    </div>
    <div v-if="$mq === 'xs'" class="logout-container container" @click="logout">
      <div class="nav nav-item flex-fill d-flex">
        <img class="mx-3 category-icon" src="~assets/icons/logout.svg" />
        <body-2 class="my-auto flex-fill">Keluar</body-2>
      </div>
      <caption-2 class="black-60 mt-8 mx-16">Yubibursa v1.1.0</caption-2>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'cms',
  async fetch() {
    this.$vs.loading()
    try {
      this.activeBusinessIdx = this.$store.getters['user/getActiveBusinessIdx']
      this.account = await this.$store.getters['user/getUserAccount']

      const avatarRes = await this.$repositories.account.getAccountAvatar(this.account.id)
      this.avatar = avatarRes.data.response.results[0].url

      const businessRes = await this.$repositories.business.getByUser(this.account.id)
      this.businesses = businessRes.data.response.results

      this.$vs.loading.close()
    } catch (err) {
      this.$vs.loading.close()
      throw new Error(err)
    }
  },
  data() {
    return {
      account: {
        first_name: '',
        last_name: ''
      },
      avatar: '',
      businesses: [
        {
          balance: 0
        }
      ],

      activeBusinessIdx: 0
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
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.account {
  width: 100%;
}

.top {
  background: #d30000;
  background-image: url('~assets/images/account/top-sidebar.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
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
  /* Neutral/White */
  background: #fff;
  /* Card/Medium */
  box-shadow: 0px 0px 8px rgba(132, 127, 130, 0.08);
  border-radius: 16px;
}
.avatar {
  margin-top: -24px;
  border: 4px solid #fff;
}
.business-select {
  text-align: left;
  cursor: pointer;
}
.seperator {
  margin: 0 24px;
  /* Neutral/Black-10 */
  border: 0.7px solid #ebeaea;
}
.acc-name {
  margin-top: -7px;
}
.wallet-container-active {
  background: #ebf4fc;
}
.wallet-container {
  cursor: pointer;
  border-radius: 0px 0px 16px 16px;
}
.saldo-container {
  text-align: left;
}
.nav {
  margin-left: auto;
  margin-right: auto;
  height: 56px;
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
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 80px;
}
</style>
