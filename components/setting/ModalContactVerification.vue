<template>
  <modal
    :active-modal.sync="activeModalContactVerification"
    :title="email.length ? 'Verifikasi Email' : 'Verifikasi No. Handphone'"
  >
    <template v-slot:body>
      <div v-if="activeSection === 0" class="modal-contact-verification">
        <img src="~assets/images/setting/otp-input.png" alt="OTP Illustration" />
        <p class="body3">
          Kamu akan menerima Kode OTP 6 digit untuk melakukan verifikasi pada {{ email.length ? 'email' : 'nomor' }}:
        </p>
        <subtitle-1 style="margin-top: 16px">{{ email.length ? email : msisdn }}</subtitle-1>

        <y-btn label="Kirim Kode OTP" class="mt-24" @click.native="requestOtp(false)" />
      </div>
      <div v-else-if="activeSection === 1" class="modal-contact-verification">
        <img src="~assets/images/setting/otp-input.png" alt="OTP Illustration" />
        <p class="body3">Kode OTP telah terkirim. Masukan kode OTP untuk melakukan verifikasi:</p>
        <Otpinput
          ref="otpInput"
          style="margin-top: 16px"
          :should-auto-focus="true"
          :is-input-num="true"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
        />

        <y-btn label="Verifikasi" class="mt-24" :disabled="otpCode.length !== 6" @click.native="verifyOtp" />

        <p v-if="countdownTime > 0" class="rerequest-label">
          Mohon tunggu <span style="font-weight: bold">{{ countdownTime }} detik</span> untuk kirim ulang.
        </p>
        <p v-else class="rerequest-label">
          Belum menerima kode OTP?
          <span
            style="color: #d30000; cursor: pointer"
            @click="
              requestOtp(true)
              rerequestCountdown()
            "
            >Kirim Lagi</span
          >
        </p>
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
    email: {
      type: String,
      default: ''
    },
    msisdn: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      countdownTime: 60,
      activeSection: 0,
      activeModalContactVerification: false,
      otpCode: ''
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalContactVerification = val
    },
    activeModalContactVerification(val) {
      this.$emit('update:activeModal', val)
    }
  },
  methods: {
    onSubmit() {},
    rerequestCountdown() {
      if (this.countdownTime > 0) {
        setTimeout(() => {
          this.countdownTime -= 1
          this.rerequestCountdown()
        }, 1000)
      }
    },
    requestOtp(isRerequest) {
      this.countdownTime = 60
      this.$vs.loading({
        container: '.modal-contact-verification'
      })

      const accountId = this.$store.getters['user/getUserAccount'].id

      if (this.email.length) {
        this.$repositories.otp
          .getEmailOtp(accountId)
          .then((res) => {
            if (res.status === 200) {
              this.$vs.loading.close('.modal-contact-verification > .con-vs-loading')

              this.$vs.notify({
                title: 'Berhasil!',
                text: 'Kode OTP sedang dikirim ke emailmu. mohon tunggu beberapa saat.',
                color: '#66E0A3',
                position: 'top-center',
                time: 5000
              })

              isRerequest || this.activeSection++
              this.rerequestCountdown()
            }
          })
          .catch((err) => {
            this.$vs.loading.close('.modal-contact-verification > .con-vs-loading')

            if (err.response.status === 404) {
              const errorMessage = err.response.data.response.message
              this.$vs.notify({
                title: 'Oops!',
                text: errorMessage,
                color: '#DD403A',
                position: 'top-center',
                time: 5000
              })
            } else {
              this.$vs.notify({
                title: 'Tidak berhasil!',
                text: 'Terjadi kesalahan dalam pengiriman kode OTP. Mohon coba dilain waktu.',
                color: '#DD403A',
                position: 'top-center',
                time: 5000
              })
            }
          })
      } else {
        this.$repositories.otp
          .getOtp(accountId)
          .then((res) => {
            if (res.status === 200) {
              this.$vs.loading.close('.modal-contact-verification > .con-vs-loading')

              this.$vs.notify({
                title: 'Berhasil!',
                text: 'Kode OTP sedang dikirim ke nomormu. mohon tunggu beberapa saat.',
                color: '#66E0A3',
                position: 'top-center',
                time: 5000
              })

              isRerequest || this.activeSection++
              this.rerequestCountdown()
            }
          })
          .catch((err) => {
            err.response.data.handle = 'handled'
            this.$vs.loading.close('.modal-contact-verification > .con-vs-loading')

            this.$vs.notify({
              title: 'Tidak berhasil!',
              text: 'Terjadi kesalahan dalam pengiriman kode OTP. Mohon coba dilain waktu.',
              color: '#DD403A',
              position: 'top-center',
              time: 5000
            })
          })
      }
    },
    verifyOtp() {
      this.$vs.loading({
        container: '.modal-contact-verification'
      })

      const code = parseInt(this.otpCode)

      const accountId = this.$store.getters['user/getUserAccount'].id

      if (this.email.length) {
        this.$repositories.otp
          .verifyEmailOtp(accountId, {
            code
          })
          .then((res) => {
            if (res.status === 200) {
              this.$vs.loading.close('.modal-contact-verification > .con-vs-loading')

              window.location.replace('/peminjam/account/setting/account')
            }
          })
          .catch((err) => {
            err.response.data.handle = 'handled'

            this.$vs.loading.close('.modal-contact-verification > .con-vs-loading')

            this.$vs.notify({
              title: 'Tidak berhasil!',
              text: 'Kode OTP yang anda masukan salah.',
              color: '#DD403A',
              position: 'top-center',
              time: 5000
            })
          })
      } else {
        this.$repositories.otp
          .verifyOtp(accountId, {
            code
          })
          .then((res) => {
            if (res.status === 200) {
              this.$vs.loading.close('.modal-contact-verification > .con-vs-loading')

              this.$vs.notify({
                title: 'Berhasil!',
                text: 'Nomor anda telah terverifikasi dalam sistem yubibursa.',
                color: '#66E0A3',
                position: 'top-center',
                time: 5000
              })

              window.location.replace('/peminjam/account/setting/account')
            } else {
              this.$vs.loading.close('.modal-contact-verification > .con-vs-loading')

              this.$vs.notify({
                title: 'Tidak berhasil!',
                text: 'Kode OTP yang anda masukan salah.',
                color: '#DD403A',
                position: 'top-center',
                time: 5000
              })
            }
          })
          .catch((err) => {
            err.response.data.handle = 'handled'

            this.$vs.loading.close('.modal-contact-verification > .con-vs-loading')

            this.$vs.notify({
              title: 'Tidak berhasil!',
              text: 'Kode OTP yang anda masukan salah.',
              color: '#DD403A',
              position: 'top-center',
              time: 5000
            })
          })
      }
    },
    handleOnComplete(value) {
      this.otpCode = value
    },
    handleOnChange(value) {
      this.otpCode = value
    }
  }
}
</script>

<style scoped>
.modal-contact-verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 69px;
  padding-bottom: 150px;
}

.body3 {
  color: #000;
}

img {
  width: 104px;
  margin-bottom: 8px;
}

.radio-label {
  font-family: 'Lato';
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;

  color: #847f82;
}

.radio-group {
  display: flex;
  align-items: center;
}

.radio-group label {
  margin-bottom: 0;
  margin-left: 8px;
}

.radio-group input[type='radio'] {
  background-color: #3c91e6;
}

.radio-group input[type='radio']:checked + label {
  color: #3c91e6;
}

.rerequest-label {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;

  margin-top: 16px;

  color: #847f82;
}
</style>
