<template>
  <div class="sticky">
    <div class="header d-flex align-items-center justify-content-center">
      <nuxt-link :to="backTo" class="d-flex align-items-center mr-3">
        <span v-if="backTo" class="material-icons"> arrow_back </span>
      </nuxt-link>
      <h3 :class="isMiddle ? 'mx-auto' : 'mr-auto'">{{ title }}</h3>
      <div v-if="backTo.length" class="ml-auto">
        <slot name="right"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    backTo: {
      type: String,
      default: ''
      // example:  '/peminjam/account'
    },
    isMiddle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 999;
}
.header {
  height: 74px;

  padding: 0 24px 0 24px;
  background: #ffffff;
}
.blank {
  height: 74px;
}
.material-icons {
  font-size: 24px;
  font-weight: 600;
}
a {
  color: #00171f;
  padding: 0;
}

@media screen and (max-width: 577px) {
  .header {
    padding: 0 16px 0 16px;
  }
}

@media screen and (max-width: 300px) {
  .header {
    padding: 0 4px 0 4px;
  }
}
</style>
