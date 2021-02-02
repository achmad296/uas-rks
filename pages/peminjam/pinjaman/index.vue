<template>
  <div id="pinjaman" class="loan">
    <Headerbar title="Pinjaman">
      <nuxt-link to="/peminjam/pinjaman/create">
        <y-btn label="Buat Pinjaman" />
      </nuxt-link>
    </Headerbar>
    <div class="container">
      <Tabs is-search @change="onTabChange" @search-value-handler="onSearchValueChange">
        <div v-if="currentTab === 0 && filteredCampaigns.length" class="showing-status">
          Terdapat {{ filteredCampaigns.length }} pengajuan pinjaman.
        </div>
        <div v-else-if="currentTab === 1 && getFilteredCampaignLength('REVIEW')" class="showing-status">
          Terdapat {{ getFilteredCampaignLength('REVIEW') }} pengajuan pinjaman.
        </div>
        <div v-else-if="currentTab === 2 && getFilteredCampaignLength('FUNDING')" class="showing-status">
          Terdapat {{ getFilteredCampaignLength('FUNDING') }} pengajuan pinjaman.
        </div>
        <div v-else-if="currentTab === 3 && getFilteredCampaignLength('COLLECTED')" class="showing-status">
          Terdapat {{ getFilteredCampaignLength('COLLECTED') }} pengajuan pinjaman.
        </div>
        <div v-else-if="currentTab === 4 && getFilteredCampaignLength('ON_PROGRESS')" class="showing-status">
          Terdapat {{ getFilteredCampaignLength('ON_PROGRESS') }} pengajuan pinjaman.
        </div>
        <div v-else-if="currentTab === 5 && getFilteredCampaignLength('FINISH')" class="showing-status">
          Terdapat {{ getFilteredCampaignLength('FINISH') }} pengajuan pinjaman.
        </div>
        <div v-else-if="currentTab === 6 && getFilteredCampaignLength('CANCEL')" class="showing-status">
          Terdapat {{ getFilteredCampaignLength('CANCEL') }} pengajuan pinjaman.
        </div>
        <Tab title="Semua">
          <div v-if="filteredCampaigns.length" class="grid-container">
            <loan-card
              v-for="item in filteredCampaigns"
              :key="item.id"
              :business-id="item.business_id"
              :title="item.title"
              :total-collected="item.balance"
              :plafon-value="item.plafon_value"
              :tenor-value="item.tenor_value"
              :date-created="new Date(item.rec_time_create)"
              :status="item.status"
            ></loan-card>
          </div>
          <div v-else-if="!campaigns.length" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Belum ada pinjaman yang diajukan.</subtitle-1>
            <p class="body3">Ayo mulai buat pinjaman pertamamu sekarang!</p>
            <nuxt-link to="/peminjam/pinjaman/create">
              <y-btn label="Buat Pinjaman" style="margin-top: 16px"></y-btn>
            </nuxt-link>
          </div>
          <div v-else class="loan-not-found">
            <img src="~/assets/images/pinjaman/keyword-not-found.svg" alt="loan not found" />
            <subtitle-1>Pinjaman tidak ditemukan.</subtitle-1>
            <p class="body3">Coba kata kunci nama pinjaman lain.</p>
          </div>
        </Tab>
        <Tab title="Peninjauan">
          <div v-if="getFilteredCampaignLength('REVIEW')" class="grid-container">
            <loan-card
              v-for="item in filteredCampaigns.filter((campaign) => campaign.status === 'REVIEW')"
              :key="item.id"
              :business-id="item.business_id"
              :title="item.title"
              :total-collected="item.balance"
              :plafon-value="item.plafon_value"
              :tenor-value="item.tenor_value"
              :date-created="new Date(item.rec_time_create)"
              :status="item.status"
            ></loan-card>
          </div>

          <div v-else-if="!campaigns.length" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Belum ada pinjaman yang diajukan.</subtitle-1>
            <p class="body3">Ayo mulai buat pinjaman pertamamu sekarang!</p>
            <nuxt-link to="/peminjam/pinjaman/create">
              <y-btn label="Buat Pinjaman" style="margin-top: 16px"></y-btn>
            </nuxt-link>
          </div>
          <div v-else-if="!getCampaignLength('REVIEW')" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Tidak ada pinjaman disini.</subtitle-1>
          </div>
          <div v-else class="loan-not-found">
            <img src="~/assets/images/pinjaman/keyword-not-found.svg" alt="loan not found" />
            <subtitle-1>Pinjaman tidak ditemukan.</subtitle-1>
            <p class="body3">Coba kata kunci nama pinjaman lain.</p>
          </div>
        </Tab>
        <Tab title="Pendanaan">
          <div v-if="getFilteredCampaignLength('FUNDING')" class="grid-container">
            <loan-card
              v-for="item in filteredCampaigns.filter((campaign) => campaign.status === 'FUNDING')"
              :key="item.id"
              :business-id="item.business_id"
              :title="item.title"
              :total-collected="item.balance"
              :plafon-value="item.plafon_value"
              :tenor-value="item.tenor_value"
              :date-created="new Date(item.rec_time_create)"
              :status="item.status"
            ></loan-card>
          </div>
          <div v-else-if="!campaigns.length" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Belum ada pinjaman yang diajukan.</subtitle-1>
            <p class="body3">Ayo mulai buat pinjaman pertamamu sekarang!</p>
            <nuxt-link to="/peminjam/pinjaman/create">
              <y-btn label="Buat Pinjaman" style="margin-top: 16px"></y-btn>
            </nuxt-link>
          </div>
          <div v-else-if="!getCampaignLength('FUNDING')" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Tidak ada pinjaman disini.</subtitle-1>
          </div>
          <div v-else class="loan-not-found">
            <img src="~/assets/images/pinjaman/keyword-not-found.svg" alt="loan not found" />
            <subtitle-1>Pinjaman tidak ditemukan.</subtitle-1>
            <p class="body3">Coba kata kunci nama pinjaman lain.</p>
          </div>
        </Tab>
        <Tab title="Terkumpul">
          <div v-if="getFilteredCampaignLength('COLLECTED')" class="grid-container">
            <loan-card
              v-for="item in filteredCampaigns.filter((campaign) => campaign.status === 'COLLECTED')"
              :key="item.id"
              :business-id="item.business_id"
              :title="item.title"
              :total-collected="item.balance"
              :plafon-value="item.plafon_value"
              :tenor-value="item.tenor_value"
              :date-created="new Date(item.rec_time_create)"
              :status="item.status"
            ></loan-card>
          </div>
          <div v-else-if="!campaigns.length" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Belum ada pinjaman yang diajukan.</subtitle-1>
            <p class="body3">Ayo mulai buat pinjaman pertamamu sekarang!</p>
            <nuxt-link to="/peminjam/pinjaman/create">
              <y-btn label="Buat Pinjaman" style="margin-top: 16px"></y-btn>
            </nuxt-link>
          </div>
          <div v-else-if="!getCampaignLength('COLLECTED')" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Tidak ada pinjaman disini.</subtitle-1>
          </div>
          <div v-else class="loan-not-found">
            <img src="~/assets/images/pinjaman/keyword-not-found.svg" alt="loan not found" />
            <subtitle-1>Pinjaman tidak ditemukan.</subtitle-1>
            <p class="body3">Coba kata kunci nama pinjaman lain.</p>
          </div>
        </Tab>
        <Tab title="Berjalan">
          <div v-if="getFilteredCampaignLength('ON_PROGRESS')" class="grid-container">
            <loan-card
              v-for="item in filteredCampaigns.filter((campaign) => campaign.status === 'ON_PROGRESS')"
              :key="item.id"
              :business-id="item.business_id"
              :title="item.title"
              :total-collected="item.balance"
              :plafon-value="item.plafon_value"
              :tenor-value="item.tenor_value"
              :date-created="new Date(item.rec_time_create)"
              :status="item.status"
            ></loan-card>
          </div>
          <div v-else-if="!campaigns.length" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Belum ada pinjaman yang diajukan.</subtitle-1>
            <p class="body3">Ayo mulai buat pinjaman pertamamu sekarang!</p>
            <nuxt-link to="/peminjam/pinjaman/create">
              <y-btn label="Buat Pinjaman" style="margin-top: 16px"></y-btn>
            </nuxt-link>
          </div>
          <div v-else-if="!getCampaignLength('ON_PROGRESS')" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Tidak ada pinjaman disini.</subtitle-1>
          </div>
          <div v-else class="loan-not-found">
            <img src="~/assets/images/pinjaman/keyword-not-found.svg" alt="loan not found" />
            <subtitle-1>Pinjaman tidak ditemukan.</subtitle-1>
            <p class="body3">Coba kata kunci nama pinjaman lain.</p>
          </div>
        </Tab>
        <Tab title="Selesai">
          <div v-if="getFilteredCampaignLength('FINISH')" class="grid-container">
            <loan-card
              v-for="item in filteredCampaigns.filter((campaign) => campaign.status === 'FINISH')"
              :key="item.id"
              :business-id="item.business_id"
              :title="item.title"
              :total-collected="item.balance"
              :plafon-value="item.plafon_value"
              :tenor-value="item.tenor_value"
              :date-created="new Date(item.rec_time_create)"
              :status="item.status"
            ></loan-card>
          </div>
          <div v-else-if="!campaigns.length" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Belum ada pinjaman yang diajukan.</subtitle-1>
            <p class="body3">Ayo mulai buat pinjaman pertamamu sekarang!</p>
            <nuxt-link to="/peminjam/pinjaman/create">
              <y-btn label="Buat Pinjaman" style="margin-top: 16px"></y-btn>
            </nuxt-link>
          </div>
          <div v-else-if="!getCampaignLength('FINISH')" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Tidak ada pinjaman disini.</subtitle-1>
          </div>
          <div v-else class="loan-not-found">
            <img src="~/assets/images/pinjaman/keyword-not-found.svg" alt="loan not found" />
            <subtitle-1>Pinjaman tidak ditemukan.</subtitle-1>
            <p class="body3">Coba kata kunci nama pinjaman lain.</p>
          </div>
        </Tab>
        <Tab title="Dibatalkan">
          <div v-if="getFilteredCampaignLength('CANCEL')" class="grid-container">
            <loan-card
              v-for="item in filteredCampaigns.filter((campaign) => campaign.status === 'CANCEL')"
              :id="item.id"
              :key="item.id"
              :business-id="item.business_id"
              :title="item.title"
              :total-collected="item.balance"
              :plafon-value="item.plafon_value"
              :tenor-value="item.tenor_value"
              :date-created="new Date(item.rec_time_create)"
              :status="item.status"
            ></loan-card>
          </div>
          <div v-else-if="!campaigns.length" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Belum ada pinjaman yang diajukan.</subtitle-1>
            <p class="body3">Ayo mulai buat pinjaman pertamamu sekarang!</p>
            <nuxt-link to="/peminjam/pinjaman/create">
              <y-btn label="Buat Pinjaman" style="margin-top: 16px"></y-btn>
            </nuxt-link>
          </div>
          <div v-else-if="!getCampaignLength('CANCEL')" class="loan-not-found">
            <img src="~/assets/images/pinjaman/loan-not-found.png" alt="loan not found" style="width: 180px" />
            <subtitle-1>Tidak ada pinjaman disini.</subtitle-1>
          </div>
          <div v-else class="loan-not-found">
            <img src="~/assets/images/pinjaman/keyword-not-found.svg" alt="loan not found" />
            <subtitle-1>Pinjaman tidak ditemukan.</subtitle-1>
            <p class="body3">Coba kata kunci nama pinjaman lain.</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'cms',
  async fetch() {
    try {
      const campaignRes = await this.$repositories.campaign.getFromBusinessId(
        this.$store.getters['user/getUserBusinessId']
      )
      this.campaigns = campaignRes.data.response.results
    } catch (err) {
      throw new Error(err)
    }
  },
  data() {
    return {
      searchValue: '',
      currentTab: 0,
      campaigns: []
    }
  },
  computed: {
    filteredCampaigns() {
      return this.campaigns.filter((campaign) => {
        return campaign.title.toLowerCase().includes(this.searchValue.toLowerCase())
      })
    }
  },
  methods: {
    onTabChange(value) {
      this.currentTab = value
    },
    onSearchValueChange(value) {
      this.searchValue = value
    },
    getFilteredCampaignLength(type) {
      return this.filteredCampaigns.filter((campaign) => campaign.status === type).length
    },
    getCampaignLength(type) {
      return this.campaigns.filter((campaign) => campaign.status === type).length
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
}

.container {
  margin-top: 24px;
}

.loan {
  width: 100%;
}

.loan-card {
  margin: auto;
}

.showing-status {
  margin: 24px 0;
  text-align: center;
  font-family: 'Lato';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: #847f82;
}

.tab {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.loan-not-found {
  margin-top: 80px;
  text-align: center;
}

.loan-not-found img {
  width: 100%;
  margin-bottom: 16px;
}

.loan-not-found .subtitle1 {
  margin-bottom: 4px;
}

@media screen and (max-width: 575px) {
  .container {
    margin: 0;
    padding: 0;
  }

  .tab {
    padding: 0px 16px;
  }
}

@media screen and (max-width: 315px) {
  .tab {
    padding: 0px;
  }
}
</style>
