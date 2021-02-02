const endpoint = 'business/compact-geodirectories'

export default ($axios) => ({
  getGeodirectories() {
    return $axios({
      url: endpoint,
      baseURL: 'https://gateway.yubipwa.net/v1/',
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
  }
})
