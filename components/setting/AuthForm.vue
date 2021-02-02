<template>
  <ValidationObserver ref="form" v-slot="{ handleSubmit }" style="width: 100%">
    <form class="input-container" @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider v-slot="{ classes, errors }" vid="password" rules="required">
        <basic-input
          id="password"
          v-model="password"
          label="Kata Sandi"
          :classes="classes"
          :caption="errors[0]"
          placeholder="Masukkan Kata Sandi"
          style="margin-bottom: 16px"
          type="password"
          is-password
        />
      </ValidationProvider>
      <y-btn label="Lanjut" type="submit" />
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      password: ''
    }
  },

  methods: {
    onSubmit() {
      this.$vs.loading()

      this.$repositories.auth
        .login({
          email: this.email,
          password: this.password
        })
        .then((_) => {
          this.$vs.loading.close()
          this.$emit('change-tab')
          this.$emit('change-password', this.password)
        })
        .catch((err) => {
          const errorMessage = err.response.data.response.message

          this.$vs.notify({
            text: errorMessage,
            color: '#DD403A',
            position: 'top-center'
          })

          this.$refs.form.setErrors({
            password: [errorMessage]
          })

          this.$vs.loading.close()
        })
    }
  }
}
</script>
