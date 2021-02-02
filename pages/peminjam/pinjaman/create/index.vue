<template>
  <div v-if="activeSection === 0" class="create-loan">
    <Headerbar title="Buat Pinjaman" back-to="/peminjam/pinjaman" style="margin-bottom: 24px" />
    <div class="container">
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div class="form-section1">
            <loan-form-card
              section="1. Informasi Pinjaman"
              caption="Lengkapi informasi pinjamanmu untuk menarik minat pendana."
              class="loan-info-form"
            >
              <ValidationProvider v-slot="{ classes, errors }" rules="required">
                <basic-input
                  id="campaign-title"
                  v-model="title"
                  label="Judul Campaign"
                  :classes="classes"
                  :caption="errors[0]"
                  placeholder="Masukkan Judul Campaign"
                  style="margin-bottom: 16px"
                />
              </ValidationProvider>
              <p
                style="
                  font-family: Lato;
                  font-style: normal;
                  font-weight: bold;
                  font-size: 14px;
                  line-height: 150%;
                  color: #847f82;
                "
              >
                Deskripsi Campaign
              </p>
              <editor @change="onDescriptionChange" />
            </loan-form-card>
            <loan-form-card
              section="2. Skema Pinjaman"
              caption="Lengkapi data skema pinjaman yang kamu inginkan."
              class="loan-scheme-form"
            >
              <ValidationProvider ref="dateInput" v-slot="{ classes, errors }" rules="required">
                <y-date-picker
                  v-model="dateEndCampaign"
                  style="margin-bottom: 18px"
                  :classes="classes"
                  :caption="errors[0]"
                  @date-picker-opened="onDatePickerOpened"
                  @date-selected="onDateSelected"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ classes, errors }"
                rules="required|positive|min_money:100000|max_money:500000000"
              >
                <basic-input
                  id="plafon"
                  v-model="plafonFormatted"
                  label="Plafon"
                  :classes="classes"
                  :caption="errors[0]"
                  placeholder="0"
                  prepend="Rp"
                  tooltip-text="Target atau besarnya pinjaman yang kamu ajukan."
                  is-money
                />
              </ValidationProvider>
              <ValidationProvider v-slot="{ classes, errors }" rules="required|positive|min_month:1">
                <basic-input
                  id="tenor"
                  v-model="tenorValue"
                  style="margin-top: 16px"
                  label="Tenor"
                  :classes="classes"
                  :caption="errors[0]"
                  placeholder="0"
                  append="Bulan"
                  type="number"
                  tooltip-text="Jangka waktu pelunasan pinjaman."
                />
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ classes, errors }"
                rules="required|positive|min_percentage:3|max_percentage:100"
              >
                <basic-input
                  id="margin-value"
                  v-model="marginValue"
                  style="margin-top: 16px"
                  label="Potensi Bagi Hasil"
                  :classes="classes"
                  :caption="errors[0]"
                  placeholder="0"
                  append="%"
                  type="number"
                  tooltip-text="Bagi hasil yang didapat setiap penjualan."
                />
              </ValidationProvider>

              <label class="radio-label" style="margin-top: 16px; display: flex; align-items: center">
                Skema Pembayaran
                <i
                  id="info"
                  v-tooltip.top-start="'Jangka waktu penyetoran bagi hasil.'"
                  class="material-icons"
                  style="color: #00a1e4; padding: 0; margin-left: 4px; font-size: 16px"
                >
                  info
                </i>
              </label>
              <div class="radio-group">
                <input
                  id="installment"
                  v-model="isInstallment"
                  name="isInstallment"
                  type="radio"
                  :value="true"
                  class="body3"
                />
                <label for="installment" style="margin-right: 26px">Bayar Tiap Bulan</label>
                <input
                  id="not-installment"
                  v-model="isInstallment"
                  name="isInstallment"
                  type="radio"
                  :value="false"
                  class="body3"
                />
                <label for="not-installment">Bayar Akhir Campaign</label>
              </div>
              <div v-if="isInstallment" class="hint-wrapper">
                <body-3>Cicilan Tiap Bulan =</body-3>
                <body-3>Rp {{ hintValue.toLocaleString('id-ID') }} + Bagi Hasil</body-3>
              </div>
            </loan-form-card>
          </div>
          <loan-form-card
            section="3. Laporan Penjualan"
            caption="Laporkan penjualan di bisnismu dalam kurun waktu 6 bulan terakhir untuk kami tinjau. "
            style="margin-top: 24px"
          >
            <ValidationProvider v-slot="{ classes, errors }" rules="required|positive">
              <basic-input
                id="revenue"
                v-model="revenueFormatted"
                label="Total Omzet 6 bulan terakhir"
                :classes="classes"
                :caption="errors[0]"
                placeholder="0"
                prepend="Rp"
                tooltip-text="Nilai total dari penjualan produk dalam kurun waktu 6 bulan terakhir."
                is-money
              />
            </ValidationProvider>
            <label class="mt-16" for="sales-report"
              >Unggah laporan 6 bulan terakhir.
              <span style="font-weight: normal; color: #847f82">Lihat contoh berikut:</span>
              <a style="color: #3c91e6">Contoh Laporan Penjualan.</a></label
            >
            <Upload
              id="sales-report"
              single-upload
              automatic
              text="Pilih atau letakan file disini."
              desc-input="Ekstensi File Excel : XLSX"
              :files.sync="salesReport"
              file-type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
            <p v-if="!revenueExist" class="upload-error-caption">Harus diisi</p>
          </loan-form-card>
          <div class="btn-wrapper">
            <y-btn size="large" label="Ajukan Pinjaman" type="submit"></y-btn>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
  <div v-else class="success-submit-container">
    <img src="~assets/images/pinjaman/success-submit-loan.png" alt="Berhasil Submit Campaign" />
    <subtitle-1 style="margin-bottom: 7px">Pinjamanmu dalam proses peninjauan...</subtitle-1>
    <p class="body3">Mohon menunggu 2x24jam tim Yubibursa sedang meninjau aplikasimu.</p>
    <y-btn style="margin: 16px auto 0 auto" variant="secondary" label="Kembali" @click.native="back"></y-btn>
  </div>
</template>

<script>
import { parse } from 'vue-currency-input'
import { currencyOptions } from '../../../../utils/currencyOptions'
export default {
  layout: 'cms',
  data() {
    return {
      activeSection: 0,
      title: '',
      description: '',
      plafonFormatted: '',
      plafonValue: null,
      tenorValue: null,
      marginValue: null,
      revenueFormatted: null,
      revenue: null,
      isInstallment: true,
      salesReport: [],
      dateEndCampaign: null,
      revenueExist: true
    }
  },
  computed: {
    hintValue() {
      return !this.plafonValue || !this.tenorValue || this.plafonValue === 0 || this.tenorValue === 0
        ? 0
        : Number((this.plafonValue / this.tenorValue).toFixed(0))
    }
  },
  watch: {
    plafonFormatted(val) {
      this.plafonValue = parse(val, currencyOptions)
    },
    revenueFormatted(val) {
      this.revenue = parse(val, currencyOptions)
    }
  },
  methods: {
    onDatePickerOpened() {
      this.$refs.dateInput.validate()
    },
    onDateSelected(date) {
      this.dateEndCampaign = date
    },
    back() {
      window.location.replace('/peminjam/pinjaman')
    },
    onSubmit() {
      if (!this.salesReport.length) {
        this.revenueExist = false
        this.$vs.notify({
          title: 'Gagal!',
          text: 'Harap masukkan laporan 6 bulan terakhir',
          color: '#DD403A',
          position: 'top-center'
        })
      } else {
        this.$vs.loading()
        this.revenueExist = true
        const formData = new FormData()
        formData.append('file', this.salesReport[0])

        this.$repositories.campaign
          .create(this.$store.getters['user/getUserBusinessId'], {
            title: this.title,
            description: this.description,
            plafon_value: parseInt(this.plafonValue),
            tenor_value: parseInt(this.tenorValue),
            margin_value: parseInt(this.marginValue),
            revenue: parseInt(this.revenue),
            is_installment: this.isInstallment,
            used_time: this.dateEndCampaign
          })
          .then((res) => {
            this.$repositories.campaign
              .uploadCampaignRevenue(res.data.response.results[0].id, formData)
              .then((_) => {
                this.$vs.loading.close()
                this.activeSection++
              })
              .catch((err) => {
                this.$vs.loading.close()
                this.activeSection++
                throw new Error(err)
              })
          })
          .catch((err) => {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Gagal!',
              text: err.response.data.response.message,
              color: '#DD403A',
              position: 'top-center'
            })
          })
      }
    },
    onDescriptionChange(val) {
      this.description = val
    }
  }
}
</script>

<style scoped>
.container {
  padding-bottom: 24px;
}

.form-section1 {
  display: flex;
  justify-content: space-between;
}

.loan-info-form {
  margin-right: 13px;
  width: 100%;
}

.loan-scheme-form {
  margin-left: 13px;
}

.editr--toolbar {
  overflow-x: auto;
}

.radio-label {
  font-family: 'Lato';
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
  color: #847f82;
}

.radio-group {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.radio-group label {
  margin-bottom: 0;
  margin-left: 8px;
}

.radio-group input[type='radio'] {
  background-color: #3c91e6;
}

.radio-group input[type='radio']:checked + label {
  color: #3c91e6;
}

.hint-wrapper {
  padding: 16px;
  background-color: #ebf4fc;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
}

.hint-wrapper .body3 {
  color: #3c91e6;
}

.btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
}

.success-submit-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.success-submit-container img {
  width: 180px;
  margin-bottom: 18px;
}

.upload-error-caption {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  color: #dd403a;
}

@media only screen and (max-width: 991px) {
  .form-section1 {
    flex-direction: column;
    align-items: center;
  }

  .loan-info-form {
    margin-right: 0;
  }

  .loan-scheme-form {
    margin-left: 0;
    margin-top: 24px;
  }
}

@media only screen and (max-width: 577px) {
  .container,
  .container-fluid,
  .container-sm,
  .container-md,
  .container-lg,
  .container-x {
    padding: 0;
  }
}
</style>
