export default async function ({ app, store, redirect }) {
  await store.dispatch('bank/fetchBanks')
  if (!store.getters['user/isAuthenticated'] && store.getters['user/getUserType'] !== 'BUSINESS') {
    if (app.$cookies.get('token') !== undefined) {
      return store.dispatch('user/initAuth', app.$cookies.get('token'))
    } else {
      redirect('/login')
    }
  }
}
