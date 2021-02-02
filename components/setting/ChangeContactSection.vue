<template>
  <div v-if="activeTab === 0" class="change-contact-section">
    <div class="section-header">
      <span class="material-icons" @click="$emit('change-tab')">arrow_back</span>
      <subtitle-1>Amankan Akun</subtitle-1>
    </div>
    <div class="form-section">
      <body-2 style="margin-bottom: 16px"
        >Untuk mengubah informasi kontak amankan akunmu terlebih dahulu dengan masukan kata sandi.
      </body-2>
      <auth-form :email="profile.email" @change-tab="activeTab++" @change-password="onPasswordChange" />
    </div>
  </div>

  <div v-else-if="activeTab === 1" class="change-contact-section">
    <div class="section-header">
      <span class="material-icons" @click="$emit('change-tab')">arrow_back</span>
      <subtitle-1>{{ isEmail ? 'Ubah Email' : 'Ubah No. Handphone' }}</subtitle-1>
    </div>
    <div class="form-section">
      <body-2 v-if="isEmail" style="margin-bottom: 16px"
        >Emailmu saat ini : <span style="font-weight: bold">{{ profile.email }}</span
        >. Untuk mengubahnya masukan email barumu.</body-2
      >
      <body-2 v-else style="margin-bottom: 16px"
        >No. Handphonemu saat ini : <span style="font-weight: bold">{{ profile.msisdn }}</span
        >. Untuk mengubahnya masukan No. Handphone barumu.</body-2
      >
      <contact-form
        :password="password"
        :profile="{ id: profile.id, msisdn: profile.msisdn, email: profile.email }"
        :is-email="isEmail"
        @change-tab="activeTab++"
        @pass-contact="
          (value) => {
            isEmail ? (email = value) : (msisdn = value)
          }
        "
      />
    </div>
  </div>

  <div v-else class="change-contact-section">
    <div class="section-header">
      <span class="material-icons" @click="onFinish">arrow_back</span>
      <subtitle-1>{{ isEmail ? 'Ubah Email' : 'Ubah No. Handphone' }}</subtitle-1>
    </div>
    <div class="success-content">
      <img
        :src="
          email.length
            ? require('~/assets/images/setting/email-changed.png')
            : require('~/assets/images/setting/msisdn-changed.png')
        "
        alt=""
      />
      <subtitle-2 style="margin-bottom: 24px"
        >{{ email.length ? 'Email' : 'No. Handphone' }} telah diubah menjadi :
        <span style="font-weight: bold">{{ email.length ? email : msisdn }}</span
        >. Selanjutnya kamu bisa melakukan verifikasi!</subtitle-2
      >
      <y-btn
        label="Verifikasi"
        @click.native="email.length ? (activeModalEmailVerification = true) : (activeModalMsisdnVerification = true)"
      />
    </div>
    <modal-contact-verification :active-modal.sync="activeModalEmailVerification" :email="email" />
    <modal-contact-verification :active-modal.sync="activeModalMsisdnVerification" :msisdn="msisdn" />
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: () => ({})
    },
    isEmail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab: 0,
      email: '',
      msisdn: '',
      password: '',
      activeModalEmailVerification: false,
      activeModalMsisdnVerification: false
    }
  },
  methods: {
    onFinish() {
      window.location.replace('/peminjam/account/setting/account')
    },

    onPasswordChange(password) {
      this.password = password
    }
  }
}
</script>

<style scoped>
.change-contact-section {
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

img {
  margin-bottom: 8px;
  width: 104px;
}

.success-content {
  margin: 56px auto 0 auto;
  text-align: center;
}

.body2 {
  color: #00171f;
}

.success-content .subtitle2 {
  color: #00171f;
  font-weight: normal;
}

.material-icons {
  cursor: pointer;
}
</style>
