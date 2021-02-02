import { apiPath } from './constant'

const endpointAccount = '/account'

export default ($axios) => ({
  getByAccount(accountId) {
    return $axios.get(`${apiPath}${endpointAccount}/${accountId}/bank`)
  },

  createByAccount(accountId, payload) {
    return $axios.post(`${apiPath}${endpointAccount}/${accountId}/bank`, payload)
  }
})
