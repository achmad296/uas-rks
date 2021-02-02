<template>
  <LayoutAuth>
    <div class="content-form-container">
      <div v-if="currentStep === 1" class="radio-acc">
        <h2>Daftar Akun Baru</h2>
        <div class="radio-box-container">
          <p style="color: #847f82; font-weight: bold; margin-bottom: 8px; font-size: 16px">Pilih Akun</p>
          <div class="radio-box" :class="accountType === 'BUSINESS' && 'active'" @click="accountType = 'BUSINESS'">
            <div class="content">
              <subtitle-1>Peminjam</subtitle-1>
              <body-2>Sebagai penerima pinjaman dana.</body-2>
            </div>
            <div class="tick">
              <i class="material-icons">check_circle</i>
            </div>
          </div>
          <!-- sementara disable -->
          <div class="radio-box" style="cursor: not-allowed" :class="accountType === 'INVESTOR' && 'active'">
            <div class="content">
              <subtitle-1>Pendana</subtitle-1>
              <body-2>Sebagai pemberi pinjaman dana.</body-2>
            </div>
            <div class="tick">
              <span class="coming-soon-label">SEGERA HADIR</span>
              <!-- <i class="material-icons">check_circle</i> -->
            </div>
          </div>
          <y-btn style="margin-bottom: 16px" size="large" label="Pilih" @click.native="changeStep" />
        </div>
      </div>

      <div v-if="currentStep === 2" class="form-identity">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form class="input-container" @submit.prevent="handleSubmit(onSubmit)">
            <div class="title">
              <i class="material-icons" style="cursor: pointer" @click="currentStep--">arrow_back</i>
              <h2>Daftar Akun Baru</h2>
            </div>
            <ValidationProvider v-slot="{ classes, errors }" rules="required|no_special_char">
              <basic-input
                id="title"
                v-model="title"
                label="Nama Bisnis"
                :classes="classes"
                :caption="errors[0]"
                placeholder="Masukkan Nama Bisnis"
                style="margin-bottom: 16px; margin-top: 18px"
              />
            </ValidationProvider>
            <ValidationProvider v-slot="{ classes, errors }" rules="required|no_special_char">
              <basic-input
                id="name"
                v-model="name"
                label="Nama Lengkap"
                :classes="classes"
                :caption="errors[0]"
                placeholder="Masukkan Nama Lengkapmu"
                style="margin-bottom: 16px"
              />
            </ValidationProvider>
            <p class="radio-label">Jenis Kelamin</p>
            <div class="radio-group" style="margin-bottom: 10px">
              <input id="male" v-model="gender" name="gender" type="radio" value="M" class="body3" />
              <label for="male" style="margin-right: 35px">Pria</label>
              <input id="female" v-model="gender" name="gender" type="radio" value="F" class="body3" />
              <label for="female">Wanita</label>
            </div>
            <ValidationProvider v-slot="{ classes, errors }" vid="email" rules="required|email">
              <basic-input
                id="email"
                v-model="email"
                label="Email"
                :classes="classes"
                :caption="errors[0]"
                placeholder="Masukkan Alamat Emailmu"
                style="margin-bottom: 16px"
              />
            </ValidationProvider>
            <ValidationProvider v-slot="{ classes, errors }" vid="msisdn" rules="numeric|required|notelp">
              <basic-input
                id="msisdn"
                v-model="msisdn"
                label="No. Handphone"
                :classes="classes"
                :caption="errors[0] || 'Contoh: 812xxxxxxxxx'"
                placeholder="Masukkan No. Handphonemu"
                prepend="+62"
                style="margin-bottom: 16px"
              />
            </ValidationProvider>
            <ValidationProvider v-slot="{ classes, errors }" rules="required|password">
              <basic-input
                id="password"
                v-model="password"
                label="Kata Sandi"
                :classes="classes"
                :caption="errors[0] || 'Minimal 6 karakter'"
                placeholder="Masukkan Kata Sandimu"
                style="margin-bottom: 18px"
                type="password"
                is-password
              />
            </ValidationProvider>
            <y-btn size="large" label="Daftar" style="margin-bottom: 16px" type="submit" />
          </form>
        </ValidationObserver>
      </div>

      <div v-if="currentStep === 3" class="register-form-successful">
        <div class="register-form-successful-container">
          <img src="~assets/images/login-register/checklist.svg" alt="register succesful" />
          <h3>Pendaftaran Berhasil!</h3>
          <body-2>Silakan Masuk untuk mulai menggunakan Yubibursa</body-2>
          <y-btn size="large" label="Masuk" style="width: 108px" @click.native="onLogin"></y-btn>
        </div>
      </div>

      <div v-if="currentStep === 1 || currentStep === 2" class="form-footer">
        <p class="body3">
          Sudah punya akun?
          <nuxt-link style="text-decoration: none; color: #d30000; font-weight: bold; cursor: pointer" to="/login">
            Masuk
          </nuxt-link>
        </p>
      </div>
    </div>
  </LayoutAuth>
</template>

<script>
export default {
  props: {
    changeTab: {
      type: Function,
      default() {
        return ''
      }
    }
  },
  middleware: 'guest',
  data: () => ({
    currentStep: 1,
    accountType: 'BUSINESS',
    title: '',
    name: '',
    gender: 'M',
    email: '',
    tempEmail: 'x',
    msisdn: '',
    tempMsisdn: '6',
    password: '',
    error: null
  }),
  methods: {
    changeStep() {
      this.currentStep++
    },
    onSubmit() {
      let fixedTelephone = ''

      if (this.msisdn.charAt(0) === '0') {
        fixedTelephone = '+62'.concat(this.msisdn.substring(1))
      } else if (this.msisdn.substring(0, 3) === '+62') {
        fixedTelephone = this.msisdn
      } else if (this.msisdn.substring(0, 2) === '62') {
        fixedTelephone = '+'.concat(this.msisdn)
      } else {
        fixedTelephone = '+62'.concat(this.msisdn)
      }
      if (this.email === this.tempEmail) {
        this.$refs.form.setErrors({
          email: ['Email sudah terdaftar']
        })
        this.$vs.notify({
          text: 'Email sudah terdaftar',
          color: '#DD403A',
          position: 'top-center'
        })
      } else if (fixedTelephone === this.tempMsisdn) {
        this.$refs.form.setErrors({
          msisdn: ['Nomor telepon sudah terdaftar']
        })
        this.$vs.notify({
          text: 'Nomor telepon sudah terdaftar',
          color: '#DD403A',
          position: 'top-center'
        })
      } else {
        const firstName = this.name.includes(' ') ? this.name.split(' ').slice(0, 1).join(' ') : this.name
        const lastName = this.name.includes(' ') ? this.name.split(' ').slice(1).join(' ') : ''

        this.$vs.loading()

        this.$repositories.business
          .create({
            email: this.email,
            first_name: firstName,
            gender: this.gender,
            last_name: lastName,
            msisdn: fixedTelephone,
            password: this.password,
            business_title: this.title
          })
          .then((res) => {
            this.$vs.loading.close()
            this.changeStep()
          })
          .catch((err) => {
            this.$vs.loading.close()
            const errorMessage = err.response.data.response.message

            if (errorMessage === 'Email sudah terdaftar') {
              this.tempEmail = this.email
              this.$refs.form.setErrors({
                email: [errorMessage]
              })
            } else {
              this.tempMsisdn = fixedTelephone
              this.$refs.form.setErrors({
                msisdn: [errorMessage]
              })
            }

            this.$vs.notify({
              text: errorMessage,
              color: '#DD403A',
              position: 'top-center'
            })
          })
      }
    },
    onLogin() {
      const data = {
        email: this.email,
        password: this.password
      }

      this.$vs.loading()

      this.$store
        .dispatch('user/login', data)
        .then((res) => {
          this.$vs.loading.close()
          this.$store.getters['user/getUserType'] === 'BUSINESS'
            ? this.$router.push({ path: '/peminjam/dashboard' })
            : this.$router.push({ path: '/pendana/dashboard' })
        })
        .catch((err) => {
          const errorMessage = err.response.data.response.message
          this.$vs.loading.close()
          this.$vs.notify({
            text: errorMessage,
            color: '#DD403A',
            position: 'top-center'
          })
        })
    }
  },
  layout: 'login-register'
}
</script>

<style scoped>
.coming-soon-label {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  color: #dd403a;
  background: #f7d2dd;
  border-radius: 20px;
  padding: 4px 8px;
}

.content-form-container {
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.radio-acc {
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow: auto;
  padding-top: 56px;
}

.radio-acc h2 {
  text-align: center;
  margin-bottom: 24px;
  width: 100%;
}

.radio-box {
  display: flex;
  background: #fafbfc;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid #d6d4d5;
  cursor: pointer;
}

.radio-box:hover {
  background: #cfcfd0;
}

.radio-box.active {
  background: #ebf4fc;
  border: 1px solid #3c91e6;
}

.radio-box.active .subtitle1,
.radio-box.active .body2,
.radio-box.active i {
  color: #3c91e6;
}

.radio-box-container {
  width: 70%;
  animation-duration: 1s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    opacity: 0;
    margin-top: 30%;
  }

  to {
    opacity: 1;
    margin-top: 0%;
  }
}

.tick {
  align-self: center;
  text-align: right;
  height: 19px;
}

button {
  width: 100%;
}

i {
  font-size: 19.5px;
}

.form-identity {
  padding-top: 56px;
  padding-bottom: 16px;
  overflow: auto;
}

.input-container {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.title {
  display: flex;
  align-items: center;
  margin-top: 0;
}

.title h2 {
  margin: auto;
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

.social-media-group {
  text-align: center;
}

.register-form-successful {
  display: flex;
  justify-content: center;
  text-align: center;
}

.register-form-successful-container {
  width: 90%;
  padding-top: 56px;
}

.register-form-successful img,
.register-form-successful h3 {
  margin-bottom: 8px;
}

.register-form-successful button {
  margin: 16px auto;
}

.form-footer {
  width: 100%;
  text-align: center;
  border-top: 1px solid #ebeaea;
  padding: 15px 0px;
}

.form-footer .body3 {
  margin-bottom: 0px;
  color: #00171f;
}

@media only screen and (max-width: 991px) {
  .form-identity,
  .radio-acc {
    padding-top: 32px;
  }

  .content-form-container {
    height: calc(100% - 105px);
  }
}
</style>
