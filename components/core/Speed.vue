<template>
  <div>
    <v-speed-dial
      v-model="fab"
      fixed
      top
      right
      direction="bottom"
      slide-x-reverse-transition
    >
      <template v-slot:activator>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-model="fab"
              color="blue darken-2"
              dark
              fab
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-if="fab">
                mdi-close
              </v-icon>
              <v-avatar v-else-if="$auth.user.image">
                <v-img :src="$auth.user.image" />
              </v-avatar>
              <v-icon v-else large>
                mdi-account-circle
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('profile.title') }}
          </span>
        </v-tooltip>
      </template>

      <v-badge
        v-for="(button, index) in buttons"
        :key="button.icon"
        :value="button.content"
        :content="String(button.content)"
        :color="button.color"
        :left="!!(index % 2)"
        bordered
        inline
        tile
        overlap
      >
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              :color="button.color"
              v-bind="attrs"
              v-on="on"
              @click="drawer(button.url)"
            >
              <v-icon>mdi-{{ button.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ button.text }}</span>
        </v-tooltip>
      </v-badge>
    </v-speed-dial>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fab: true
    }
  },
  computed: {
    buttons () {
      return [
        { content: false, color: 'green', url: '/profile', icon: 'cog', text: this.$t('profile.title') },
        { content: this.$store.state.prizes.length, color: 'pink', url: '/prize', icon: 'gift', text: this.$t('speed.won_prizes') },
        { content: this.$auth.user.energy, color: 'indigo', url: '/energy', icon: 'flash', text: this.$t('energy.title') },
        { content: false, color: 'red', url: null, icon: 'door', text: this.$t('speed.logout') }
      ]
    }
  },
  methods: {
    drawer (url) {
      if (url) {
        this.$router.push(url)
      } else {
        this.$auth.logout()
        this.$root.$emit('snackbar', { color: 'primary', text: 'Вы вышли из профиля' })
      }
    }
  }
}
</script>
