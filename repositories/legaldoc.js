import { apiPath } from './constant'

const endpoint = '/account'

export default ($axios) => ({
  uploadKtp(id, payload) {
    return $axios.post(`${apiPath}${endpoint}/${id}/image/ktp`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  uploadNpwp(id, payload) {
    return $axios.post(`${apiPath}${endpoint}/${id}/image/npwp`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
})
