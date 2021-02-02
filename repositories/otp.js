import { apiPath } from './constant'

export default ($axios) => ({
  getOtp(id) {
    return $axios.get(`${apiPath}/account/${id}/otp/msisdn`)
  },

  verifyOtp(id, payload) {
    return $axios.post(`${apiPath}/account/${id}/otp/msisdn`, payload)
  },

  getForgotPasswordOtp(email) {
    return $axios.get(`${apiPath}/account/${email}/forgot-password`)
  },

  verifyForgotPasswordOtp(email, payload) {
    return $axios.post(`${apiPath}/account/${email}/forgot-password`, payload)
  },

  getEmailOtp(accountId) {
    return $axios.get(`${apiPath}/account/${accountId}/otp/email`)
  },

  verifyEmailOtp(accountId, payload) {
    return $axios.post(`${apiPath}/account/${accountId}/otp/email`, payload)
  }
})
