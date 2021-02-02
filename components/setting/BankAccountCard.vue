<template>
  <div class="bank-account-card">
    <div class="content">
      <BankImages :id="bankId" />
      <div class="info-container">
        <body-3 class="info corporate-name">{{ corporateName }}</body-3>
        <body-2 class="info account-name">{{ accountName }}</body-2>
        <body-2 class="info account-number">{{ accountNumber }}</body-2>
      </div>
    </div>
    <div class="footer">
      <div class="dummy" style="width: 64px"></div>
      <div class="button">
        <body-3 class="action-btn">Hapus</body-3>
        <body-3 class="action-btn">Ubah</body-3>
      </div>

      <div class="toggle" :class="isPrimary && 'primary'">
        <body-3 class="label">{{ isPrimary ? 'Aktif Rekening Utama' : 'Atur Rekening Utama' }}</body-3>
        <vs-switch v-model="isPrimary" color="#3C91E6" @click="activeModalSetPrimaryBankAccount = true" />
      </div>
    </div>
    <modal-set-primary-bank-account
      :active-modal.sync="activeModalSetPrimaryBankAccount"
      :corporate-name="corporateName"
      :account-name="accountName"
      :account-number="accountNumber"
    />
  </div>
</template>

<script>
export default {
  props: {
    corporateName: {
      type: String,
      default: ''
    },
    bankId: {
      type: Number,
      default: -1
    },
    accountName: {
      type: String,
      default: ''
    },
    accountNumber: {
      type: String,
      default: ''
    },
    primary: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isPrimary: false,
      activeModalSetPrimaryBankAccount: false
    }
  },
  watch: {
    activeModalSetPrimaryBankAccount(val) {
      if (val) this.isPrimary = !this.isPrimary
    }
  },
  created() {
    this.isPrimary = this.primary
  }
}
</script>

<style scoped>
.bank-account-card {
  border-top: 0.7px solid #ebeaea;
  padding: 16px 0;
}

.content {
  display: flex;
  margin-bottom: 10px;
}

.info-container {
  margin-left: 8px;
}

.info {
  color: #00171f;
}

.footer {
  display: flex;
}

.button {
  display: flex;
}

.action-btn {
  color: #d30000;
  cursor: pointer;
}

.action-btn:hover {
  text-decoration: underline;
}

.action-btn:nth-child(1) {
  margin-right: 24px;
}

.toggle {
  display: flex;
  margin-left: auto;
}

.label {
  margin-right: 11px;
}

.toggle.primary .label {
  color: #3c91e6;
}

@media only screen and (max-width: 430px) {
  .footer .dummy {
    display: none;
  }
  .footer {
    margin-left: 64px;
    flex-direction: column;
  }

  .footer .toggle {
    margin-left: 0;
  }
}
</style>
