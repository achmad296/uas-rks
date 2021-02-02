<template>
  <Modal :active-modal.sync="activeModalTopup" title="Tambah Dana">
    <template v-slot:body>
      <div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(topup)">
            <label class="mb-8">Transfer Bank</label>
            <div
              v-for="(bank, i) in banks"
              :key="bank.alias"
              :class="activeCardStyle(bank.isActive)"
              class="card-bank d-flex align-items-center"
              @click="onActiveCard(i)"
            >
              <BankImages v-model="bank.alias" class="mx-16" />
              <body-2 :class="activeTextStyle(bank.isActive)" class="flex-fill">{{ bank.alias }}</body-2>
              <img class="px-16" :src="require(`~/assets/icons/${activeIcon(bank.isActive)}.svg`)" />
            </div>
            <ValidationProvider v-slot="{ classes, errors }" rules="min_value:1|required">
              <basic-input
                id="nominal-topup"
                v-model="topupNominal"
                label="Nominal"
                :classes="classes"
                class="mt-12"
                :caption="errors[0]"
                placeholder="0"
                prepend="Rp"
              />
            </ValidationProvider>
            <y-btn size="large-full" label="Tambah Dana" type="submit" class="mt-24" />
          </form>
        </ValidationObserver>
      </div>
    </template>
  </Modal>
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
      activeModalTopup: false,
      banks: [
        { alias: 'Bank BNI Syariah', isActive: true },
        { alias: 'Bank Mandiri', isActive: false },
        { alias: 'Bank BCA', isActive: false },
        { alias: 'Bank BRI', isActive: false }
      ],
      whereActiveBank: 0,
      topupNominal: ''
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalTopup = val
    },
    activeModalTopup(val) {
      this.$emit('update:activeModal', val)
    }
  },
  methods: {
    topup() {},
    activeCardStyle(boolean) {
      return boolean ? 'card-bank-active' : ''
    },

    activeTextStyle(boolean) {
      return boolean ? 'blue' : 'black'
    },

    activeIcon(boolean) {
      return boolean ? 'checkmark-circle-active' : 'checkmark-circle'
    },

    onActiveCard(index) {
      this.banks[this.whereActiveBank].isActive = false
      this.banks[index].isActive = true
      this.whereActiveBank = index
    }
  }
}
</script>

<style scoped>
.card-bank {
  background: #fafbfc;
  border: 1px solid #d6d4d5;
  border-radius: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-bottom: 4px;

  cursor: pointer;
}
.card-bank-active {
  background: #ebf4fc;
  border: 1px solid #3c91e6;
}
</style>
