import { apiPath } from './constant'

const endpoint = '/bank'

export default ($axios) => ({
  get() {
    return $axios.get(`${apiPath}${endpoint}`)
  }
})
