import { apiPath } from './constant'
const endpoint = '/account'

export default ($axios) => ({
  get() {
    return $axios.get(`${apiPath}${endpoint}`)
  },

  show(id) {
    return $axios.get(`${apiPath}${endpoint}/${id}`)
  },

  edit(id, payload) {
    return $axios.put(`${apiPath}${endpoint}/${id}`, payload)
  },

  editEmail(id, payload) {
    return $axios.put(`${apiPath}${endpoint}/${id}/email`, payload)
  },

  editMsisdn(id, payload) {
    return $axios.put(`${apiPath}${endpoint}/${id}/msisdn`, payload)
  },

  changePassword(id, payload) {
    return $axios.put(`${apiPath}${endpoint}/${id}/password`, payload)
  },

  getAccountAvatar(id) {
    return $axios.get(`${apiPath}${endpoint}/${id}/image/avatar`)
  },

  uploadAccountAvatar(id, payload) {
    return $axios.post(`${apiPath}${endpoint}/${id}/image/avatar`, payload)
  },

  getKtp(id) {
    return $axios.get(`${apiPath}${endpoint}/${id}/image/ktp`)
  },

  getNpwp(id) {
    return $axios.get(`${apiPath}${endpoint}/${id}/image/npwp`)
  },

  editKtp(id, payload) {
    return $axios.put(`${apiPath}${endpoint}/${id}/image/ktp`, payload)
  },

  editNpwp(id, payload) {
    return $axios.put(`${apiPath}${endpoint}/${id}/image/npwp`, payload)
  },

  updateForgotPassword(email, payload) {
    return $axios.put(`${apiPath}${endpoint}/${email}/forgot-password`, payload)
  }
})
