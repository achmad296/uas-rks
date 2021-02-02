<template>
  <div class="profile-setting-container">
    <div v-if="activeTab === 0" class="profile-setting">
      <div class="section1">
        <nuxt-link to="/peminjam/account/setting/">
          <i class="material-icons back-icon">arrow_back</i>
        </nuxt-link>
        <div class="profile-picture-wrapper" @click="activeModalChangeProfilePicture = true">
          <div class="profile-picture" :style="profilePicture.length && profilePictureFromApi">
            <img class="edit-icon-pp" src="~assets/icons/edit-red.svg" alt="" />
            <img
              v-if="!profilePicture.length"
              :style="[!profilePicture.length && { marginTop: '12px' }]"
              width="32px"
              src="~assets/icons/profile.svg"
              alt=""
            />
          </div>
        </div>
        <div class="biodata">
          <subtitle-1>{{ profile.first_name + ' ' + profile.last_name }}</subtitle-1>
          <div class="another-biodata">
            <div class="value">
              <p class="body3">Peminjam</p>
              <p class="body3">{{ profile.gender === 'M' ? 'Laki-Laki' : 'Wanita' }}</p>
            </div>
            <img
              class="edit-icon-profile"
              src="~assets/icons/edit-red.svg"
              alt=""
              @click="activeModalChangeProfile = true"
            />
          </div>
        </div>
      </div>
      <div class="section2">
        <subtitle-2>Identitas Diri</subtitle-2>
        <hr />
        <div class="field">
          <div class="field-value">
            <p class="body3">KTP</p>
            <p v-if="ktp.identity.length" class="body3">{{ ktp.identity }}</p>
            <p v-else class="body3">Data belum ada</p>
          </div>

          <p class="body3 change-link" @click="activeModalChangeIdKtp = true">Ubah</p>
        </div>
        <div class="field">
          <div class="field-value">
            <p class="body3">NPWP</p>
            <p v-if="npwp.identity.length" class="body3">{{ npwp.identity }}</p>
            <p v-else class="body3">Data belum ada</p>
          </div>
          <p class="body3 change-link" @click="activeModalChangeIdNpwp = true">Ubah</p>
        </div>
        <subtitle-2 class="identity-label">Informasi Kontak & Keamanan</subtitle-2>
        <hr />
        <div class="field">
          <div class="field-value">
            <p class="body3">Email</p>
            <div class="field-group">
              <p class="body3" style="margin-right: 8px">{{ profile.email }}</p>
              <div v-if="profile.is_email_verified" class="status-badge">
                <caption-2>Terverifikasi</caption-2>
              </div>
              <y-btn
                v-else
                size="small"
                label="Verifikasi"
                style="min-width: 70px"
                @click.native="activeModalEmailVerification = true"
              />
            </div>
          </div>
          <p class="body3 change-link" @click="activeTab = 1">Ubah</p>
        </div>
        <div class="field">
          <div class="field-value">
            <p class="body3">No. Handphone</p>
            <div class="field-group">
              <p class="body3" style="margin-right: 8px">{{ profile.msisdn }}</p>
              <div v-if="profile.is_msisdn_verified" class="status-badge">
                <caption-2>Terverifikasi</caption-2>
              </div>
              <y-btn
                v-else
                size="small"
                label="Verifikasi"
                style="min-width: 70px"
                @click.native="activeModalMsisdnVerification = true"
              />
            </div>
          </div>
          <p class="body3 change-link" @click="activeTab = 2">Ubah</p>
        </div>
        <div class="field">
          <div class="field-value">
            <p class="body3">Password</p>
            <p class="body3">
              <span class="material-icons"> fiber_manual_record </span>
              <span class="material-icons"> fiber_manual_record </span>
              <span class="material-icons"> fiber_manual_record </span>
              <span class="material-icons"> fiber_manual_record </span>
              <span class="material-icons"> fiber_manual_record </span>
              <span class="material-icons"> fiber_manual_record </span>
              <span class="material-icons"> fiber_manual_record </span>
              <span class="material-icons"> fiber_manual_record </span>
            </p>
          </div>
          <p class="body3 change-link" @click="activeTab = 3">Ubah</p>
        </div>
      </div>

      <modal-change-profile-picture :active-modal.sync="activeModalChangeProfilePicture" />
      <modal-change-profile :profile="profile" :active-modal.sync="activeModalChangeProfile" />
      <modal-change-id v-if="ktp.identity.length" :active-modal.sync="activeModalChangeIdKtp" :ktp="ktp" />
      <modal-change-id v-if="npwp.identity.length" :active-modal.sync="activeModalChangeIdNpwp" :npwp="npwp" />
      <modal-contact-verification :active-modal.sync="activeModalEmailVerification" :email="profile.email" />
      <modal-contact-verification :active-modal.sync="activeModalMsisdnVerification" :msisdn="profile.msisdn" />
    </div>

    <change-contact-section v-if="activeTab === 1" :profile="profile" is-email @change-tab="activeTab = 0" />
    <change-contact-section v-if="activeTab === 2" :profile="profile" @change-tab="activeTab = 0" />
    <change-password-section v-if="activeTab === 3" @change-tab="activeTab = 0" />
  </div>
</template>

<script>
export default {
  layout: 'cms',
  fetch() {
    Promise.all([this.initProfilePicture(), this.initKtp(), this.initNpwp()])
  },
  data() {
    return {
      activeTab: 0,
      activeModalChangeProfilePicture: false,
      activeModalChangeProfile: false,
      activeModalChangeIdKtp: false,
      activeModalChangeIdNpwp: false,
      activeModalEmailVerification: false,
      activeModalMsisdnVerification: false,

      ktp: {
        identity: ''
      },
      npwp: {
        identity: ''
      },
      profile: {},
      profilePicture: ''
    }
  },
  computed: {
    profilePictureFromApi() {
      return {
        backgroundImage: `url('${this.profilePicture}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    }
  },
  created() {
    this.profile = this.$store.getters['user/getUserAccount']
  },
  methods: {
    async initProfilePicture() {
      const id = this.$store.getters['user/getUserAccount'].id
      try {
        const accountRes = await this.$repositories.account.getAccountAvatar(id)
        this.profilePicture = accountRes.data.response.results[0].url
      } catch (err) {
        throw new Error(err)
      }
    },
    async initKtp() {
      const id = this.$store.getters['user/getUserAccount'].id
      try {
        const ktpRes = await this.$repositories.account.getKtp(id)
        this.ktp = ktpRes.data.response.results[0]
      } catch (err) {
        throw new Error(err)
      }
    },
    async initNpwp() {
      const id = this.$store.getters['user/getUserAccount'].id
      try {
        const npwpRes = await this.$repositories.account.getNpwp(id)
        this.npwp = npwpRes.data.response.results[0]
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}
</script>

<style scoped>
.profile-setting-container {
  width: 100%;
  min-width: 317px;
}

.profile-setting {
  overflow: auto;
  border-radius: 16px;
  background: linear-gradient(267.87deg, #d30000 0%, #b70000 99.47%);
}

.identity-label {
  margin-top: 33px;
}

.section1 {
  display: flex;
  margin: 48px 16px 0 16px;
}

.back-icon {
  display: none;
}

.profile-picture-wrapper {
  cursor: pointer;
  background-color: #fff;
  padding: 4px;
  border-radius: 16px;
  margin-right: 16px;
  width: 100%;
  max-width: 128px;
  height: 128px;
  z-index: 2;
}

.profile-picture {
  width: 100%;
  height: 100%;
  background-color: #f2f3f4;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
}

.edit-icon-pp {
  align-self: flex-end;
  cursor: pointer;
}

.edit-icon-profile {
  cursor: pointer;
  margin-left: auto;
}

.field-group {
  display: flex;
}

.biodata {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.biodata p {
  color: #fff;
}

.another-biodata {
  display: flex;
}

.another-biodata .value {
  display: flex;
}

.another-biodata p:nth-child(1) {
  margin-right: 24px;
}

.material-icons {
  font-size: 14px;
}

.section2 {
  width: 100%;
  border-radius: 16px;
  background-color: #fff;
  margin-top: -65px;
  padding: 24px 17px 99px 160px;
}

hr {
  border: 0.7px solid #ebeaea;
  margin-bottom: 19px;
  margin-top: 8px;
}

.subtitle2 {
  color: #3c91e6;
}

.field {
  display: flex;
  justify-content: space-between;
  margin-bottom: 13px;
}

.field-value {
  display: grid;
  width: 70%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.field .field-value p.body3 {
  color: #00171f;
}

.field .change-link {
  cursor: pointer;
  color: #d30000;
}

.status-badge {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 20px;
  background-color: #ccf5e0;
}

.status-badge .caption2 {
  color: #00cc66;
}

@media only screen and (max-width: 992px) {
  .profile-setting {
    overflow-y: auto;
  }

  .another-biodata {
    display: flex;
    justify-content: center;
  }

  .another-biodata .value {
    margin-left: auto;
    padding-left: 20px;
  }

  .edit-icon-profile {
    margin-left: auto;
  }

  .section1 {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
  }

  .profile-picture-wrapper {
    margin: 16px auto 0 auto;
  }

  .section2 {
    padding: 94px 16px 1px 16px;
  }
}

@media only screen and (max-width: 767px) {
  .profile-setting {
    border-radius: 0px;
    height: calc(100vh - 64px);
    min-width: 0;
  }

  .section2 {
    border-radius: 16px 16px 0 0;
    height: calc(100% - 64px);
  }

  .back-icon {
    cursor: pointer;
    display: block;
    position: absolute;
    color: #fff;
    top: 16px;
    left: 17px;
    font-size: 24px;
  }

  .edit-icon-profile {
    position: absolute;
    top: 16px;
    right: 17px;
  }

  .another-biodata .value {
    margin-left: 0;
    padding-left: 0;
  }
}
</style>
