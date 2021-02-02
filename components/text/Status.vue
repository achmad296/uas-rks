<template>
  <span class="caption2 status" :class="statusStyle(value)">{{ statusText(value) }}</span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    statusStyle(s) {
      const status = s.toLowerCase()
      switch (status) {
        case 'success':
          return 'status-success'
        case 'pending':
          return 'status-pending'
        case 'canceled':
          return 'status-canceled'
        case 'process':
          return 'status-process'
        case 'failed':
          return 'status-failed'

        case 'rekening utama':
          return 'status-process'
        default:
          return ''
      }
    },
    statusText(s) {
      const status = s.toLowerCase()
      switch (status) {
        case 'success':
          return 'Berhasil'
        case 'pending':
          return 'Menunggu Pembayaran'
        case 'canceled':
          return 'Dibatalkan'
        case 'process':
          return 'Diproses'
        case 'failed':
          return 'Gagal'

        case 'rekening utama':
          return 'Rekening Utama'
        default:
          return ''
      }
    }
  }
}
</script>

<style></style>
