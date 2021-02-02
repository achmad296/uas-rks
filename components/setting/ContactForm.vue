<template>
  <ValidationObserver ref="contactForm" v-slot="{ handleSubmit }" style="width: 100%">
    <form class="input-container" @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider v-if="isEmail" v-slot="{ classes, errors }" vid="email" rules="required|email">
        <basic-input
          id="email"
          v-model="email"
          label="Email"
          :classes="classes"
          :caption="errors[0]"
          placeholder="Masukkan Alamat Email Barumu"
          style="margin-bottom: 16px"
          type="email"
        />
      </ValidationProvider>
      <ValidationProvider v-else v-slot="{ classes, errors }" vid="msisdn" rules="required|notelp">
        <basic-input
          id="msisdn"
          v-model="msisdn"
          label="No. Handphone Baru"
          :classes="classes"
          :caption="errors[0]"
          placeholder="Masukkan No. Handphone Barumu"
          style="margin-bottom: 16px"
          type="number"
        />
      </ValidationProvider>
      <y-btn label="Simpan" type="submit" />
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: () => ({})
    },
    password: {
      type: String,
      default: ''
    },
    isEmail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      email: '',
      msisdn: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.isEmail) {
        if (this.profile.email === this.email) {
          this.$refs.contactForm.setErrors({
            email: ['Email tidak boleh sama dengan yang lama']
          })
        } else {
          this.$repositories.account
            .editEmail(this.profile.id, {
              email: this.email,
              password: this.password
            })
            .then(async (_) => {
              this.$vs.loading()
              await this.$store.dispatch('user/fetchAccount', this.profile.id)
              this.$vs.loading.close()
              this.$emit('pass-contact', this.email)
              this.$emit('change-tab')
            })
            .catch((err) => {
              if (err.response.status === 500) {
                this.$vs.notify({
                  title: 'Mohon maaf',
                  text: 'Mohon coba di lain waktu',
                  color: '#DD403A',
                  position: 'top-center'
                })
              } else {
                const errorMessage = err.response.data.response.message
                this.$refs.contactForm.setErrors({
                  email: [errorMessage]
                })
              }

              throw new Error(err)
            })
        }
      } else {
        let fixedMsisdn
        if (this.msisdn.charAt(0) === '0') {
          fixedMsisdn = '+62'.concat(this.msisdn.substring(1))
        } else if (this.msisdn.substring(0, 2) === '62') {
          fixedMsisdn = '+'.concat(this.msisdn)
        } else {
          fixedMsisdn = '+62'.concat(this.msisdn)
        }

        if (fixedMsisdn === this.profile.msisdn) {
          this.$refs.contactForm.setErrors({
            msisdn: ['No. Telephone tidak boleh sama dengan yang lama']
          })
        } else {
          this.$repositories.account
            .editMsisdn(this.profile.id, {
              msisdn: fixedMsisdn,
              password: this.password
            })
            .then(async (_) => {
              this.$vs.loading()
              await this.$store.dispatch('user/fetchAccount', this.profile.id)
              this.$vs.loading.close()
              this.$emit('pass-contact', fixedMsisdn)
              this.$emit('change-tab')
            })
            .catch((err) => {
              if (err.response.status === 500) {
                this.$vs.notify({
                  title: 'Mohon maaf',
                  text: 'Mohon coba di lain waktu',
                  color: '#DD403A',
                  position: 'top-center'
                })
              } else {
                const errorMessage = err.response.data.response.message
                this.$refs.contactForm.setErrors({
                  msisdn: [errorMessage]
                })
              }

              throw new Error(err)
            })
        }
      }
    }
  }
}
</script>
