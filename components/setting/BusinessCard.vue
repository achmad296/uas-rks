<template>
  <div class="business-card">
    <vs-avatar size="48px" :text="business.name" />
    <subtitle-2>{{ business.name }}</subtitle-2>
    <div class="icon-with-desc" style="margin: 6px 0 4px 0">
      <span class="material-icons"> location_on </span>
      <p class="body3">Lokasi bisnis belum diisi</p>
    </div>
    <div class="icon-with-desc">
      <span class="material-icons"> store </span>
      <p class="body3">Sektor bisnis belum diisi</p>
    </div>
    <status-badge variant="warning" status-value="Lengkapi Profil Bisnismu!" />
    <div class="card-button">
      <div class="button"><p class="body3">Hapus</p></div>
      <div class="button" @click="activeModalAddBusiness = true"><p class="body3">Lengkapi Profil</p></div>
    </div>
    <modal-add-business :active-modal.sync="activeModalAddBusiness" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      business: {
        name: 'Zanana Store'
      },
      activeModalAddBusiness: false
    }
  }
}
</script>

<style scoped>
.business-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 247px;
  padding-top: 16px;
  border-radius: 16px;
  border: 1px solid #ebeaea;
  margin: auto;
}

.icon-with-desc {
  display: flex;
  align-items: center;
}

.material-icons {
  color: #847f82;
  font-size: 16px;
  margin-right: 8px;
}

.status-badge {
  margin: 16px 0;
}

.card-button {
  display: flex;
  width: 100%;
}

.button {
  display: flex;
  justify-content: center;
  padding: 8px 0;
  border-top: 1px solid #ebeaea;
  flex: 1;
}

.button:nth-child(1) {
  border-radius: 0 0 0 16px;
}

.button:nth-child(2) {
  border-radius: 0 0 16px 0px;
}

.button:hover {
  cursor: pointer;
  background-color: rgb(214, 214, 214);
}

.card-button .button:nth-child(1) {
  border-right: 1px solid #ebeaea;
}

.button .body3 {
  color: #d30000;
}
</style>
