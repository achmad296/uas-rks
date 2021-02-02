<template>
  <modal :active-modal.sync="activeModalChangeProfilePicture" title="Ubah foto profil">
    <template v-slot:body>
      <div class="modal-change-profile-picture">
        <form @submit.prevent="handleSubmit">
          <Upload
            single-upload
            text="Pilih atau letakkan disini"
            desc-input="Ekstensi File : JPG, JPEG, PNG 
            Maksimal Ukuran : 10 Mb"
            :files.sync="profilePicture"
            file-type="images"
          />
          <y-btn size="large-full" label="Simpan" type="submit" class="mt-24" />
        </form>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  props: {
    activeModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      profilePicture: [],
      activeModalChangeProfilePicture: false
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalChangeProfilePicture = val
    },
    activeModalChangeProfilePicture(val) {
      this.$emit('update:activeModal', val)
    }
  },
  methods: {
    handleSubmit() {
      this.$vs.loading()
      const formData = new FormData()
      formData.append('file', this.profilePicture[0])

      this.$repositories.account
        .uploadAccountAvatar(this.$store.getters['user/getUserAccount'].id, formData)
        .then((_) => {
          this.$vs.loading.close()
          window.location.replace('/peminjam/account/setting/account')
        })
        .catch((err) => {
          this.$vs.loading.close()
          throw new Error(err)
        })
    }
  }
}
</script>

<style scoped></style>
