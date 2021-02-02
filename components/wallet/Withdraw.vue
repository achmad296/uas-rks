<template>
  <div>
    <Modal :active-modal.sync="activeModalWithdraw" title="Tarik Dana">
      <template v-slot:body>
        <div class="bg-primary1 br-8 p-16 mb-24">
          <div class="d-flex align-items-center">
            <body-2 class="white">Saldo</body-2>
            <h3 class="flex-fill text-right white">{{ walletAmmount.toLocaleString('id-ID') }}</h3>
          </div>
          <Separator />
          <div class="d-flex">
            <img src="~assets/icons/info-circle.svg" class="mr-8" />
            <Caption2 class="white flex-fill"
              >Dana tidak dapat ditarik seluruhnya. Minimal saldo mengendap di dalam YubiSAKU adalah Rp 10.000.
            </Caption2>
          </div>
        </div>

        <label class="mb-8">Rekening Tujuan</label>
        <div v-if="selectedBank.bank_id" class="d-flex bg-input border-black-20 p-16 mb-16">
          <div>
            <BankImages :id="selectedBank.bank_id" />
          </div>
          <div class="flex-fill body3 black" :class="isMobile ? 'ml-8' : 'ml-16'">
            <span class="d-flex mb-1">{{
              banks.filter((bankInfo) => bankInfo.id === selectedBank.bank_id)[0].corporate_name
            }}</span>
            <span class="d-flex mb-1">{{ selectedBank.holder }}</span>
            <span class="d-flex mb-1">{{ accountNumberFormat(selectedBank.number) }}</span>
            <Status v-if="selectedBank.isPrimary" value="Rekening Utama" />
            <y-btn
              v-if="isMobile"
              label="Ubah"
              variant="secondary"
              class="d-flex mt-2"
              @click.native="activeModalChangeBank = true"
            />
          </div>
          <div>
            <y-btn
              v-if="!isMobile"
              label="Ubah"
              variant="secondary"
              class="d-flex mt-2"
              @click.native="activeModalChangeBank = true"
            />
          </div>
        </div>
        <div
          v-else
          class="p-16 border-red cursor-pointer d-flex align-items-center mb-16"
          @click="activeModalChangeBank = true"
        >
          <img src="~assets/icons/credit-card.svg" class="mr-16" />
          <body-3 class="primary1">Tambah Rekening Bank</body-3>
        </div>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(withdraw)">
            <ValidationProvider
              v-slot="{ classes, errors }"
              :rules="{ max_money: [walletAmmount - 10000], required: true }"
            >
              <basic-input
                id="nominal-withdraw"
                v-model="withdrawNominalFormatted"
                label="Nominal"
                placeholder="0"
                prepend="Rp"
                :classes="classes"
                :caption="errors[0]"
                is-money
              />
            </ValidationProvider>
            <y-btn
              size="large-full"
              class="mt-64"
              label="Tarik Dana"
              type="submit"
              :disabled="Object.keys(selectedBank).length === 0 && selectedBank.constructor === Object"
            />
          </form>
        </ValidationObserver>
      </template>
    </Modal>
    <ChangeBankAccount v-model="selectedBank" :active-modal.sync="activeModalChangeBank" />
  </div>
</template>

<script>
import { parse } from 'vue-currency-input'
import { currencyOptions } from '../../utils/currencyOptions'

export default {
  props: {
    activeModal: {
      type: Boolean,
      default: false
    },
    walletAmmount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeModalWithdraw: false,
      activeModalChangeBank: false,
      selectedBank: {},
      banks: [],
      withdrawNominal: null,
      withdrawNominalFormatted: '',
      saldo: 50000
    }
  },
  computed: {
    isMobile() {
      return this.$mq === 'xs'
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalWithdraw = val
    },
    activeModalWithdraw(val) {
      this.$emit('update:activeModal', val)
    },
    withdrawNominalFormatted(val) {
      this.withdrawNominal = parse(val, currencyOptions)
    }
  },
  created() {
    this.banks = this.$store.getters['bank/getBanks']
  },
  methods: {
    withdraw() {
      if (Object.keys(this.selectedBank).length === 0 && this.selectedBank.constructor === Object) {
        this.$vs.notify({
          title: 'Gagal!',
          text: 'Pilih rekening bank',
          color: '#DD403A',
          position: 'top-center'
        })
      }
    },

    accountNumberFormat(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d\d)+(?!\d))/g, '$1 ')
    },

    currencyFormat(val) {
      return 'Rp ' + val.toLocaleString('id-ID')
    }
  }
}
</script>

<style></style>
