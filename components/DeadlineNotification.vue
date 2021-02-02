<template>
  <div class="deadline-notification" @click="$router.push(`/peminjam/pinjaman/${campaignId}/report-lists`)">
    <div class="category-wrapper">
      <caption-2>{{ category }}</caption-2>
    </div>
    <div class="content-wrapper">
      <body-3>{{
        category === 'LAPORAN'
          ? 'Laporkan penjualanmu pada pinjaman:'
          : 'Setor cicilan dan bagi hasilmu untuk pinjaman:'
      }}</body-3>
      <body-3>{{ campaignTitle }}</body-3>
      <div class="duedate-wrapper">
        <span class="material-icons"> date_range </span>
        <caption-1>Batas Akhir: {{ $moment(duedate).format('Do MMM yyyy - hh:mm') }}</caption-1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: ''
    },
    campaignId: {
      type: Number,
      default: -1
    },
    campaignTitle: {
      type: String,
      default: ''
    },
    duedate: {
      type: Date,
      default: new Date()
    }
  }
}
</script>

<style scoped>
.deadline-notification {
  border-radius: 16px;
  background-color: #fff;
  cursor: pointer;
}

.deadline-notification:hover {
  -webkit-transform: translateY(-3px);
  -moz-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  -o-transform: translateY(-3px);
  transform: translateY(-3px);
  box-shadow: 0px 14px 28px -14px rgba(0, 0, 0, 0.52);
  -webkit-box-shadow: 0px 14px 28px -14px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: 0px 14px 28px -14px rgba(0, 0, 0, 0.52);
}

.category-wrapper {
  background-color: #3c91e6;
  border-radius: 16px 20px 20px 0px;
  padding: 4px 8px;
  width: max-content;
}
.category-wrapper p {
  color: #fff;
}

.content-wrapper .body3 {
  color: #00171f;
}

.content-wrapper {
  padding: 16px;
}

.duedate-wrapper {
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.duedate-wrapper .caption1,
.duedate-wrapper .material-icons {
  color: #dd403a;
}

.duedate-wrapper .material-icons {
  margin-right: 10px;
}
</style>
