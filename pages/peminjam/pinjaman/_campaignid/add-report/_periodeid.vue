<template>
  <div class="add-report">
    <Headerbar
      :title="(campaignReport.is_uploaded ? 'Edit ' : '') + `Laporan Penjualan - Periode ${$route.params.periodeid}`"
      :back-to="`/peminjam/pinjaman/${$route.params.campaignid}`"
      style="margin-bottom: 24px"
    />
    <div class="container">
      <div class="report-form-container">
        <body-2 class="title"
          >Laporkan penjualan {{ campaignTitle }} pada Periode {{ $route.params.periodeid }}.</body-2
        >
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider v-slot="{ classes, errors }" rules="required|positive">
              <basic-input
                id="revenue"
                v-model="revenueFormatted"
                label="Total Penjualan"
                :classes="classes"
                :caption="errors[0]"
                placeholder="0"
                prepend="Rp"
                tooltip-text="Nilai total dari penjualan produk dalam kurun waktu 6 bulan terakhir."
                is-money
              />
            </ValidationProvider>
            <label class="mt-16" for="sales-report"
              >Unggah Laporan Penjualan.
              <span style="font-weight: normal; color: #847f82">Lihat contoh berikut:</span>
              <a class="report-example-link">Contoh Laporan Penjualan.</a></label
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
            <p v-if="!salesReportExist" class="upload-error-caption">Harus diisi</p>
            <div class="btn-wrapper">
              <y-btn type="submit" size="large" label="Kirim" />
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { parse } from 'vue-currency-input'
import { currencyOptions } from '../../../../../utils/currencyOptions'
export default {
  layout: 'cms',
  async fetch() {
    try {
      const campaignDetailRes = await this.$repositories.campaign.showById(this.$route.params.campaignid)
      this.campaignId = campaignDetailRes.data.response.results[0].id
      this.campaignTitle = campaignDetailRes.data.response.results[0].title

      const campaignReportRes = await this.$repositories.campaign.getCampaignReportByTenorIndex(
        this.campaignId,
        this.$route.params.periodeid
      )

      this.campaignReport = campaignReportRes.data.response.results[0]

      if (this.campaignReport.length) {
        const balanceFormatted = parseFloat(this.campaignReport.balance)
        this.revenueFormatted = balanceFormatted.toString()
      }
    } catch (err) {
      throw new Error(err)
    }
  },
  data() {
    return {
      salesReportExist: true,
      campaignReport: {},
      campaignTitle: '',
      campaignId: null,
      revenueFormatted: null,
      revenue: null,
      salesReport: []
    }
  },
  watch: {
    revenueFormatted(val) {
      this.revenue = parse(val, currencyOptions)
    }
  },
  methods: {
    onSubmit() {
      if (!this.campaignReport.is_uploaded) {
        if (!this.salesReport.length) {
          return (this.salesReportExist = false)
        }
        this.$vs.loading()
        const formData = new FormData()
        formData.append('file', this.salesReport[0])
        Promise.all([
          this.$repositories.campaign.editCampaignReport(this.campaignId, this.campaignReport.tenor_index, {
            balance: this.revenue
          }),
          this.$repositories.campaign.editCampaignReportFile(this.campaignId, this.campaignReport.tenor_index, formData)
        ])
          .then((_) => {
            this.$vs.loading.close()
            this.$router.push(`/peminjam/pinjaman/${this.campaignId}/report-lists`)
          })
          .catch((err) => {
            this.$vs.loading.close()
            throw new Error(err)
          })
      }
    }
  }
}
</script>

<style scoped>
.report-form-container {
  padding: 16px;
  background-color: #fff;
}

.title {
  color: #00171f;
  margin-bottom: 16px;
}

.report-example-link {
  color: #3c91e6;
  cursor: pointer;
}

.report-example-link:hover {
  text-decoration: underline;
}

.btn-wrapper {
  margin-top: 23px;
  display: flex;
  justify-content: flex-end;
}

.upload-error-caption {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  color: #dd403a;
}
</style>
