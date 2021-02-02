<template>
  <div :class="layout">
    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    layout() {
      return this.$mq === 'lg' || this.$mq === 'xl' ? 'outer-login-register' : 'outer-login-register-mobile'
    }
  },
  mounted() {
    this.customizeVhMobile()
  },
  methods: {
    customizeVhMobile() {
      const vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      // We listen to the resize event
      window.addEventListener('resize', () => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })
    }
  }
}
</script>

<style scoped>
.outer-login-register {
  padding: 35px 9%;
  height: 100vh;
}

.outer-login-register-mobile {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
</style>
