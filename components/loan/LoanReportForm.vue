<template>
  <div class="container">
    <div class="loan-report-form">
      <body-2>Laporkan penjualan Penambahan Produksi Keripik Pisang 3000pcs pada Periode 1.</body-2>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider v-slot="{ classes, errors }" rules="required|numeric">
            <basic-input
              id="total-sales"
              v-model="totalSales"
              label="Total Penjualan"
              :classes="classes"
              :caption="errors[0]"
              placeholder="0"
              prepend="Rp"
            />
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalSales: null
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>
