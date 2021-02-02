<template>
  <div class="container d-flex flex-column justify-content-center text-center">
    <span class="material-icons"> error_outline </span>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/" class="mt-4"><y-btn label="Home Page"></y-btn></nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object || Array,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.container {
  height: 500px;
}
.material-icons {
  font-size: 64px;
}
</style>
