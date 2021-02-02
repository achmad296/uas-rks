<template>
  <Modal :active-modal.sync="activeModalInvoice" :title="titleModal">
    <template v-slot:body>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 invoice">
            <div class="caption1 black-60">
              <div class="d-flex">
                <div>No. Invoice</div>
                <div class="flex-fill text-right">
                  {{ value.no }}
                </div>
              </div>
              <div class="d-flex mt-2">
                <div>Tanggal</div>
                <div class="flex-fill text-right">
                  {{ dateFormat(value.timestampIssued) }}
                </div>
              </div>
              <div class="d-flex mt-2">
                <div>Status Transaksi</div>
                <div class="flex-fill text-right">
                  <Status v-model="value.status" />
                </div>
              </div>
            </div>
            <div class="seperator-dash my-16" />
            <body-3 class="mb-1 black">Batas Waktu Pembayaran</body-3>
            <subtitle-2 :id="idClock" class="red">
              <span class="days">1</span> Hari, <span class="hours">1</span> Jam : <span class="minutes">1</span> Menit
              : <span class="seconds">1</span> Detik
            </subtitle-2>
            <caption-1 class="red">{{ dateFormat2(value.timestampExpired) }}</caption-1>

            <body-3 class="mt-16 black">{{ tujuanText }}</body-3>
            <body-3 class="black">{{ value.bank.alias }}</body-3>
            <body-3 class="black">A/n {{ value.account.name }}</body-3>
            <div class="d-flex align-items-center">
              <subtitle-1 class="blue">{{ accountNumberFormat(value.account.number) }}</subtitle-1>
              <y-btn
                v-if="isCredit"
                label="Salin"
                variant="secondary"
                size="small"
                class="mx-8"
                @click.native="copyToClipboard(value.account.number)"
              />
            </div>

            <body-3 class="mt-16 black">{{ totalText }}</body-3>
            <div v-if="isCredit" class="d-flex align-items-center">
              <subtitle-1 class="blue"
                >{{ currencyFormat(remove3LastChar(value.summary.total)) }}.<span class="border-blue">{{
                  get3LastChar(value.summary.total)
                }}</span>
              </subtitle-1>
              <y-btn
                label="Salin"
                variant="secondary"
                size="small"
                class="mx-8"
                @click.native="copyToClipboard(value.summary.total)"
              />
            </div>
            <div v-if="isDebit" class="d-flex">
              <subtitle-1 class="blue">{{ currencyFormat(value.summary.total) }}</subtitle-1>
            </div>

            <caption-1 class="black-60">
              {{ captionText }}
            </caption-1>
            <div class="seperator-dash my-16" />
            <vs-collapse class="p-0">
              <vs-collapse-item class="p-0">
                <div slot="header">Detail Transaksi</div>
                <div class="caption1 black-60">
                  <div v-if="isCredit" class="d-flex">
                    <div>Metode Pembayaran</div>
                    <div class="flex-fill text-right">
                      {{ value.paymentMethod }}
                    </div>
                  </div>
                  <div class="d-flex">
                    <div>Tujuan Bank</div>
                    <div class="flex-fill text-right">
                      {{ value.bank.alias }}
                    </div>
                  </div>
                  <div class="d-flex">
                    <div>Pemilik Rekening</div>
                    <div class="flex-fill text-right">
                      {{ value.account.name }}
                    </div>
                  </div>
                  <div class="d-flex">
                    <div>Nomor Rekening</div>
                    <div class="flex-fill text-right">
                      {{ accountNumberFormat(value.account.number) }}
                    </div>
                  </div>
                  <div class="d-flex">
                    <div>Kode Unik</div>
                    <div class="flex-fill text-right">
                      {{ value.summary.uniqueCode }}
                    </div>
                  </div>
                  <div class="d-flex">
                    <div>Total</div>
                    <div class="flex-fill text-right">
                      {{ currencyFormat(value.summary.total) }}
                    </div>
                  </div>
                </div>
              </vs-collapse-item>
            </vs-collapse>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    activeModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeModalInvoice: false,
      // C = Credit (Tambah Dana) and D = Debit (Tarik Dana)
      typeInvoice: '',
      idClock: '',
      timeinterval: () => {}
    }
  },
  computed: {
    // idClock() {
    //   if (this.value.no) {
    //     return this.value.no
    //   } else {
    //     return '123848288222'
    //   }
    // },
    isCredit() {
      return this.typeInvoice === 'C'
    },
    isDebit() {
      return this.typeInvoice === 'D'
    },
    titleModal() {
      return this.isCredit ? 'Transaksi Tambah Dana' : 'Transaksi Tarik Dana'
    },
    tujuanText() {
      return this.isCredit ? 'Tujuan Pembayaran' : 'Tujuan Penarikan'
    },
    totalText() {
      return this.isCredit ? 'Total Pembayaran' : 'Total Penarikan'
    },
    captionText() {
      return this.isCredit
        ? 'Mohon lakukan pembayaran sesuai jumlah yang tertera (termasuk 3 digit terakhir).'
        : 'Mohon menunggu, permintaan penarikan danamu akan otomatis terkirim ke rekening tujuan dalam batas waktu yang sudah ditentukan. '
    }
  },
  watch: {
    value(val) {
      this.typeInvoice = val.type.toUpperCase()
      this.idClock = this.value.no
      clearInterval(this.timeinterval)
      const _this = this
      setTimeout(function () {
        _this.interval(val.no, val.timestampExpired, val.status)
      }, 100)
    },
    activeModal(val) {
      this.activeModalInvoice = val
    },
    activeModalInvoice(val) {
      this.$emit('update:activeModal', val)
    }
  },
  methods: {
    currencyFormat(val) {
      return 'Rp ' + val.toLocaleString('id-ID')
    },
    get3LastChar(string) {
      string = string.toString()
      return string.substring(string.length - 3)
    },
    remove3LastChar(string) {
      string = string.toString()
      return string.slice(0, -3)
    },
    accountNumberFormat(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d\d)+(?!\d))/g, '$1 ')
    },

    dateFormat(date) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      const d = new Date(date)
      return (
        d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes()
      )
    },
    dateFormat2(date) {
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
      const d = new Date(date)
      return days[d.getDay()] + ', ' + this.dateFormat(date)
    },

    copyToClipboard(str) {
      const el = document.createElement('textarea')
      el.value = str
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },

    getTimeRemaining(endtime) {
      const total = Date.parse(endtime) - Date.parse(new Date())
      const seconds = Math.floor((total / 1000) % 60)
      const minutes = Math.floor((total / 1000 / 60) % 60)
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
      const days = Math.floor(total / (1000 * 60 * 60 * 24))

      return {
        total,
        days,
        hours,
        minutes,
        seconds
      }
    },

    initializeClock(id, endtime) {
      const clock = document.getElementById(id)
      const daysSpan = clock.querySelector('.days')
      const hoursSpan = clock.querySelector('.hours')
      const minutesSpan = clock.querySelector('.minutes')
      const secondsSpan = clock.querySelector('.seconds')

      const _this = this

      function updateClock() {
        const t = _this.getTimeRemaining(endtime)

        daysSpan.innerHTML = t.days
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2)
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2)
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2)

        if (t.total <= 0) {
          clearInterval(_this.timeinterval)
        }
      }

      updateClock()
      _this.timeinterval = setInterval(updateClock, 1000)
    },

    interval(id, timestampExpired, status) {
      const s = status.toLowerCase()
      if (s && id) {
        id = id.toString()
        const deadline = new Date(timestampExpired)
        this.initializeClock(id, deadline)
      }
    }
  }
}
</script>

<style scoped>
.seperator-dash {
  border-bottom: 2px dashed #ebeaea;
}

.invoice {
  background: #fafbfc;
  border: 1px solid #ebeaea;
  padding-top: 16px;
  padding-bottom: 16px;
}

.border-blue {
  border: 2px solid #18a0fb !important;
  border-radius: 8px;
  padding: 1px;
  margin: 1px;
}
::v-deep .con-content--item {
  padding-right: 0;
}
::v-deep .vs-collapse-item--header {
  margin-right: -16px;
}
</style>
