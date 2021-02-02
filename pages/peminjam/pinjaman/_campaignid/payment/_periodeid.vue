<template>
  <div class="profit-payment">
    <Headerbar
      :title="`Laporan Penjualan - Periode ${$route.params.periodeid}`"
      :back-to="`/peminjam/pinjaman/${$route.params.campaignid}`"
    />

    <div class="container">
      <div v-if="activeSection === 0" class="payment-info-container">
        <p class="label">Pembayaran</p>
        <div class="payment-details">
          <div class="details-content">
            <body-2>Total Pembayaran</body-2>
            <subtitle-1>Rp {{ total.toLocaleString('id-ID') }}</subtitle-1>
          </div>
          <hr />
          <p class="label label-2">Rincian Pembayaran</p>
          <div class="details-content">
            <body-3>{{ `Total Penjualan Periode ${$route.params.periodeid}` }}</body-3>
            <body-3>Rp {{ totalSales.toLocaleString('id-ID') }}</body-3>
          </div>
          <div class="details-content">
            <body-3>Presentase Bagi Hasil</body-3>
            <body-3>{{ campaign.margin_value }}%</body-3>
          </div>
          <div class="details-content">
            <body-3>Bagi Hasil</body-3>
            <body-3>Rp {{ profitSharing.toLocaleString('id-ID') }}</body-3>
          </div>
          <div class="details-content">
            <body-3>Cicilan Tiap Bulan</body-3>
            <body-3>Rp {{ monthlyInstallments.toLocaleString('id-ID') }}</body-3>
          </div>
          <div class="details-content">
            <body-3>Total Pembayaran</body-3>
            <body-3>Rp {{ total.toLocaleString('id-ID') }}</body-3>
          </div>
        </div>
        <p class="label">Metode Pembayaran</p>
        <div class="payment-methods">
          <div class="payment-methods-label">
            <bank-images :id="paymentMethodExist ? paymentMethod.id : -1" />
            <body-2>{{ paymentMethodExist ? paymentMethod.name : 'Pilih metode pembayaran' }}</body-2>
          </div>
          <y-btn
            :variant="paymentMethodExist ? 'secondary' : 'primary'"
            :label="paymentMethodExist ? 'Ubah' : 'Pilih'"
            @click.native="activeModalBank = true"
          ></y-btn>
        </div>
        <div class="btn-wrapper">
          <y-btn label="Bayar" size="large" :disabled="!paymentMethodExist"></y-btn>
        </div>
      </div>

      <div v-if="activeSection === 1" class="payment-info-container">
        <subtitle-1>Informasi Pembayaran</subtitle-1>
        <hr />
        <div class="invoice">
          <div class="details-content">
            <body-3>No. Invoice</body-3>
            <body-3>983948923849</body-3>
          </div>
          <div class="details-content">
            <body-3>Tanggal</body-3>
            <body-3>06 Apr 2020 - 19:00</body-3>
          </div>
          <div class="details-content">
            <body-3>Status Transaksi</body-3>
            <status-badge variant="warning" status-value="Menunggu Pembayaran" />
          </div>
          <hr class="dotted-line" />
          <div class="details-content more-margin">
            <body-3>Batas Waktu Pembayaran</body-3>
            <div class="transaction-status">
              <subtitle-2>23 Jam : 59 Menit : 25 Detik</subtitle-2>
              <body-3>(Jumat, 07 Apr 2020 - 19:00 )</body-3>
            </div>
          </div>
          <div class="details-content more-margin">
            <body-3>Tujuan Pembayaran</body-3>
            <div class="transaction-status">
              <body-3>Bank BNI Syariah</body-3>
              <body-3>A/n PT Yukbisnis Indonesia</body-3>
              <div class="copiable-label">
                <subtitle-1>1218 8271 268</subtitle-1>
                <y-btn size="small" variant="secondary" label="Salin"></y-btn>
              </div>
            </div>
          </div>
          <div class="details-content">
            <body-3>Total Pembayaran</body-3>
            <div class="copiable-label">
              <subtitle-1>Rp. 5.166.234</subtitle-1>
              <y-btn size="small" variant="secondary" label="Salin"></y-btn>
            </div>
          </div>
          <body-3 class="warning-label"
            >Mohon lakukan pembayaran sesuai jumlah yang tertera (termasuk 3 digit terakhir) dan kirim bukti pembayaran
            pada konfirmasi pembayaran.</body-3
          >
          <hr class="dotted-line" />
          <vs-collapse>
            <vs-collapse-item>
              <body-3 slot="header" class="collapse-title"> Detail Transaksi </body-3>
              <div class="details-content">
                <body-3>Metode Pembayaran</body-3>
                <body-3>Transfer Bank</body-3>
              </div>
              <div class="details-content">
                <body-3>Tujuan Bank</body-3>
                <body-3>Bank BNI Syariah</body-3>
              </div>
              <div class="details-content">
                <body-3>Pemilik Rekening</body-3>
                <body-3>PT. Yukbisnis Indonesia</body-3>
              </div>
              <div class="details-content">
                <body-3>Nomor Rekening</body-3>
                <body-3>1233 4567 54334</body-3>
              </div>
              <div class="details-content">
                <body-3>Bagi Hasil</body-3>
                <body-3>Rp 1.000.000</body-3>
              </div>
              <div class="details-content">
                <body-3>Cicilan Tiap Bulan</body-3>
                <body-3>Rp 4.166.666</body-3>
              </div>
              <div class="details-content">
                <body-3>Kode Unik</body-3>
                <body-3>Rp 234</body-3>
              </div>
              <div class="details-content">
                <body-3>Total Pembayaran</body-3>
                <body-3>Rp 5.166.234</body-3>
              </div>
            </vs-collapse-item>
          </vs-collapse>
        </div>
      </div>
    </div>
    <modal-bank v-model="paymentMethod" :active-modal.sync="activeModalBank"></modal-bank>
  </div>
</template>

<script>
export default {
  layout: 'cms',
  async fetch() {
    try {
      const campaignDetailRes = await this.$repositories.campaign.showById(this.$route.params.campaignid)
      this.campaign = campaignDetailRes.data.response.results[0]
    } catch (err) {
      throw new Error(err)
    }
  },
  data() {
    return {
      activeSection: 0,
      activeModalBank: false,
      campaign: {},
      totalSales: 10000000,
      paymentMethod: {}
    }
  },

  computed: {
    monthlyInstallments() {
      return this.campaign.plafon_value / this.campaign.tenor_value
    },
    profitSharing() {
      return (this.totalSales * this.campaign.margin_value) / 100
    },
    total() {
      return this.profitSharing + this.monthlyInstallments
    },
    paymentMethodExist() {
      return Object.keys(this.paymentMethod).length
    }
  }
}
</script>

<style scoped>
.payment-info-container {
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
}

.sticky {
  margin-bottom: 24px;
}

.label {
  color: #847f82;
  font-weight: bold;
}

.transaction-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.warning-label {
  max-width: 50%;
}

.con-content--item {
  padding: 0;
}

.transaction-status .body3,
.transaction-status .subtitle2 {
  color: #d30000;
}

.label-2 {
  margin-bottom: 3px;
}

.payment-details {
  margin-top: 8px;
  margin-bottom: 17px;
  border: 1px solid #ebeaea;
  background-color: #fafbfc;
  padding: 16px;
  border-radius: 8px;
}

.vs-collapse {
  padding: 0;
}

.invoice .vs-collapse .details-content .body3 {
  color: #847f82;
}

.collapse-title {
  color: #00171f;
}

.details-content {
  display: flex;
  justify-content: space-between;
}

.invoice .details-content .body3 {
  color: #00171f;
}

.copiable-label {
  display: flex;
}

.copiable-label .subtitle1 {
  margin-right: 9px;
}

.invoice .details-content.more-margin {
  margin-bottom: 16px;
}

.details-content .body2 {
  margin-top: 4px;
  color: #00171f;
}

.details-content .subtitle1 {
  color: #00a1e4;
}

hr {
  margin-top: 16px;
  margin-bottom: 9px;
  border: 1px solid #ebeaea;
}

hr.dotted-line {
  margin-top: 14px;
  margin-bottom: 16px;
  border: 1px dashed #d6d4d5;
}

.invoice .details-content {
  margin-bottom: 4px;
}

.payment-methods,
.payment-methods-label {
  display: flex;
  align-items: center;
}

.payment-methods-label .body2 {
  margin-left: 8px;
}

.payment-methods {
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ebeaea;
  background-color: #fafbfc;
  justify-content: space-between;
}

.btn-wrapper {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 768px) {
  .btn-wrapper {
    margin-top: auto;
  }

  .btn-wrapper .vs-button {
    width: 100%;
  }

  .payment-info-container {
    height: calc(100vh - 74px - 64px);
    overflow: auto;
  }
}

@media screen and (max-width: 568px) {
  .btn-wrapper .vs-button {
    width: 100%;
  }

  .sticky {
    margin-bottom: 0;
  }

  .container {
    padding: 0;
  }
}

@media screen and (max-width: 424px) {
  .btn-wrapper .vs-button {
    width: 100%;
  }

  .payment-methods {
    flex-direction: column;
  }

  .payment-methods .vs-button {
    margin-top: 8px;
    width: 100%;
  }
}

@media screen and (max-width: 360px) {
  .details-content {
    flex-direction: column;
  }
}
</style>
