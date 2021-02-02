<template>
  <div>
    <Headerbar title="Yubisaku" />
    <div class="container" :class="$mq === 'xs' ? 'mb-16' : 'my-24'">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-4" :style="saldoContainerStyle">
          <div class="bg-primary1" style="height: 156px" :class="saldoStyle">
            <div class="py-16 text-center" style="height: 92px">
              <Body-2 class="white">Saldo</Body-2>
              <h-3 class="white">Rp {{ walletAmmount.toLocaleString('id-ID') }}</h-3>
            </div>
            <div
              class="balance-tab-bar d-flex align-items-center justify-content-center b-16"
              style="height: 65px"
              @click="
                walletAmount > 10000
                  ? (activeModalWithdraw = true)
                  : $vs.notify({
                      title: 'Mohon maaf',
                      text: 'Saldo tidak mencukupi untuk melakukan penarikan dana',
                      color: '#DD403A',
                      position: 'top-center'
                    })
              "
            >
              <!-- <div
                class="wallet-topup-btn flex-even align-self-stretch d-flex align-items-center px-12"
                @click="activeModalTopup = true"
              >
                <img src="~/assets/icons/wallet-topup.svg" alt="wallet-topup" />
                <body-2 class="ml-8">Tambah Dana</body-2>
              </div> -->
              <div class="wallet-withdraw-btn d-flex align-items-center justify-center px-12">
                <img src="~/assets/icons/wallet-withdraw.svg" alt="wallet-withdraw" />
                <body-2 class="ml-8">Tarik Dana</body-2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8" :class="historyMobile">
          <Tabs :items="['Withdraw-History']">
            <!-- <Tab title="Semua" :class="tabStyle">
              <div v-if="!history.length" class="d-flex justify-content-center py-64">
                <div class="text-center">
                  <img src="~/assets/icons/transaction-wallet.svg" alt="transaction-wallet" />
                  <subtitle-2>Belum ada transaksi.</subtitle-2>
                </div>
              </div>
              <div v-else class="container">
                <div class="row">
                  <div class="col-12 text-center py-24">
                    <body-3>Menampilkan <strong>4 dari 100</strong> transaksi.</body-3>
                  </div>
                  <div class="col-12">
                    <div class="seperator" />
                  </div>
                </div>
                <div
                  v-for="item in history"
                  :key="item.id"
                  class="row align-items-center py-16 cursor-pointer"
                  @click="setActiveModalInvoice(item.dataInvoice)"
                >
                  <div class="col-2 col-lg-1">
                    <img :src="iconWallet(item.type)" />
                  </div>
                  <div class="col-6 col-lg-4 px-24">
                    <body-3 class="black">{{ item.name }}</body-3>
                    <caption-1 class="black-60">{{ $moment(item.date).format('DD MMM YYYY - HH:mm') }} WIB</caption-1>
                    <Status v-if="isTablet" v-model="item.status" />
                  </div>
                  <div v-if="!isTablet" class="col-4">
                    <Status v-model="item.status" />
                  </div>
                  <div class="col-4 col-lg-3 text-right">
                    <p :class="nominalStyle">{{ currencyFormat(item.nominal) }}</p>
                  </div>
                  <div class="col-12 mt-16">
                    <div class="seperator" />
                  </div>
                </div>
                <div class="col-12 text-center pb-24">
                  
                </div>
              </div>
            </Tab>
            <Tab title="Tambah Dana" :class="tabStyle">
              <div class="d-flex justify-content-center py-64">
                <div class="text-center">
                  <img src="~/assets/icons/transaction-wallet.svg" alt="transaction-wallet" />
                  <subtitle-2>Belum ada transaksi.</subtitle-2>
                </div>
              </div>
            </Tab> -->
            <Tab title="Tarik Dana" :class="tabStyle">
              <div class="d-flex justify-content-center py-64">
                <div class="text-center">
                  <img src="~/assets/icons/transaction-wallet.svg" alt="transaction-wallet" />
                  <subtitle-2>Belum ada transaksi.</subtitle-2>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
    <Topup :active-modal.sync="activeModalTopup" />
    <Withdraw :active-modal.sync="activeModalWithdraw" :wallet-ammount="walletAmmount"></Withdraw>
    <Invoice v-model="dataInvoice" :active-modal.sync="activeModalInvoice" />
  </div>
</template>

<script>
export default {
  layout: 'cms',
  async fetch() {
    const businessRes = await this.$repositories.business.getByUser(this.$store.getters['user/getUserAccount'].id)
    this.walletAmmount = businessRes.data.response.results[this.$store.getters['user/getActiveBusinessIdx']].balance
  },
  data() {
    return {
      walletAmmount: 0,
      activeModalTopup: false,
      activeModalInvoice: false,
      activeModalWithdraw: false,
      history: [],
      // history: [
      //   {
      //     id: 1,
      //     name: 'Tambah Dana',
      //     type: 'C',
      //     date: Date.now(),
      //     nominal: 30000000,
      //     status: 'pending',
      //     statusText: 'Berhasil',
      //     dataInvoice: {
      //       no: 123848288222,
      //       account: {
      //         name: 'PT Yukbisnis Indonesia',
      //         number: 123345675434
      //       },
      //       bank: {
      //         alias: 'Bank BNI Syariah'
      //       },
      //       plan: {
      //         description: ''
      //       },
      //       status: 'pending',
      //       type: 'C',
      //       paymentMethod: 'Transfer Bank',
      //       summary: {
      //         priceInitial: 0,
      //         total: 150230,
      //         uniqueCode: 230
      //       },
      //       timestampExpired: new Date().setDate(new Date().getDate() + 3),
      //       timestampIssued: Date()
      //     }
      //   },
      //   {
      //     id: 2,
      //     name: 'Tarik Dana',
      //     type: 'D',
      //     date: Date.now(),
      //     nominal: 10000000,
      //     status: 'process',
      //     statusText: 'Menunggu Pembayaran',
      //     dataInvoice: {
      //       no: 38482889272,
      //       account: {
      //         name: 'BARRY ALLEN',
      //         number: 123345675434
      //       },
      //       bank: {
      //         alias: 'BANK RAKYAT INDONESIA (BRI)'
      //       },
      //       plan: {
      //         description: ''
      //       },
      //       status: 'process',
      //       type: 'D',
      //       paymentMethod: 'Transfer Bank',
      //       summary: {
      //         priceInitial: 0,
      //         total: 50460,
      //         uniqueCode: 460
      //       },
      //       timestampExpired: new Date().setDate(new Date().getDate() + 2),
      //       timestampIssued: Date()
      //     }
      //   }
      // ],
      currentPage: 1,
      dataInvoice: {
        no: 0,
        account: {
          name: '',
          number: 0
        },
        bank: {
          alias: ''
        },
        plan: {
          description: ''
        },
        status: '',
        type: '',
        paymentMethod: '',
        summary: {
          priceInitial: 0,
          total: 0,
          uniqueCode: 0
        },
        timestampExpired: new Date().setDate(new Date().getDate() + 2),
        timestampIssued: Date()
      }
    }
  },
  computed: {
    historyMobile() {
      if (this.$mq === 'xs') {
        return 'mt-32 p-0'
      } else if (this.$mq === 'md' || this.$mq === 'sm') {
        return 'mt-32'
      } else {
        return ''
      }
    },
    saldoContainerStyle() {
      if (this.$mq === 'xs') {
        return {
          paddingRight: 0,
          paddingLeft: 0
        }
      } else {
        return {}
      }
    },
    tabStyle() {
      if (this.$mq === 'xs') {
        return ''
      } else {
        return 'br-b-16'
      }
    },
    saldoStyle() {
      return this.$mq === 'xs' ? 'br-b-16' : 'br-16'
    },
    nominalStyle() {
      return this.$mq === 'xs' ? 'caption1 f-bold' : 'subtitle2'
    },
    isTablet() {
      if (this.$mq === 'xs' || this.$mq === 'sm' || this.$mq === 'md') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    setActiveModalInvoice(data) {
      this.dataInvoice = data
      this.activeModalInvoice = true
    },
    currencyFormat(val) {
      return 'Rp ' + val.toLocaleString('id-ID')
    },
    iconWallet(entry) {
      entry = entry.toUpperCase()
      switch (entry) {
        case 'C':
          return require('~/assets/icons/topup.svg')
        case 'D':
          return require('~/assets/icons/withdraw.svg')
        default:
          return require('~/assets/icons/topup.svg')
      }
    }
  }
}
</script>

<style scoped>
.v-seperator {
  height: 44px;
  border-right: 1px solid #ebeaea;
}

.balance-tab-bar {
  background: #fff;
}

.balance-tab-bar:hover {
  background: #ebf4fc;
  cursor: pointer;
}

.seperator {
  border-bottom: 0.7px solid #ebeaea;
}
.flex-even {
  flex: 1;
}
/* .wallet-topup-btn,
.wallet-withdraw-btn {
  cursor: pointer;
}
.wallet-topup-btn:hover {
  background: #ebf4fc;
  border-radius: 16px 0 0 16px;
}
.wallet-withdraw-btn:hover {
  background: #ebf4fc;
  border-radius: 0 16px 16px 0;
} */
.br-b-16 {
  border-radius: 0 0 16px 16px;
}
</style>
