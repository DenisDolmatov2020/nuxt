<template>
  <v-app id="main">

    <CoreLogo />

    <CoreLanguages />

    <CoreSpeed v-if="$auth.loggedIn" />
    <CoreLogged v-else />

    <LotList />

    <CoreDrawer v-if="drawer" />

    <CoreSnackbar />

  </v-app>
</template>

<script>
import {mapMutations, mapActions} from "vuex";


export default {
  name: 'Default',
  data () {
    return {
      timer: null
    }
  },
  computed: {
    drawer () {
      return this.$route.path !== '/'
    }
  },
  created () {
    this.initLottee()
    this.timer = setInterval(() => {
      if (this.$auth.loggedIn) {
        this.tracker()
      }
    }, 60 * 60 * 1000) // каждую минуту
  },
  mounted () {
    this.initSockets()
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    ...mapMutations(['SET_TRACKER']),
    ...mapActions(['fetchLots', 'fetchNumbers', 'fetchPrizes']),
    initLottee () {
      Promise.all([
        this.fetchLots(),
        this.fetchNumbers(),
        this.fetchPrizes()
      ])
    },
    async tracker () {
      try {
        const response = await this.$axios.get('/api/tracker')
        this.SET_TRACKER(response.data)
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
    },
    initSockets () {
      const prizeSocket = new WebSocket('ws://' + process.env.WS_URI + '/ws/prize/')
      prizeSocket.onmessage = ({ data }) => {
        console.log('YES SOCKET')
        const lot = JSON.parse(data)
        setTimeout(() =>
            this.$root.$emit(
              'snackbar', { text: this.$t('detail.lot') + ` ${lot.title} ` + this.$t('detail.completed') }
            ),
          5000
        )

        const you = this.$auth.user ? lot.winners.filter(w => w.user === +this.$auth.user.id) : []
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
                lot_id: lot.id,
                timeout: 10000
              }
            ),
          10000)
      }
    }
  }
}
</script>
