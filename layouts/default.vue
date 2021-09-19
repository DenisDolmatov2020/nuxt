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
import {mapActions} from "vuex";


export default {
  name: 'default',
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
    this.timer = null
    clearInterval(this.timer)
  },
  methods: {
    ...mapActions(['fetchLots', 'fetchNumbers', 'fetchPrizes', 'tracker', 'initSockets']),
    initLottee () {
      Promise.all([
        this.fetchLots(),
        this.fetchNumbers(),
        this.fetchPrizes()
      ])
    }
  }
}
</script>
