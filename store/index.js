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
  },
  async tracker ({ commit }) {
    if (this.$auth.loggedIn) {
      try {
        const response = await this.$axios.get('/api/tracker')
        commit('SET_TRACKER', response.data)
        if (response.status === 201) {
          this.$root.$emit('snackbar', {
            color: 'indigo',
            icon: 'mdi-flash',
            title: `+${response.data.days_row < 8 ? response.data.days_row : 7} к энергии`,
            timeout: 7000,
            text: `Получен ежедневный бонус за
                  ${response.data.days_row}
                  ${response.data.days_row === 1 ? 'день' : response.data.days_row < 5 ? 'дня' : 'дней'}
                  посещения подряд`
          })
          this.$auth.fetchUser()
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  initSockets () {
    if (this.$auth.loggedIn) {
      const prizeSocket = new WebSocket('ws://' + window.location.hostname + ':8000' + '/ws/prize/')
      prizeSocket.onmessage = ({ data }) => {
        const lot = JSON.parse(data)
        setTimeout(() =>
            this.$root.$emit(
              'snackbar', { text: this.$t('detail.lot') + ` ${lot.title} ` + this.$t('detail.completed') }
            ),
          5000
        )

        const you = lot.winners.filter(w => w.user === +this.$auth.user.id)
        let text = this.$tc('prize.new_message', you.length)

        if (you.length) {
          lot.winners = you
          this.$auth.fetchUser()
        }
        lot.winners.forEach(item => { text += ' #' + item.num })

        setTimeout(() =>
            this.$root.$emit('snackbar',
              {
                icon: you.length ? 'mdi-gift' : 'mdi-counter',
                color: you.length ? 'deep-purple' : 'primary',
                text,
                lot_id: lot.id
              }
            ),
          10000)
        setTimeout(() =>
            this.$root.$emit('snackbar',
              {
                icon: you.length ? 'mdi-gift' : 'mdi-counter',
                color: you.length ? 'deep-purple' : 'primary',
                text,
                lot_id: lot.id
              }
            ),
          15000)
        setTimeout(() =>
            this.$root.$emit('snackbar',
              {
                icon: you.length ? 'mdi-gift' : 'mdi-counter',
                color: you.length ? 'deep-purple' : 'primary',
                text,
                lot_id: lot.id
              }
            ),
          20000)
      }
    }
  }
}

