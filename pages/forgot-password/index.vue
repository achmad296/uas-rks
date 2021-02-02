<template>
  <LayoutAuth forgot-password>
    <div v-if="currentStep === 1" class="forgot-password">
      <img src="~assets/icons/forget-password.svg" alt="Lupa kata sandi" />
      <h2>Lupa Kata Sandi</h2>
      <body-2>Masukkan emailmu untuk menerima kode OTP guna mengatur ulang kata sandi. </body-2>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }" style="width: 100%">
        <form class="input-container" @submit.prevent="handleSubmit(onSubmit(false))">
          <ValidationProvider v-slot="{ classes, errors }" vid="email" rules="required">
            <basic-input
              id="email"
              v-model="email"
              label="Email"
              :classes="classes"
              :caption="errors[0]"
              placeholder="Masukkan Alamat Emailmu"
              style="margin-bottom: 24px"
            />
          </ValidationProvider>
          <y-btn size="large" label="Kirim" style="margin-bottom: 16px; width: 100%" type="submit"></y-btn>
        </form>
      </ValidationObserver>
    </div>
    <div v-else-if="currentStep === 2" class="forgot-password">
      <img src="~assets/icons/forget-password.svg" alt="Lupa kata sandi" />
      <h2>Lupa Kata Sandi</h2>
      <body-2>Masukkan emailmu untuk menerima kode OTP guna mengatur ulang kata sandi. </body-2>
      <Otpinput
        ref="otpInput"
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
        Belum menerima kode OTP? <span style="color: #d30000; cursor: pointer" @click="onSubmit(true)">Kirim Lagi</span>
      </p>
    </div>

    <div v-else-if="currentStep === 3" class="forgot-password">
      <img src="~assets/icons/forget-password.svg" alt="Lupa kata sandi" />
      <h2>Lupa Kata Sandi</h2>
      <body-2>Buat password baru untuk atur ulang passwordmu.</body-2>
      <ValidationObserver ref="passwordForm" v-slot="{ handleSubmit }" style="width: 100%">
        <form class="input-container" @submit.prevent="handleSubmit(onSubmitNewPassword)">
          <ValidationProvider v-slot="{ classes, errors }" rules="required|password">
            <basic-input
              id="new-password"
              v-model="newPassword"
              label="Kata Sandi"
              :classes="classes"
              :caption="errors[0]"
              placeholder="Masukkan Kata Sandi Baru"
              style="margin-bottom: 16px"
              type="password"
              is-password
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ classes, errors }" vid="confirmNewPassword" rules="required|password">
            <basic-input
              id="new-password=confirmation"
              v-model="newPasswordConfirmation"
              label="Konfirmasi Kata Sandi"
              :classes="classes"
              :caption="errors[0]"
              placeholder="Masukkan Kata Sandi Baru"
              style="margin-bottom: 24px"
              type="password"
              is-password
            />
          </ValidationProvider>
          <y-btn label="Atur Ulang" size="large" type="submit" style="width: 100%" />
        </form>
      </ValidationObserver>
    </div>
  </LayoutAuth>
</template>

<script>
export default {
  data() {
    return {
      countdownTime: 5,
      currentStep: 2,
      email: 'yossansr06@gmail.com',
      otpCode: '',
      newPassword: '',
      newPasswordConfirmation: ''
    }
  },
  mounted() {
    this.rerequestCountdown()
  },
  methods: {
    onSubmit(isRerequest) {
      this.$vs.loading()
      this.$repositories.otp
        .getForgotPasswordOtp(this.email)
        .then((res) => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Berhasil!',
            text: 'Kode OTP sedang dikirim ke emailmu. mohon tunggu beberapa saat.',
            color: '#66E0A3',
            position: 'top-center',
            time: 5000
          })

          isRerequest || this.currentStep++
          this.rerequestCountdown()
        })
        .catch((err) => {
          this.$vs.loading.close()

          if (err.response.status === 404) {
            const errorMessage = err.response.data.response.message
            this.$vs.notify({
              title: 'Oops!',
              text: errorMessage,
              color: '#DD403A',
              position: 'top-center',
              time: 5000
            })

            this.$refs.form.setErrors({
              email: [errorMessage]
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
    },
    verifyOtp() {
      const code = parseInt(this.otpCode)
      this.$repositories.otp
        .verifyForgotPasswordOtp(this.email, {
          code
        })
        .then((res) => {
          this.currentStep++
        })
        .catch((err) => {
          if (err.response.status === 401) {
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
    },
    onSubmitNewPassword() {
      if (this.newPassword !== this.newPasswordConfirmation) {
        return this.$refs.passwordForm.setErrors({
          confirmNewPassword: ['Password tidak sama']
        })
      }

      const code = parseInt(this.otpCode)

      this.$repositories.account
        .updateForgotPassword(this.email, {
          code,
          password: this.newPassword
        })
        .then((_) => this.$router.push('/login'))
        .catch((err) => {
          if (err.response.status === 500) {
            const errorMessage = err.response.data.response.message
            this.$vs.notify({
              title: 'Oops!',
              text: errorMessage,
              color: '#DD403A',
              position: 'top-center',
              time: 5000
            })
          }
        })
    },
    rerequestCountdown() {
      if (this.countdownTime > 0) {
        setTimeout(() => {
          this.countdownTime -= 1
          this.rerequestCountdown()
        }, 1000)
      }
    },
    handleOnComplete(value) {
      this.otpCode = value
    },
    handleOnChange(value) {
      this.otpCode = value
    }
  },
  layout: 'login-register'
}
</script>

<style scoped>
.forgot-password {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15%;
}

.forgot-password h2,
.body2 {
  text-align: center;
}

.forgot-password h2 {
  margin-top: 6px;
}

.body2 {
  margin: 7px 0 16px 0;
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
