import { apiPath } from './constant'
const endpoint = '/business'

export default ($axios) => ({
  all() {
    return $axios.get(`${apiPath}${endpoint}`)
  },

  show(id) {
    return $axios.get(`${apiPath}${endpoint}/${id}`)
  },

  getByUser(userId) {
    return $axios.get(`${apiPath}/account/${userId}${endpoint}`)
  },

  create(payload) {
    return $axios.post(`${apiPath}/business-admin`, payload)
  },

  update(id, payload) {
    return $axios.put(`${apiPath}${endpoint}/${id}`, payload)
  },

  delete(id) {
    return $axios.delete(`${apiPath}${endpoint}/${id}`)
  },

  uploadImage(id, payload) {
    return $axios.post(`${apiPath}${endpoint}/${id}/image/campaign-description`, payload)
  }
})
