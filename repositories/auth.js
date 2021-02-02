import { apiPath } from './constant'

const endpoint = '/account/auth'

export default ($axios) => ({
  login(payload) {
    return $axios.post(`${apiPath}${endpoint}`, payload)
  }
})
