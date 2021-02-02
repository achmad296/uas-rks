<template>
  <Modal :active-modal.sync="activeModalChangeBank" title="Ubah Rekening Tujuan">
    <template v-slot:body>
      <div
        v-for="(bank, i) in bankAccount"
        :key="bank.id"
        class="d-flex bg-input border-black-20 p-16 mb-16 cursor-pointer"
        @click="onActiveBank(i)"
      >
        <BankImages :id="bank.bank_id" />
        <div class="flex-fill body3 black" :class="isMobile ? 'ml-8' : 'ml-16'">
          <span class="d-flex mb-1">{{
            banks.filter((bankInfo) => bankInfo.id === bank.bank_id)[0].corporate_name
          }}</span>
          <span class="d-flex mb-1">{{ bank.holder }}</span>
          <div class="d-flex">
            <div class="flex-fill d-flex flex-column">
              <span class="flex-fill mb-1">{{ accountNumberFormat(bank.number) }}</span>
              <!-- <div v-if="bank.isPrimary"><Status value="Rekening Utama" /></div> -->
            </div>
            <img class="align-self-end" :src="require(`~/assets/icons/${activeIcon(selectedBank === i)}.svg`)" />
          </div>
        </div>
      </div>
      <y-btn label="Pilih" size="large-full" class="mt-64" @click.native="pickBankAccount" />
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
  async fetch() {
    await this.$repositories.bankAccount
      .getByAccount(this.$store.getters['user/getUserAccount'].id)
      .then((res) => (this.bankAccount = res.data.response.results))
  },
  data() {
    return {
      selectedBank: -1,
      activeModalChangeBank: false,
      whereActiveBank: 0,
      bankAccount: [],
      banks: [
        {
          id: '1',
          alias: 'PT. BANK RAKYAT INDONESIA (BRI)',
          account: { holder: 'BARRY ALLEN', number: '120989091944' },
          isActive: true,
          isPrimary: true
        },
        {
          id: '2',
          alias: 'PT. BANK CENTRAL ASIA (BCA)',
          account: { holder: 'IRIST WEST ALLEN', number: '120989091944' },
          isActive: false,
          isPrimary: false
        }
      ]
    }
  },
  computed: {
    isMobile() {
      return this.$mq === 'xs'
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalChangeBank = val
    },
    activeModalChangeBank(val) {
      this.$emit('update:activeModal', val)
    }
  },
  created() {
    this.banks = this.$store.getters['bank/getBanks']
  },
  methods: {
    pickBankAccount() {
      this.$emit('input', this.bankAccount[this.whereActiveBank])
      this.activeModalChangeBank = false
    },
    accountNumberFormat(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d\d)+(?!\d))/g, '$1 ')
    },

    activeIcon(boolean) {
      return boolean ? 'checkmark-circle-active' : 'checkmark-circle'
    },

    onActiveBank(index) {
      this.bankAccount[this.whereActiveBank].isActive = false

      this.selectedBank = index
      this.whereActiveBank = index
    }
  }
}
</script>

<style></style>
