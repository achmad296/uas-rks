<template>
  <div class="status-badge" :style="[textColor, statusBg]">{{ statusValue }}</div>
</template>

<script>
export default {
  props: {
    statusValue: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: ''
    }
  },
  computed: {
    textColor() {
      switch (this.variant) {
        case 'success': {
          return {
            color: '#847F82'
          }
        }

        case 'info': {
          return {
            color: '#00A1E4'
          }
        }

        case 'collected': {
          return {
            color: '#00CC66'
          }
        }

        case 'warning': {
          return {
            color: '#F5B700'
          }
        }

        case 'danger': {
          return {
            color: '#DD403A'
          }
        }

        default: {
          return ''
        }
      }
    },

    statusBg() {
      switch (this.variant) {
        case 'success': {
          return {
            backgroundColor: '#EBEAEA'
          }
        }

        case 'info': {
          return {
            backgroundColor: '#CCECFA'
          }
        }

        case 'collected': {
          return {
            backgroundColor: '#CCF5E0'
          }
        }

        case 'warning': {
          return {
            backgroundColor: '#FDF1CC'
          }
        }

        case 'danger': {
          return {
            backgroundColor: '#F7D2DD'
          }
        }

        default: {
          return ''
        }
      }
    }
  }
}
</script>

<style scoped>
.status-badge {
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 20px;
}
</style>
