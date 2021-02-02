/* eslint-disable camelcase */
import { extend, configure } from 'vee-validate'
import { parse } from 'vue-currency-input'
import { required, email, numeric, min_value, max_value } from 'vee-validate/dist/rules'

import { currencyOptions } from '../utils/currencyOptions'

extend('required', {
  ...required,
  message: 'Harus diisi'
})

extend('min_value', {
  ...min_value,
  message: 'tidak valid'
})

extend('saldo_min', {
  ...max_value,
  message: 'Saldo tidak mencukupi'
})

extend('email', {
  ...email,
  message: 'Email tidak valid'
})

extend('numeric', {
  ...numeric,
  message: 'Harus berupa angka'
})

extend('positive', (value) => {
  if (parse(value, currencyOptions) >= 0) {
    return true
  }

  return 'Harus berupa bilangan positif'
})

extend('min_money', (value, args) => {
  if (parse(value, currencyOptions) >= Number(args[0])) {
    return true
  }
  return 'Minimal Rp. ' + Number(args).toLocaleString('id-ID')
})

extend('max_money', (value, args) => {
  if (parse(value, currencyOptions) <= Number(args[0])) {
    return true
  }

  return 'Maksimal Rp. ' + Number(args).toLocaleString('id-ID')
})

extend('max_percentage', (value, args) => {
  if (value <= Number(args[0])) {
    return true
  }

  return 'Maksimal ' + args + '%'
})

extend('min_percentage', (value, args) => {
  if (value >= Number(args[0])) {
    return true
  }

  return 'Minimal ' + args + '%'
})

extend('min_month', (value, args) => {
  if (value >= Number(args[0])) {
    return true
  }

  return 'Minimal ' + args + ' bulan'
})

extend('notelp', {
  validate(value) {
    const re = new RegExp(/^.{8,15}$/)
    return re.test(value)
  },
  message: 'No. Telepon minimal 8 digit dan maksimal 15 digit'
})

extend('no_special_char', {
  validate(value) {
    const re = new RegExp(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/)
    return re.test(value)
  },
  message: 'Tidak boleh ada simbol dan karakter spesial'
})

extend('password', {
  validate(value) {
    const re = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/)
    return re.test(value)
  },
  message: 'Password antara 6 - 32 karakter dengan minimal satu digit angka'
})

extend('idCard', {
  validate(value) {
    const re = new RegExp(/^[0-9].{15,15}$/)
    return re.test(value)
  },
  message: 'Harus 16 digit angka'
})

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
