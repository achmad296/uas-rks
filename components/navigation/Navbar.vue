<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <nuxt-link to="/"><img src="~assets/logo/main-logo.svg" width="139px" alt="Yubibursa" /></nuxt-link>
      </div>
      <div class="mobile-title">
        <h2>Menu</h2>
      </div>
      <div id="mobile-menu" class="navbar-toggle" @click="toggleMobileMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <ul class="navbar-menu" :class="mobileLayout">
        <li class="navbar-item">
          <nuxt-link to="/pinjaman" class="navbar-links body2" @click.native="toggleMobileLink">Pinjaman</nuxt-link>
        </li>
        <li class="navbar-item">
          <nuxt-link to="/pendanaan" class="navbar-links body2" @click.native="toggleMobileLink">Pendanaan</nuxt-link>
        </li>
        <li class="vertical-line"></li>
        <li class="navbar-btn mr-lg-3">
          <nuxt-link to="/login" @click.native="toggleMobileLink">
            <y-btn label="Masuk" variant="secondary"></y-btn>
          </nuxt-link>
        </li>
        <li class="navbar-btn">
          <nuxt-link to="/register" @click.native="toggleMobileLink">
            <y-btn label="Daftar"></y-btn>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    mobileLayout() {
      return this.$mq !== 'lg' && this.$mq !== 'xl' && 'd-inline-flex flex-column'
    }
  },
  methods: {
    toggleMobileMenu() {
      const menu = document.querySelector('#mobile-menu')
      const menuLinks = document.querySelector('.navbar-menu')
      const navbarLogo = document.querySelector('.navbar-logo')
      const title = document.querySelector('.mobile-title')
      title.classList.toggle('active')
      menu.classList.toggle('is-active')
      navbarLogo.classList.toggle('hide-logo')
      menuLinks.classList.toggle('active')
      title.classList.contains('active')
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'visible')
    },
    toggleMobileLink() {
      const menu = document.querySelector('#mobile-menu')
      const menuLinks = document.querySelector('.navbar-menu')
      const navbarLogo = document.querySelector('.navbar-logo')
      const title = document.querySelector('.mobile-title')
      title.classList.toggle('active')
      menu.classList.toggle('is-active')
      navbarLogo.classList.toggle('hide-logo')
      menuLinks.classList.toggle('active')
      document.body.style.overflow = 'visible'
    }
  }
}
</script>

<style scoped>
.mobile-title {
  display: none;
}

.navbar {
  height: 81px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
  background-color: white;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 9999;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;
}

.navbar-logo {
  display: flex;
  align-items: center;
}

.navbar-menu {
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
}

.navbar-item {
  height: 80px;
}

.vertical-line {
  border-left: 1px solid #d6d4d5;
  height: 37px;
  margin-right: 20px;
  margin-left: 8px;
}

.navbar-links {
  color: #00171f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  height: 100%;
}

a.navbar-links {
  text-decoration: none;
}

.navbar-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.button:hover {
  background: #d3000079;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.navbar-links:hover {
  color: #d30000;
  transition: all 0.3s ease;
}

@media screen and (max-width: 991px) {
  .hide-logo {
    visibility: hidden;
  }

  .mobile-title.active {
    display: block;
    margin: auto;
  }

  .navbar-menu {
    width: 100%;
    position: absolute;
    top: -1000px;
    left: 0;
    opacity: 1;
    transition: all 0.5s ease;
    height: 100vh;
    z-index: -1;
    padding-left: 40px;
    padding-right: 40px;
  }

  .navbar-menu.active {
    margin-top: -1px;
    background: white;
    top: 100%;
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 99;
    font-size: 1.6rem;
  }

  .navbar-logo {
    position: absolute;
    top: 20%;
    left: 5%;
  }

  .navbar-toggle .bar {
    width: 25px;
    height: 3px;
    margin: 5px auto;
    transition: all 0.3s ease-in-out;
    background: #fff;
    background-color: #000;
    display: block;
    cursor: pointer;
  }

  .navbar-item {
    height: 40px;
    width: 100%;
    margin-bottom: 8px;
    margin-top: 8px;
  }

  .vertical-line {
    display: none;
  }

  .navbar-links {
    text-align: center;
    width: 100%;
    display: table;
  }

  a {
    width: 100%;
  }

  .navbar-btn button {
    width: 100%;
  }

  .navbar-btn {
    margin: 8px 0px;
  }

  #mobile-menu {
    position: absolute;
    top: 25%;
    right: 5%;
    transform: translate(5%, 20%);
  }

  #mobile-menu.is-active .bar:nth-child(2) {
    opacity: 0;
  }

  #mobile-menu.is-active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  #mobile-menu.is-active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>
