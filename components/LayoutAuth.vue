<template>
  <div class="lr-card">
    <div class="illustration-container">
      <div class="logo">
        <nuxt-link to="/"
          ><img style="cursor: pointer" src="~assets/logo/main-logo.svg" alt="logo" width="104px"
        /></nuxt-link>
      </div>
      <div class="illustration">
        <img src="~assets/images/login-register/ilustrasi.svg" alt="illustration" />
        <h3>Selamat Datang di Yubibursa</h3>
        <body-2> Silakan Daftar atau Masuk untuk melanjutkan aktivitasmu. </body-2>
      </div>
      <div class="dummy"></div>
    </div>
    <div class="lr-form-container">
      <div v-if="!forgotPassword" class="logo-nav">
        <nuxt-link to="/"
          ><img style="cursor: pointer" src="~assets/logo/main-logo.svg" alt="logo" width="104px"
        /></nuxt-link>
      </div>
      <div v-if="!forgotPassword" class="nav-lr-form">
        <nuxt-link id="register" to="/register" class="nav-item" :class="selectedTab === 'register' && 'active'">
          <subtitle-2> Daftar </subtitle-2>
        </nuxt-link>
        <nuxt-link id="login" ref="login" to="/login" class="nav-item" :class="selectedTab === 'login' && 'active'">
          <subtitle-2> Masuk </subtitle-2>
        </nuxt-link>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forgotPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedTab: 'login'
    }
  },
  middleware: ['guest'],
  mounted() {
    this.$route.name === 'register' ? (this.selectedTab = 'register') : (this.selectedTab = 'login')
  },
  layout: 'login-register'
}
</script>

<style scoped>
.lr-card {
  box-shadow: 0px 0px 37px -10px rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: flex-start;
  height: 100%;
  border-radius: 16px;
  width: 100%;
}

.logo-nav {
  display: none;
}

.illustration-container {
  border-radius: 16px 0 0 16px;
  align-items: center;
  display: flex;
  flex-flow: column;
  background: #d8e9fa;
  max-width: 50%;
  height: 100%;
  width: 100%;
  background-image: url('~assets/images/login-register/pattern.svg');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100%;
}

.logo {
  margin-top: 10px;
}

.illustration {
  text-align: center;
  width: 100%;
  margin: auto 0;
  animation-duration: 1s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    opacity: 0;
    transform: translateY(70%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dummy {
  height: 100px;
}

.lr-form-container {
  border-radius: 0 16px 16px 0;
  min-width: 450px;
  flex: 1;
  background-color: #fff;
}

.nav-lr-form {
  width: 100%;
  height: 56px;
  display: flex;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

a.nav-item {
  text-decoration: none;
  pointer-events: auto;
  z-index: 999;
}

a.nav-item.active {
  pointer-events: none;
}

.nav-item:not(.active):hover {
  cursor: pointer;
  background: #dad9d9;
}

.nav-item.active {
  border-bottom: 2px solid #3c91e6;
}

.nav-item.active .subtitle2 {
  color: #3c91e6;
}

.nav-item .subtitle2 {
  color: #847f82;
}

@media only screen and (max-width: 991px) {
  .illustration-container {
    display: none;
  }

  .logo-nav {
    display: block;
    text-align: center;
    margin-top: 8px;
  }
  .lr-form-container {
    min-width: 0;
  }

  .lr-card {
    border-radius: 0;
  }
}

*::-webkit-scrollbar {
  width: 7px; /* width of the entire scrollbar */
}

*::-webkit-scrollbar-thumb {
  background-color: gray; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}
</style>
