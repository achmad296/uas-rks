export const state = () => ({
  banks: []
})

export const mutations = {
  setBanks(state, banks) {
    state.banks = banks
  }
}

export const actions = {
  async fetchBanks(vuexContext) {
    const bankRes = await this.$repositories.bank.get()
    return vuexContext.commit('setBanks', bankRes.data.response.results)
  }
}

export const getters = {
  getBanks(state) {
    return state.banks
  }
}
