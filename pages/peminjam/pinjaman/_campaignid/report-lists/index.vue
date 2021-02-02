<template>
  <div class="report-lists">
    <Headerbar
      title="Laporan Penjualan"
      :back-to="`/peminjam/pinjaman/${$route.params.campaignid}`"
      style="margin-bottom: 24px"
    />
    <div class="container">
      <div class="report-lists-container">
        <basic-input
          id="search"
          v-model="searchValue"
          placeholder="Cari Periode"
          icon-prepend="search"
          transparent-prepend
          class="search-field"
        />

        <sales-report-list v-for="(item, idx) in filteredCampaignReports" :key="idx" :campaign-report="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'cms',
  async fetch() {
    try {
      const campaignReportsRes = await this.$repositories.campaign.getCampaignReport(this.$route.params.campaignid)
      campaignReportsRes.data.response.results.sort((a, b) => b.tenor_index - a.tenor_index)

      this.campaignReports = campaignReportsRes.data.response.results
    } catch (err) {
      throw new Error(err)
    }
  },

  data() {
    return {
      campaignReports: [],
      searchValue: ''
    }
  },

  computed: {
    filteredCampaignReports() {
      if (this.searchValue.length) {
        return this.campaignReports.filter((item) => {
          return item.tenor_index.toString().includes(this.searchValue)
        })
      } else {
        return this.campaignReports
      }
    }
  }
}
</script>

<style scoped>
.report-lists-container {
  background-color: #fff;
  padding: 16px;
  border-radius: 16px;
}

.sales-report-list {
  margin: 16px 0;
}

.container {
  padding-bottom: 24px;
}

@media only screen and (max-width: 578px) {
  .container {
    padding: 0;
  }
}
</style>
