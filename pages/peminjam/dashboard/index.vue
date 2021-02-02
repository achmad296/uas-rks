<template>
  <div class="dashboard">
    <Headerbar title="Dashboard" />
    <div class="container">
      <div v-if="noticableCampaign.length" class="notification-wrapper">
        <deadline-notification
          v-for="item in noticableCampaign"
          :key="item.id"
          category="LAPORAN"
          :campaign-id="item.campaign_id"
          :campaign-title="item.title"
          :duedate="new Date(item.duedate)"
        />
      </div>
      <div class="mission-wrapper bg-white br-16 p-16">
        <subtitle-1>Hai Sdr. {{ account.first_name }},</subtitle-1>
        <body-2 class="black mb-16">
          Selamat datang di Yubibursa. Selesaikan misimu untuk bisa mengajukan pinjaman.
        </body-2>
        <div
          v-for="(step, idx) in fillBusinessDataStep"
          :key="step.title"
          class="container p-16 mb-16 br-16 bg-blue-20"
        >
          <div class="row align-items-center">
            <div class="col-4 col-sm-3 col-lg-2">
              <img class="img-64" :src="idx === 0 ? ktpImage : otpImage" :alt="step.altImg" />
            </div>
            <div class="col-8 col-sm-6 col-lg-7">
              <subtitle-1>{{ step.title }}</subtitle-1>
              <body-2> {{ step.desc }} </body-2>
            </div>
            <div v-if="$mq === 'xs'" class="col-4"></div>
            <div class="col-8 col-sm-3 col-lg-3" :class="btnPosition">
              <y-btn
                v-if="idx === 1 && !account.is_msisdn_verified"
                :label="step.btnLabel"
                variant="secondary"
                @click.native="step.btnFunc"
              ></y-btn>
              <y-btn
                v-else-if="idx === 0 && !idPosted"
                :label="step.btnLabel"
                variant="secondary"
                @click.native="step.btnFunc"
              ></y-btn>
              <button v-else style="border: none; background: transparent">
                <div class="done-wrapper">
                  <span class="material-icons">check_circle</span>
                  <p class="done-label">Selesai</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal :active-modal.sync="activeModalKTP" title="Lengkapi Data KTP dan NPWP">
        <template v-slot:body>
          <div id="modalktp" class="vs-con-loading__container">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(postLegalDoc)">
                <ValidationProvider v-slot="{ classes, errors }" rules="required|numeric|idCard">
                  <basic-input
                    id="No-KTP"
                    v-model="businessData.idCardNumber"
                    :classes="classes"
                    :caption="errors[0]"
                    label="Nomor KTP"
                    placeholder="Masukan No KTP"
                  />
                </ValidationProvider>
                <label class="mt-16" for="Unggah-KTP">Unggah Foto KTP</label>
                <Upload
                  single-upload
                  :text="businessDataText.unggahKTP.titleInput"
                  :desc-input="businessDataText.unggahKTP.descInput"
                  :files.sync="fileKTP"
                  file-type="images"
                />
                <ValidationProvider v-slot="{ classes, errors }" rules="required|numeric|idCard">
                  <basic-input
                    id="No-NPWP"
                    v-model="businessData.NpwpNumber"
                    :classes="classes"
                    :caption="errors[0]"
                    label="Nomor NPWP"
                    placeholder="Masukan No NPWP"
                    class="mt-16"
                  />
                </ValidationProvider>
                <label class="mt-16" for="Unggah-KTP">Unggah Foto NPWP</label>
                <Upload
                  single-upload
                  :text="businessDataText.unggahKTP.titleInput"
                  :desc-input="businessDataText.unggahKTP.descInput"
                  :files.sync="fileNpwp"
                  file-type="images"
                />
                <y-btn size="large-full" label="Simpan" type="submit" class="mt-24"></y-btn>
              </form>
            </ValidationObserver>
          </div>
        </template>
      </Modal>
    </div>
    <modal-contact-verification :active-modal.sync="activeModalMsisdnVerification" :msisdn="account.msisdn" />
  </div>
</template>
<script>
import ktpImage from '~/assets/images/dashboard/illustrasi-ktp.svg'
import otpImage from '~/assets/images/dashboard/illustrasi-otp.svg'

export default {
  layout: 'cms',
  fetch() {
    Promise.all([this.initId(), this.initNotifications()])
  },
  data() {
    return {
      ktpImage,
      otpImage,
      activeModalKTP: false,
      activeModalMsisdnVerification: false,
      account: {},
      fileKTP: [],
      fileNpwp: [],
      noticableCampaign: [],
      OtpCode: 0,
      fillBusinessDataStep: [
        {
          title: '1. Lengkapi Data KTP dan NPWP',
          desc: 'Lengkapi data nomor kartu dan unggah foto.',
          btnLabel: 'Lengkapi Data',
          img: 'illustrasi-ktp.svg',
          altImg: 'ilustrasi-ktp',
          btnFunc: () => {
            this.activeModalKTP = true
          }
        },
        {
          title: '2. Verifikasi No. Handphonemu',
          desc: 'Terima kode OTP dan verifikasi.',
          btnLabel: 'Verifikasi',
          img: 'illustrasi-otp.svg',
          altImg: 'ilustrasi-otp',
          btnFunc: () => {
            this.activeModalMsisdnVerification = true
          }
        }
      ],
      businessData: {
        idCardNumber: null,
        NpwpNumber: null
      },
      businessDataText: {
        unggahKTP: {
          titleInput: 'Pilih atau letakan file disini.',
          descInput: 'Ekstensi File : JPG, JPEG, PNG\nMaksimal Ukuran : 10 Mb'
        }
      }
    }
  },
  computed: {
    cardStyle() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'm-16' : 'm-24'
    },
    btnPosition() {
      return this.$mq === 'xs' ? 'text-left mt-12' : 'text-right'
    },
    idPosted() {
      return this.businessData.idCardNumber && this.businessData.NpwpNumber
    }
  },
  created() {
    this.account = this.$store.getters['user/getUserAccount']
  },
  methods: {
    async initNotifications() {
      try {
        const campaignRes = await this.$repositories.campaign.getFromBusinessId(
          this.$store.getters['user/getUserBusinessId']
        )
        const campaigns = campaignRes.data.response.results

        const filteredCampaigns = campaigns.filter((campaign) => campaign.status === 'ON_PROGRESS')
        const _this = this
        filteredCampaigns.forEach(async function (campaign, index) {
          try {
            const campaignReportsRes = await _this.$repositories.campaign.getCampaignReport(campaign.id)

            _this.noticableCampaign.push({
              ...campaignReportsRes.data.response.results[0],
              title: campaign.title
            })
          } catch (err) {
            throw new Error(err)
          }
        })
      } catch (err) {
        throw new Error(err)
      }
    },
    async initId() {
      try {
        const id = this.$store.getters['user/getUserAccount'].id
        const ktpRes = await this.$repositories.account.getKtp(id)

        this.businessData.idCardNumber = ktpRes.data.response.results[0].identity

        const npwpRes = await this.$repositories.account.getNpwp(id)

        this.businessData.NpwpNumber = npwpRes.data.response.results[0].identity
      } catch (err) {
        throw new Error(err)
      }
    },
    postKTP() {
      const formData = new FormData()
      formData.append('identity', this.businessData.idCardNumber)
      formData.append('file', this.fileKTP[0])
      return this.$repositories.legaldoc
        .uploadKtp(this.account.id, formData)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response.data
        })
    },
    postNPWP() {
      const formData = new FormData()
      formData.append('identity', this.businessData.NpwpNumber)
      formData.append('file', this.fileNpwp[0])
      return this.$repositories.legaldoc
        .uploadNpwp(this.account.id, formData)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response.data
        })
    },
    async postLegalDoc() {
      this.$vs.loading({
        container: '#modalktp',
        scale: 0.6
      })
      const [res, res2] = await Promise.all([this.postKTP(), this.postNPWP()])
      if (res.status === 201 && res2.status === 201) {
        this.$vs.loading.close('#modalktp > .con-vs-loading')
        this.activeModalKTP = false

        this.$vs.notify({
          title: 'Unggah Berhasil!',
          text: 'KTP dan NPWP Anda telah berhasil tersimpan',
          color: '#66E0A3',
          position: 'top-center',
          time: 5000
        })
      } else {
        this.$vs.loading.close('#modalktp > .con-vs-loading')

        this.$vs.notify({
          title: 'Unggah tidak berhasil!',
          text: 'Periksa jaringan internetmu dan coba lagi',
          color: '#DD403A',
          position: 'top-center',
          time: 5000
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 24px;
}

.mission-wrapper {
  margin-top: 24px;
}

.mt-69 {
  margin-top: 69px;
}
.mb-118 {
  margin-bottom: 118px;
}

.done-wrapper {
  width: 103px;
  padding: 8px 16px;
  background: #00cc66;
  border-radius: 8px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.done-wrapper .material-icons {
  margin-right: 9.5px;
}
</style>
