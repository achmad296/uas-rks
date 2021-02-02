<template>
  <footer>
    <div class="container pt-5 pb-5">
      <div class="row justify-content-between mb-3 footer-content">
        <div class="col-12 col-md-6">
          <h2 class="mb-2 mb-md-3">Berlangganan</h2>
          <body-2 class="mb-2">Masukan emailmu dan mulai berlangganan info terbaru dari Yubibursa</body-2>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <div class="row mb-4">
                <div class="col-6 col-sm-8" style="padding-right: 0">
                  <ValidationProvider v-slot="{ errors }" vid="email" rules="email" mode="lazy">
                    <basic-input
                      id="email"
                      v-model="email"
                      class="subscribe-input"
                      :caption="errors[0]"
                      placeholder="Emailmu"
                    />
                  </ValidationProvider>
                </div>
                <div class="col-2 col-sm-4 btn-container" style="padding-left: 0">
                  <y-btn type="submit" size="medium" label="Berlangganan" class="subscribe-btn"></y-btn>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <div class="col-12 col-md-5">
          <h2 class="mb-2 mb-md-3">Jangkau Kami</h2>
          <div class="row mb-2">
            <div class="col-1">
              <i class="material-icons">location_on</i>
            </div>
            <div class="col-10">
              <body-2>
                Jl. Pita Maha Jl. Tatar Pitaloka No.36, Kertajaya, Padalarang, Kabupaten Bandung Barat,
                <br />
                Jawa Barat 40553
              </body-2>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-1">
              <i class="material-icons">local_post_office</i>
            </div>
            <div class="col-10">
              <body-2>support@yukbisnis.com</body-2>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <i class="material-icons">call</i>
            </div>
            <div class="col-10">
              <body-2>+62 821 2691 2121</body-2>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mb-4">
        <div class="col">
          <div class="line"></div>
        </div>
      </div>
      <div class="row justify-content-center text-center mb-2">
        <div class="col">
          <img src="~assets/logo/main-logo.svg" alt="Yubibursa" />
        </div>
      </div>
      <div class="row justify-content-center text-center body3">
        <div class="col">
          <p>Copyright © 2020 Yubibursa</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    email: ''
  }),
  methods: {
    onSubmit() {
      if (!this.email.length) {
        this.$vs.notify({
          title: 'Gagal',
          text: 'Email tidak boleh kosong',
          color: '#DD403A',
          position: 'top-center'
        })
      } else {
        this.$vs.loading()

        this.$repositories.subscriber
          .create({
            email: this.email
          })
          .then((res) => {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Berhasil!',
              text: res.data.response.message,
              color: '#66E0A3',
              position: 'top-center'
            })
          })
          .catch((err) => {
            this.$vs.loading.close()
            const errorMessage = err.response.data.response.message

            this.$vs.notify({
              title: 'Tidak Berhasil!',
              text: errorMessage,
              color: '#DD403A',
              position: 'top-center'
            })
          })
      }
    }
  }
}
</script>

<style scoped>
.line {
  width: 100%;
  border-top: 0.4px solid #c4c4c4;
}

footer {
  height: 100%;
  background: #00171f;
}

footer h2,
footer .body2,
footer i,
footer .body3 {
  color: #fff;
}

.vs-input--input {
  height: 37px;
  width: 100%;
  border-radius: 8px 0 0 8px;
  color: #00171f;
}

button.subscribe-btn {
  margin-top: 4px;
  border-radius: 0 8px 8px 0;
}

::v-deep div.custom-input {
  border-radius: 8px 0 0 8px;
}
</style>
