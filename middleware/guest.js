export default async function ({ app, store, redirect }) {
  if (app.$cookies.get('token') !== undefined) {
    await store.dispatch('user/initAuth', app.$cookies.get('token'))
    if (store.getters['user/isAuthenticated']) {
      if (store.getters['user/getUserType'] === 'BUSINESS') {
        redirect('/peminjam/dashboard')
      } else {
        redirect('/pendana/dashboard')
      }
    }
  }
}
