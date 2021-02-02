<template>
  <modal :active-modal.sync="activeModalChangeId" :title="`Ubah ${type}`">
    <template v-slot:body>
      <div class="modal-change-profile-picture">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form class="input-container" @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider v-slot="{ classes, errors }" vid="email" rules="required|numeric|idCard">
              <basic-input
                id="idNumber"
                v-model="idNumber"
                :label="`Nomor ${type}`"
                :classes="classes"
                :caption="errors[0]"
                :placeholder="`Masukkan Nomor ${type}mu`"
              />
              <label :for="type" style="margin-top: 16px">Unggah Foto {{ type }}</label>
              <Upload
                :id="type"
                single-upload
                text="Pilih atau letakkan disini"
                desc-input="Ekstensi File : JPG, JPEG, PNG 
            Maksimal Ukuran : 10 Mb"
                :files.sync="idPicture"
                file-type="images"
              />
            </ValidationProvider>
            <y-btn size="large-full" label="Simpan" type="submit" class="mt-24" />
          </form>
        </ValidationObserver>
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
    },
    ktp: {
      type: Object,
      default: () => ({})
    },
    npwp: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      type: '',
      idNumber: '',
      idPicture: [],
      activeModalChangeId: false
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalChangeId = val
    },
    activeModalChangeId(val) {
      this.$emit('update:activeModal', val)
    }
  },
  created() {
    if (Object.keys(this.ktp).length) {
      this.idNumber = this.ktp.identity
      this.type = 'KTP'
    } else {
      this.type = 'NPWP'
      this.idNumber = this.npwp.identity
    }
  },
  methods: {
    onSubmit() {
      this.$vs.loading()

      if (this.type === 'KTP') {
        this.$repositories.account
          .editKtp(this.$store.getters['user/getUserAccount'].id, {
            identity: this.idNumber
          })
          .then((_) => {
            this.$vs.loading.close()
            window.location.replace('/peminjam/account/setting/account')
          })
          .catch((err) => {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Gagal',
              text: 'Mohon coba di lain waktu',
              color: '#DD403A',
              position: 'top-center'
            })

            throw new Error(err)
          })
      } else {
        this.$repositories.account
          .editNpwp(this.$store.getters['user/getUserAccount'].id, {
            identity: this.idNumber
          })
          .then((_) => {
            this.$vs.loading.close()
            window.location.replace('/peminjam/account/setting/account')
          })
          .catch((err) => {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Gagal',
              text: 'Mohon coba di lain waktu',
              color: '#DD403A',
              position: 'top-center'
            })

            throw new Error(err)
          })
      }
    }
  }
}
</script>

<style scoped></style>
