<template>
  <modal :active-modal.sync="activeModalAddBusiness" title="Edit Bisnis">
    <template v-slot:body>
      <div class="modal-add-business">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form class="input-container" @submit.prevent="handleSubmit(onSubmit)">
            <div class="logo-field">
              <p class="logo-field-label">Logo Bisnis</p>
              <Upload
                single-upload
                text="Pilih atau letakkan disini"
                desc-input="Ekstensi File : JPG, JPEG, PNG 
            Maksimal Ukuran : 10 Mb"
                :files.sync="businessLogo"
                file-type="images"
                logo
              />
            </div>
            <ValidationProvider v-slot="{ classes, errors }" rules="required">
              <basic-input
                id="business-name"
                v-model="businessName"
                label="Nama Bisnis"
                :classes="classes"
                :caption="errors[0]"
                placeholder="Masukkan Nama Bisnis"
                style="margin-bottom: 16px"
              />
            </ValidationProvider>
            <ValidationProvider v-slot="{ classes, errors }" rules="required">
              <basic-input
                id="business-email"
                v-model="businessEmail"
                label="Email Bisnis"
                :classes="classes"
                :caption="errors[0]"
                placeholder="Masukkan Email Bisnis"
                style="margin-bottom: 16px"
              />
            </ValidationProvider>
            <vs-select
              v-model="businessSector"
              label="Sektor Bisnis"
              class="business-sector-field"
              style="margin-bottom: 16px"
            >
              <vs-select-item v-for="(item, index) in options" :key="index" :value="item.value" :text="item.text" />
            </vs-select>
            <div class="address-field">
              <auto-complete placeholder="Kota/Kecamatanmu" label="Alamat Bisnis" class="autosuggest-field" />
              <ValidationProvider v-slot="{ classes, errors }" rules="required" class="postal-code">
                <basic-input
                  id="postal-code"
                  v-model="postalCode"
                  class="postal-code"
                  :classes="classes"
                  :caption="errors[0]"
                  placeholder="Kode Pos"
                />
              </ValidationProvider>
            </div>
            <ValidationProvider v-slot="{ classes, errors }" rules="required" style="margin-top: 24px">
              <y-text-area
                id="full-address"
                v-model="fullAddress"
                :classes="classes"
                :caption="errors[0]"
                height="72"
                placeholder="Alamat Lengkap (Jalan, No, RT/RW)"
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
    }
  },
  data() {
    return {
      options: [
        { text: 'Perdagangan', value: 0 },
        { text: 'Pertanian', value: 1 }
      ],
      activeModalAddBusiness: false,
      businessName: '',
      businessEmail: '',
      businessSector: '',
      businessLogo: [],
      postalCode: '',
      fullAddress: ''
    }
  },
  watch: {
    activeModal(val) {
      this.activeModalAddBusiness = val
    },
    activeModalAddBusiness(val) {
      this.$emit('update:activeModal', val)
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>

<style scoped>
.logo-field {
  width: 224px;
  margin: auto;
}

.logo-field .logo-field-label {
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  color: #847f82;
}

.con-select {
  width: 100%;
}

.con-select .input-select-con .vs-select--input {
  padding: 8px 0px 8px 16px;
}

.address-field {
  width: 100%;
  display: flex;
  margin-bottom: 8px;
}

.autosuggest-field {
  flex-grow: 1;
  margin-right: 23px;
}

.postal-code {
  align-self: flex-end;
}

@media only screen and (max-width: 767px) {
  .address-field {
    flex-direction: column;
  }

  .autosuggest-field {
    width: 100%;
    margin-bottom: 4px;
    margin-right: 0;
  }

  .postal-code {
    align-self: flex-start;
    width: 100%;
  }
}
</style>
