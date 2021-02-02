<template>
  <modal :active-modal.sync="activeModalChangeProfile" title="Ubah profil">
    <template v-slot:body>
      <div class="modal-change-profile-picture">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form class="input-container" @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider v-slot="{ classes, errors }" rules="required">
              <basic-input
                id="fullName"
                v-model="fullName"
                label="Name Lengkap"
                :classes="classes"
                :caption="errors[0]"
                placeholder="Masukkan Nama Lengkapmu"
                style="margin-bottom: 16px"
              />
            </ValidationProvider>
            <p class="radio-label">Jenis Kelamin</p>
            <div class="radio-group">
              <input id="male" v-model="gender" name="gender" type="radio" value="M" class="body3" />
              <label for="male" style="margin-right: 35px">Pria</label>
              <input id="female" v-model="gender" name="gender" type="radio" value="F" class="body3" />
              <label for="female">Wanita</label>
            </div>
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
    profile: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      fullName: '',
      gender: 'M',
      activeModalChangeProfile: false
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalChangeProfile = val
    },
    activeModalChangeProfile(val) {
      this.$emit('update:activeModal', val)
    }
  },
  created() {
    this.fullName = this.profile.first_name + ' ' + this.profile.last_name
    this.gender = this.profile.gender
  },
  methods: {
    onSubmit() {
      const firstName = this.fullName.includes(' ') ? this.fullName.split(' ').slice(0, 1).join(' ') : this.fullName
      const lastName = this.fullName.includes(' ') ? this.fullName.split(' ').slice(1).join(' ') : ''
      this.$repositories.account
        .edit(this.profile.id, {
          first_name: firstName,
          last_name: lastName,
          gender: this.gender,
          msisdn: this.profile.msisdn,
          email: this.profile.email
        })
        .then(async (_) => {
          this.$vs.loading()
          await this.$store.dispatch('user/fetchAccount', this.profile.id)
          this.$vs.loading.close()
          window.location.replace('/peminjam/account/setting/account')
        })
    }
  }
}
</script>

<style scoped>
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
</style>
