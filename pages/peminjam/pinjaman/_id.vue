<template>
  <div class="loan-detail">
    <loan-detail-headbar
      v-if="campaignDetail.balance !== undefined"
      :campaign-detail="campaignDetail"
    ></loan-detail-headbar>
    <div class="container">
      <Tabs>
        <Tab title="Skema Pinjaman" class="tab-item loan-scheme">
          <loan-scheme-card
            v-for="(data, idx) in loanSchemeCardData"
            :key="idx"
            :title="data.title"
            :subtitle="data.subtitle"
            :image="data.image"
            :desc="data.desc"
          ></loan-scheme-card>
        </Tab>
        <Tab title="Deskripsi" class="tab-item description" v-html="campaignDetail.description" />
        <!-- Sementara di-hide -->
        <!-- <Tab v-if="!lender.length" title="Pendanaan" class="tab-item lender">
          <img src="~assets/images/pinjaman/funding-not-found.svg" style="margin-top: 18px" />
          <subtitle-1 style="margin-bottom: 18px">Belum ada pendanaan yang masuk.</subtitle-1>
        </Tab> -->

        <!-- <Tab v-else-if="lender.length" title="Pendanaan" class="tab-item lender">
          <profile-list></profile-list>
        </Tab> -->
      </Tabs>
      <div v-if="campaignDetail.status === 'ON_PROGRESS' || campaignDetail.status === 'FINISH'" class="report-section">
        <div class="sales-report-lists">
          <div class="title">
            <subtitle-1>Laporan Penjualan</subtitle-1>
          </div>
          <body-3>Laporkan penjualanmu setiap bulan sampai batas akhir tenor pinjaman.</body-3>
          <sales-report-list v-for="(item, idx) in campaignReport.slice(0, 3)" :key="idx" :campaign-report="item" />
          <nuxt-link :to="`/peminjam/pinjaman/${campaignDetail.id}/report-lists`" class="show-more-label">
            <caption-1>Lihat Semua ({{ campaignReport.length }})</caption-1>
          </nuxt-link>
        </div>
        <div class="payment-report-lists">
          <div class="title">
            <subtitle-1>Pembayaran Cicilan & Bagi Hasil</subtitle-1>
          </div>
          <body-3>Setorkan cicilan & bagi hasil setiap periode sesuai skema pembayaran pinjaman.</body-3>
          <payment-report-list
            v-for="(item, idx) in salesReportLists"
            :key="idx"
            :campaign-id="campaignDetail.id"
            :period="item.period"
            :upload-date="item.uploadDate"
            :is-ready-to-pay="campaignReport.filter((item) => item.tenor_index === idx + 1)[0].is_uploaded"
          >
          </payment-report-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'cms',
  async fetch() {
    try {
      const campaignDetailRes = await this.$repositories.campaign.showById(this.$route.params.id)

      const campaignReportRes = await this.$repositories.campaign.getCampaignReport(this.$route.params.id)
      campaignReportRes.data.response.results.sort((a, b) => b.tenor_index - a.tenor_index)

      this.campaignReport = campaignReportRes.data.response.results

      this.campaignDetail = campaignDetailRes.data.response.results[0]
      this.loanSchemeCardData[0].subtitle =
        'Rp. ' + campaignDetailRes.data.response.results[0].plafon_value.toLocaleString('id-ID')
      this.loanSchemeCardData[1].subtitle = campaignDetailRes.data.response.results[0].tenor_value.toString() + ' Bulan'
      this.loanSchemeCardData[2].subtitle = campaignDetailRes.data.response.results[0].margin_value.toString() + '%'
      campaignDetailRes.data.response.results[0].is_installment
        ? (this.loanSchemeCardData[3].subtitle = 'Setiap Bulan')
        : (this.loanSchemeCardData[3].subtitle = 'Di akhir campaign')
    } catch (err) {
      throw new Error(err)
    }
  },
  data() {
    return {
      campaignReport: [],
      campaignDetail: {},
      campaignReportNonReverse: [],
      loanDetail: {
        title: '',
        dateCreated: new Date(),
        description: ''
      },
      lender: [],
      loanSchemeCardData: [
        {
          image: require('~/assets/images/pinjaman/plafon-card-icon.svg'),
          title: 'Plafon',
          subtitle: '',
          desc: 'Target pinjaman yang harus dipenuhi.'
        },
        {
          image: require('~/assets/images/pinjaman/tenor-card-icon.svg'),
          title: 'Tenor',
          subtitle: '',
          desc: 'Jangka waktu pelunasan pinjaman.'
        },
        {
          image: require('~/assets/images/pinjaman/revenue-card-icon.svg'),
          title: 'Potensi Bagi Hasil',
          subtitle: '',
          desc: 'Bagi hasil yang didapat setiap penjualan.'
        },
        {
          image: require('~/assets/images/pinjaman/payment-scheme-card-icon.svg'),
          title: 'Skema Pembayaran',
          subtitle: '',
          desc: 'Jangka waktu penyetoran bagi hasil.'
        }
      ],
      salesReportLists: [
        {
          period: '1',
          uploadDate: '21 Oktober'
        },
        {
          period: '2',
          uploadDate: '21 November'
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 24px;
}

.loan-detail {
  padding-bottom: 24px;
}

.tab-item {
  border-radius: 0 0 16px 16px;
}

.container {
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 24px;
}

.description {
  padding: 17px;
}

.report-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
  margin-bottom: 24px;
}

.lender {
  padding: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-item.loan-scheme {
  padding: 34px 15px 16px 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  justify-content: space-evenly;
}

.loan-scheme-card {
  margin: auto;
}

.sales-report-lists,
.payment-report-lists {
  background: #fff;
  border-radius: 16px;
  padding: 0 16px 16px;
}

.sales-report-lists .title,
.payment-report-lists .title {
  display: flex;
  align-items: center;
  height: 56px;
  border-bottom: 0.7px solid #ebeaea;
}

.sales-report-list {
  margin: 16px 0;
  flex-grow: 1;
}

.show-more-label {
  display: flex;
  justify-content: center;
}

.show-more-label .caption1 {
  color: #d30000;
  cursor: pointer;
}

.payment-report-list {
  margin: 16px 0;
}

hr {
  margin-top: 16px;
  border: 0.7px solid #ebeaea;
}

@media only screen and (max-width: 578px) {
  .container {
    padding: 0;
    margin-top: 0;
  }

  .loan-detail {
    padding-bottom: 0;
  }
}
</style>
