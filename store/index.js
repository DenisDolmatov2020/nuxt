export const state = () => ({
  lots: [],
  numbers: [],
  prizes: [],
  tracker: {}
})

export const mutations = {
  SET_LOTS (state, lots) {
    state.lots = lots
  },
  SET_NUMBERS (state, numbers) {
    state.numbers = numbers
  },
  SET_PRIZES (state, prizes) {
    state.prizes = prizes
  },
  SET_TRACKER (state, tracker) {
    state.tracker = tracker
  }
}

export const actions = {
  async fetchLots ({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/lot/')
      commit('SET_LOTS', data)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchNumbers ({ commit }) {
    if (this.$auth.loggedIn) {
      try {
        const { data } = await this.$axios.get('/api/number/')
        commit('SET_NUMBERS', data)
      } catch (error) {
        console.error(error)
      }
    }
  },
  async fetchPrizes ({ commit }) {
    if (this.$auth.loggedIn) {
      try {
        const prizes = await this.$axios.$get('/api/prize')
        commit('SET_PRIZES', prizes)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

