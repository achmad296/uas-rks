<template>
  <div class="change-password-section">
    <div class="section-header">
      <span class="material-icons" @click="$emit('change-tab')">arrow_back</span>
      <subtitle-1>Ubah Kata Sandi</subtitle-1>
    </div>
    <div class="form-section">
      <body-2 style="margin-bottom: 16px"
        >Untuk mengubah kata sandi silakan masukan kata sandi lama dan baru disini.</body-2
      >
      <ValidationObserver ref="form" v-slot="{ handleSubmit }" style="width: 100%">
        <form class="input-container" @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider v-slot="{ classes, errors }" vid="oldPassword" rules="required">
            <basic-input
              id="old-password"
              v-model="oldPassword"
              label="Kata Sandi Lama"
              :classes="classes"
              :caption="errors[0]"
              placeholder="Masukkan Kata Sandi Lama"
              style="margin-bottom: 16px"
              type="password"
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ classes, errors }" vid="newPassword" rules="required|password">
            <basic-input
              id="new-password"
              v-model="newPassword"
              label="Kata Sandi Baru"
              :classes="classes"
              :caption="errors[0]"
              placeholder="Masukkan Kata Sandi Baru"
              style="margin-bottom: 16px"
              type="password"
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ classes, errors }" vid="newPasswordConfirmation" rules="required|password">
            <basic-input
              id="new-password=confirmation"
              v-model="newPasswordConfirmation"
              label="Konfirmasi Kata Sandi Baru"
              :classes="classes"
              :caption="errors[0]"
              placeholder="Masukkan Kata Sandi Baru"
              style="margin-bottom: 24px"
              type="password"
            />
          </ValidationProvider>
          <y-btn label="Simpan" type="submit" />
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: ''
    }
  },

  methods: {
    onSubmit() {
      if (this.newPasswordConfirmation !== this.newPassword) {
        this.$refs.form.setErrors({
          newPasswordConfirmation: ['Password tidak sama']
        })
      } else if (this.newPassword === this.oldPassword) {
        this.$refs.form.setErrors({
          newPassword: ['Password tidak boleh sama dengan yang lama']
        })
      } else {
        this.$repositories.account
          .changePassword(this.$store.getters['user/getUserAccount'].id, {
            old_password: this.oldPassword,
            new_password: this.newPassword
          })
          .then((_) => {
            window.location.replace('/peminjam/account/setting/account')
          })
          .catch((_) => {
            this.$refs.form.setErrors({
              oldPassword: ['Kata sandi salah']
            })
          })
      }
    }
  }
}
</script>

<style scoped>
.change-password-section {
  padding: 0 16px 65px 16px;
  background-color: #fff;
  border-radius: 16px;
}

.subtitle1 {
  margin-right: auto;
}

.material-icons {
  margin-right: auto;
}

.section-header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.7px solid #ebeaea;
  margin-bottom: 24px;
}

.form-section {
  width: 379px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
