<template>
  <modal :active-modal.sync="activeModalSetPrimaryBankAccount" title="Konfirmasi Rekening Utama">
    <template v-slot:body>
      <div class="modal-set-primary-bank-account">
        <body-3 class="label">Apakah kamu yakin untuk mengatur rekening ini sebagai rekening utama?</body-3>
        <body-3 class="corporate-name">{{ corporateName }}</body-3>
        <subtitle-1>{{ `A/n ${accountName}` }}</subtitle-1>
        <subtitle-1>{{ accountNumber }}</subtitle-1>
        <hr />
        <div class="button-group">
          <y-btn
            variant="secondary"
            label="Batal"
            type="submit"
            style="margin-right: 15px"
            @click.native="activeModal = false"
          />
          <y-btn label="Terapkan" type="submit" />
        </div>
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
    corporateName: {
      type: String,
      default: ''
    },
    accountName: {
      type: String,
      default: ''
    },
    accountNumber: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      profilePicture: [],
      activeModalSetPrimaryBankAccount: false
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalSetPrimaryBankAccount = val
    },
    activeModalSetPrimaryBankAccount(val) {
      this.$emit('update:activeModal', val)
    }
  },
  methods: {}
}
</script>

<style scoped>
.corporate-name {
  color: #00171f;
  margin-top: 16px;
}

.button-group {
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

hr {
  margin-top: 9px;
  width: 40%;
  border: 1px solid #ebeaea;
}
</style>
