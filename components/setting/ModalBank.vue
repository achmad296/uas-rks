<template>
  <modal :active-modal.sync="activeModalBank" title="Metode Pembayaran">
    <template v-slot:body>
      <div class="modal-add-bank">
        <p class="label">Transfer Bank</p>
        <bank-box
          v-for="(bank, idx) in bankList"
          :key="bank.id"
          :active="selectedBank === idx"
          :bank="bank"
          @click.native="onActiveBank(idx)"
        />

        <y-btn label="Pilih" size="large-full" @click.native="pickBankAccount" />
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
    }
  },
  data() {
    return {
      activeModalBank: false,
      selectedBank: 0,
      activeModalChangeBank: false,
      whereActiveBank: 0,
      bankList: [
        {
          id: 3,
          name: 'Bank BNI Syariah'
        },
        {
          id: 1,
          name: 'Bank Mandiri'
        },
        {
          id: 0,
          name: 'Bank BCA'
        },
        {
          id: 2,
          name: 'Bank BRI'
        }
      ]
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalBank = val
    },
    activeModalBank(val) {
      this.$emit('update:activeModal', val)
    }
  },
  methods: {
    pickBankAccount() {
      this.$emit('input', this.bankList[this.whereActiveBank])
      this.activeModalBank = false
    },
    onActiveBank(index) {
      this.bankList[this.whereActiveBank].isActive = false

      this.selectedBank = index
      this.whereActiveBank = index
    }
  }
}
</script>

<style scoped>
.label {
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;

  color: #847f82;
  margin-bottom: 8px;
}

.vs-button {
  margin-top: 20px;
}
</style>
