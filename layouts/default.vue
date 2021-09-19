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
    Promise.all([
      this.fetchLots(),
      this.fetchNumbers(),
      this.fetchPrizes()
    ])
    this.timer = setInterval(() => this.tracker, 60 * 60 * 1000) // каждую минуту
  },
  mounted () {
    this.initSockets()
  },
  beforeDestroy () {
    this.timer = null
    clearInterval(this.timer)
  },
  methods: {
    ...mapActions(['fetchLots', 'fetchNumbers', 'fetchPrizes', 'tracker', 'initSockets'])
  }
}
</script>
