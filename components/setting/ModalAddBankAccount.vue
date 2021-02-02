<template>
  <modal :active-modal.sync="activeModalAddBankAccount" title="Tambah Rekening">
    <template v-slot:body>
      <div class="modal-add-bank-account">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form class="input-container" @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider v-slot="{ classes, errors }" rules="required">
              <basic-input
                id="holder"
                v-model="holder"
                label="Name Pemilik"
                :classes="classes"
                :caption="errors[0]"
                placeholder="Masukkan Nama Lengkapmu"
                style="margin-bottom: 16px"
              />
            </ValidationProvider>
            <auto-complete-bank
              placeholder="Pilih Nama Bank"
              label="Nama Bank"
              class="autosuggest-field"
              style="margin-bottom: 16px"
              @input-bank="inputBank"
            />
            <ValidationProvider v-slot="{ classes, errors }" rules="required">
              <basic-input
                id="number"
                v-model="number"
                label="Nomor Rekening"
                :classes="classes"
                :caption="errors[0]"
                placeholder="Masukkan No. Rekening"
                style="margin: 16px 0"
              />
            </ValidationProvider>
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
    bankAccount: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      profilePicture: [],
      activeModalAddBankAccount: false,
      holder: '',
      number: '',
      bankId: -1
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalAddBankAccount = val
    },
    activeModalAddBankAccount(val) {
      this.$emit('update:activeModal', val)
    }
  },
  methods: {
    onSubmit() {
      this.$repositories.bankAccount
        .createByAccount(this.$store.getters['user/getUserAccount'].id, {
          bank_id: this.bankId,
          number: this.number,
          holder: this.holder,
          branch: '',
          label: ''
        })
        .then((_) => window.location.replace('/peminjam/account/setting/bank-account'))
    },
    inputBank(bankId) {
      this.bankId = bankId
    }
  }
}
</script>

<style scoped></style>
