<template>
  <div class="bank-account-container d-flex flex-column" :class="bankAccountContainer">
    <Headerbar title="Rekening Bank" />
    <separator />
    <div class="my-24 d-flex align-items-center">
      <basic-input
        id="search-bank-account"
        v-model="searchVal"
        placeholder="Cari nama pemilik/bank"
        icon-prepend="search"
        transparent-prepend
        class="flex-fill"
      />
      <y-btn
        v-if="!isMobile"
        label="Tambah Rekening"
        class="mt-1 ml-4"
        @click.native="activeModalAddBankAccount = true"
      />
    </div>
    <div
      v-if="!bankAccount.length"
      class="flex-grow-1 d-flex flex-column align-items-center justify-content-center my-64"
    >
      <img src="~assets/images/illustration/bank-account.svg" />
      <subtitle-1 class="mt-16">Belum ada rekening bank.</subtitle-1>
    </div>
    <div v-for="(bank, idx) in bankAccount" v-else :key="bank.id" class="bank-list">
      <bank-account-card
        :corporate-name="banks.filter((bankInfo) => bankInfo.id === bank.bank_id)[0].corporate_name"
        :bank-id="bank.bank_id"
        :account-name="bank.holder"
        :account-number="bank.number"
        :primary="idx === 0 && true"
      />
      <separator />
    </div>
    <div>
      <y-btn
        v-if="isMobile"
        label="Tambah Rekening"
        size="medium-full"
        @click.native="activeModalAddBankAccount = true"
      />
    </div>
    <modal-add-bank-account :active-modal.sync="activeModalAddBankAccount" />
  </div>
</template>

<script>
export default {
  layout: 'cms',
  async fetch() {
    this.$vs.loading()
    try {
      this.banks = await this.$store.getters['bank/getBanks']
      const bankAccountRes = await this.$repositories.bankAccount.getByAccount(
        this.$store.getters['user/getUserAccount'].id
      )

      this.bankAccount = bankAccountRes.data.response.results
      this.$vs.loading.close()
    } catch (err) {
      this.$vs.loading()
      throw new Error(err)
    }
  },
  data() {
    return {
      searchVal: '',
      bankAccount: [],
      banks: [],
      activeModalAddBankAccount: false
    }
  },
  computed: {
    bankAccountContainer() {
      return this.isMobile ? 'bank-account-mobile' : 'bank-account-dekstop'
    },
    isMobile() {
      if (this.$mq === 'xs' || this.$mq === 'sm') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.bank-account-container {
  overflow: auto;
  background: #fff;
  padding: 0 16px 24px 16px;
}
.bank-account-dekstop {
  height: 100%;
  border-radius: 16px;
}
.bank-account-mobile {
  height: calc(100vh - 64px);
  overflow: auto;
  background: #fff;
  padding-bottom: 16px;
}
</style>
