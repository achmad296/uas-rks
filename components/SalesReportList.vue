<template>
  <div class="sales-report-list">
    <div class="content">
      <div class="desc">
        <subtitle-2>Laporan Penjualan - Periode {{ campaignReport.tenor_index }}</subtitle-2>
        <div v-if="campaignReport.is_uploaded" class="caption-2">
          Telah Diposting: {{ $moment(campaignReport.uploaded_time).format('Do MMM yyyy - hh:mm') }}
        </div>
        <div v-else class="caption-2 duedate">
          Batas Akhir: {{ $moment(campaignReport.duedate).format('Do MMM yyyy - hh:mm') }}
        </div>
      </div>
      <nuxt-link
        v-if="!campaignReport.is_uploaded"
        :to="`/peminjam/pinjaman/${campaignReport.campaign_id}/add-report/${campaignReport.tenor_index}`"
      >
        <y-btn label="Isi Laporan" class="report-btn" />
      </nuxt-link>
      <nuxt-link
        v-else
        :to="`/peminjam/pinjaman/${campaignReport.campaign_id}/add-report/${campaignReport.tenor_index}`"
      >
        <img src="~assets/icons/edit.svg" alt="edit report" />
      </nuxt-link>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    campaignReport: {
      type: Object,
      default: () => ({})
    }
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

.caption-2.duedate {
  color: #dd403a;
}

.edit-icon-profile {
  cursor: pointer;
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
