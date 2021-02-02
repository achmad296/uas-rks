import { apiPath } from './constant'

const endpoint = '/campaign'

export default ($axios) => ({
  create(businessId, payload) {
    return $axios.post(`${apiPath}/business/${businessId}${endpoint}`, payload)
  },
  showById(id) {
    return $axios.get(`${apiPath}${endpoint}/${id}`)
  },
  getFromBusinessId(businessId) {
    return $axios.get(`${apiPath}/business/${businessId}${endpoint}`)
  },
  getStatus(id) {
    return $axios.get(`${apiPath}${endpoint}/${id}/campaign-status`)
  },
  delete(id) {
    return $axios.delete(`${apiPath}${endpoint}/${id}`)
  },
  uploadCampaignRevenue(id, payload) {
    return $axios.post(`${apiPath}${endpoint}/${id}/document/revenue`, payload)
  },
  getCampaignReport(id) {
    return $axios.get(`${apiPath}${endpoint}/${id}/document/report`)
  },
  getCampaignReportByTenorIndex(id, tenorIndex) {
    return $axios.get(`${apiPath}${endpoint}/${id}/document/report/${tenorIndex}`)
  },
  editCampaignReport(id, tenorIndex, payload) {
    return $axios.put(`${apiPath}${endpoint}/${id}/document/report/${tenorIndex}`, payload)
  },
  editCampaignReportFile(id, tenorIndex, payload) {
    return $axios.put(`${apiPath}${endpoint}/${id}/document/report/${tenorIndex}/file`, payload)
  }
})
