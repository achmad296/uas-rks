import jwtDecode from 'jwt-decode'

export const state = () => ({
  businessId: null,
  activeBusinessIdx: 0,
  token: null,
  type: null,
  account: {}
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setType(state, type) {
    state.type = type
  },
  setBusinessId(state, businessId) {
    state.businessId = businessId
  },
  setAccount(state, account) {
    state.account = account
  },
  setActiveBusinessIdx(state, idx) {
    state.activeBusinessIdx = idx
  },
  reset(state) {
    state.token = null
    state.type = null
    state.businessId = null
    state.account = {}
  }
}

export const actions = {
  login(vuexContext, payload) {
    return this.$repositories.auth.login(payload).then(async (res) => {
      const token = res.data.response.results[0].token
      vuexContext.commit('setToken', token)
      const decoded = jwtDecode(token)
      this.$cookies.set('token', token, {
        path: '/',
        expires: new Date(decoded.exp * 1000)
      })
      vuexContext.commit('setType', decoded.authorized)

      const businessRes = await this.$repositories.business.getByUser(decoded.id)
      vuexContext.commit('setBusinessId', businessRes.data.response.results[0].id)

      vuexContext.dispatch('fetchAccount', decoded.id)
    })
  },

  async initAuth(vuexContext, token) {
    vuexContext.commit('setToken', token)
    const decoded = await jwtDecode(token)
    vuexContext.commit('setType', decoded.authorized)

    const businessRes = await this.$repositories.business.getByUser(decoded.id)
    vuexContext.commit('setBusinessId', businessRes.data.response.results[0].id)

    return vuexContext.dispatch('fetchAccount', decoded.id)
  },

  async fetchAccount(vuexContext, userId) {
    const accountRes = await this.$repositories.account.show(userId)
    return vuexContext.commit('setAccount', accountRes.data.response.results[0])
  },

  async logout(vuexContext) {
    await this.$cookies.removeAll()
    return vuexContext.commit('reset')
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.token !== null
  },
  getUserToken(state) {
    return state.token
  },
  getUserType(state) {
    return state.type
  },
  getUserBusinessId(state) {
    return state.businessId
  },
  getUserAccount(state) {
    return state.account
  },
  getActiveBusinessIdx(state) {
    return state.activeBusinessIdx
  }
}
