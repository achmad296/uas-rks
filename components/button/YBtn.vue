<template>
  <button :style="[buttonStyle]" :class="[vsButton, color, sizeVariants, variants]" :type="type">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'YBtn',
  props: {
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'bg-primary1'
    },
    size: {
      type: String,
      default: 'medium'
    },
    variant: {
      type: String,
      default: 'flat'
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      buttonStyle: {
        lineHeight: '150%'
      }
    }
  },
  computed: {
    sizeVariants() {
      switch (this.size) {
        case 'large-full':
          return 'btn-lg full-width'
        case 'medium-full':
          return 'btn-md full-width'
        case 'small-full':
          return 'btn-sm full-width'
        case 'large':
          return 'btn-lg'
        case 'medium':
          return 'btn-md'
        case 'small':
          return 'btn-sm'
        default:
          return 'btn-md'
      }
    },
    variants() {
      switch (this.variant) {
        case 'flat':
          return 'flat-btn vs-button-gradient'
        case 'secondary':
          return 'secondary-btn vs-button-gradient'
        case 'outline':
          return 'outline-btn vs-button-gradient'
        case 'disabled':
          return 'disabled-btn'
        default:
          return 'vs-button-gradient'
      }
    },
    vsButton() {
      return 'vs-button'
    }
  }
}
</script>

<style scoped>
.vs-button {
  letter-spacing: 0.04em;
  --vs-button-padding: 0;
  --vs-button-padding: 0;
}
.vs-button-gradient:hover {
  transform: translate(0, -2px);
  box-shadow: 0px 8px 25px -8px #aaa;
}

@media (hover: none) {
  .vs-button-gradient:hover {
    transform: translate(0, 0);
    box-shadow: none;
  }
}

.vs-button-gradient:active {
  transform: translate(0, 5px);
  box-shadow: none !important;
}
</style>
