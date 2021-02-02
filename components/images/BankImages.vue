<template>
  <img :src="require(`~/assets/icons/banks/${imgBank(id)}`)" />
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  methods: {
    imgBank(id) {
      switch (id) {
        case 0:
          return 'bca.svg'

        case 1:
          return 'mandiri.svg'

        case 2:
          return 'bri.svg'

        case 3:
          return 'bni.svg'

        default:
          return 'bank.svg'
      }
    }
  }
}
</script>

<style></style>
