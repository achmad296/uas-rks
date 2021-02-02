/* eslint-disable no-console */
export default ({ $axios, env, store }) => {
  $axios.onRequest((config) => {
    config.headers.common.cyberx = env.API_SECRET
    config.headers.common.token = store.getters['user/getUserToken']
  })

  $axios.onError((err) => {
    switch (err.response.status) {
      case 500:
        console.log(err.response)
        break

      default:
        break
    }
  })
}
