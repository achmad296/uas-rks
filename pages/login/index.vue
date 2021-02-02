<template>
  <LayoutAuth>
    <div class="content-form-container">
      <div v-if="currentStep === 1" class="form-identity">
        <h2>Masuk ke Akunmu</h2>
        <ValidationObserver ref="form" v-slot="{ handleSubmit }" class="field-container" style="width: 100%">
          <form class="input-container" @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider v-slot="{ classes, errors }" vid="email" rules="required">
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
            <ValidationProvider v-slot="{ classes, errors }" vid="password" rules="required">
              <basic-input
                id="password"
                v-model="password"
                label="Kata Sandi"
                :classes="classes"
                :caption="errors[0]"
                placeholder="Masukkan Kata Sandimu"
                style="margin-bottom: 18px"
                type="password"
                is-password
              />
            </ValidationProvider>
            <nuxt-link to="/forgot-password">
              <div class="forgot-password-container">
                <p class="body3" style="color: #d30000; cursor: pointer">Lupa Kata Sandi?</p>
              </div>
            </nuxt-link>
            <y-btn size="large" label="Masuk" style="margin-bottom: 16px; width: 100%" type="submit"></y-btn>
            <!-- Sembunyikan dulu -->
            <!-- <p class="body3" style="text-align: center; margin-bottom: 16px">Atau dengan</p>
            <div class="social-media-group" style="margin-bottom: 16px">
              <img src="~assets/images/login-register/facebook.svg" alt="facebook oauth" style="margin-right: 6.5px" />
              <img src="~assets/images/login-register/google.svg" alt="google oauth" style="margin-left: 6.5px" />
            </div> -->
          </form>
        </ValidationObserver>
      </div>
      <div v-if="currentStep === 1 || currentStep === 2" class="form-footer">
        <p class="body3">
          Belum punya akun?
          <nuxt-link style="text-decoration: none; color: #d30000; font-weight: bold; cursor: pointer" to="/register">
            Daftar
          </nuxt-link>
        </p>
      </div>
    </div>
  </LayoutAuth>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      currentStep: 1,
      email: '',
      password: ''
    }
  },

  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      }

      this.$vs.loading()

      this.$store
        .dispatch('user/login', formData)
        .then((_) => {
          this.$vs.loading.close()
          this.$store.getters['user/getUserType'] === 'BUSINESS'
            ? this.$router.push({ path: '/peminjam/dashboard' })
            : this.$router.push({ path: '/pendana/dashboard' })
        })
        .catch((err) => {
          this.$vs.loading.close()
          const errorMessage = err.response.data.response.message

          this.$vs.notify({
            text: errorMessage,
            color: '#DD403A',
            position: 'top-center'
          })

          if (errorMessage === 'Email tidak terdaftar') {
            this.$refs.form.setErrors({
              email: [errorMessage]
            })
          } else if (errorMessage === 'Kata sandi salah') {
            this.$refs.form.setErrors({
              password: [errorMessage]
            })
          }
        })
    }
  },
  layout: 'login-register'
}
</script>

<style scoped>
h2 {
  margin-bottom: 24px;
  text-align: center;
}

.content-form-container {
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-identity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  padding-top: 56px;
  overflow: auto;
}

.input-container {
  width: 80%;
  margin: auto;
  max-width: 550px;
}

.field-container {
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

.forgot-password-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.social-media-group {
  text-align: center;
}

.social-media-group img {
  cursor: pointer;
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
  .form-identity {
    padding-top: 32px;
  }

  .content-form-container {
    height: calc(100% - 105px);
  }
}
</style>
