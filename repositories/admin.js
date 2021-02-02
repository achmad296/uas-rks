import { apiPath } from './constant'
const endpoint = '/admin'

export default ($axios) => ({
  login(payload) {
    return $axios.post(`${apiPath}${endpoint}`, payload)
  },

  get() {
    return $axios.get(`${apiPath}${endpoint}`)
  },

  create(payload) {
    return $axios.post(`${apiPath}${endpoint}`, payload)
  },

  show(id) {
    return $axios.get(`${apiPath}${endpoint}/${id}`)
  },

  delete(id) {
    return $axios.delete(`${apiPath}${endpoint}/${id}`)
  }
})
