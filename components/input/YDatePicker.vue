<template>
  <div class="y-date-picker">
    <label> Batas Waktu Pengumpulan </label>
    <date-picker
      language="id"
      :format="customFormatter"
      :class="classes"
      :disabled-dates="disableDates"
      v-bind="$attrs"
      @selected="(val) => this.$emit('date-selected', val)"
      @opened="$emit('date-picker-opened')"
    />
    <p class="caption">{{ caption }}</p>
  </div>
</template>

<script>
import 'moment/locale/id'

export default {
  inheritAttrs: false,
  props: {
    classes: {
      type: Object,
      default: () => ({})
    },
    caption: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      disableDates: {
        to: new Date()
      }
    }
  },
  methods: {
    customFormatter(date) {
      return this.$moment(date).format('Do/MM/yyyy')
    }
  }
}
</script>

<style>
.vdp-datepicker {
  background: #fafbfc;
  border: 1px solid #d6d4d5;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  height: 37px;
}

.is-invalid.vdp-datepicker {
  border: 1px solid #dd403a;
}

.is-valid.vdp-datepicker {
  border: 1px solid #3c91e6;
}

.vdp-datepicker * {
  width: 100%;
}

.vdp-datepicker input {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: none;
  background: #fafbfc;
  padding: 8px 0px 8px 16px;

  font-family: 'Lato';
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
}

.is-valid.vdp-datepicker input {
  color: #3c91e6;
}

.is-invalid.vdp-datepicker input {
  color: #dd403a;
}

.caption {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  color: #dd403a;
}
</style>
