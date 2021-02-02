<template>
  <div class="payment-report-list">
    <div class="content">
      <div class="desc">
        <subtitle-2>Pembayaran Cicilan & Bagi Hasil - Periode {{ period }}</subtitle-2>
        <div class="caption-2">Telah Dibayar: {{ uploadDate }}</div>
      </div>
      <y-btn
        label="Bayar"
        class="report-btn"
        :disabled="!isReadyToPay"
        @click.native="() => $router.push(`/peminjam/pinjaman/${campaignId}/payment/${period}`)"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    campaignId: { type: Number, default: -1 },
    period: { type: String, default: '' },
    uploadDate: { type: String, default: '' },
    isReadyToPay: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
}

.caption-2 {
  color: #00cc66;
}

@media only screen and (max-width: 578px) {
  .content {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .report-btn {
    margin-top: 8px;
    width: max-content;
  }
}
</style>
