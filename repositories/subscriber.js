import { apiPath } from './constant'
const endpoint = '/subscriber'

export default ($axios) => ({
  create(payload) {
    return $axios.post(`${apiPath}${endpoint}`, payload)
  }
})
