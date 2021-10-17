<template>
  <div v-if="lot">
    <CoreHeader :page="{ title: $t('detail.lot'), color: 'white', dark: false, update: false }" />
    <v-carousel
      v-if="lot.images.length"
      cycle
      height="250"
      hide-delimiter-background
      :show-arrows="false"
      :show-arrows-on-hover="false"
      hide-delimiters
    >
      <v-carousel-item
        v-for="(image, i) in lot.images"
        :key="i + '_' + image.url"
      >
        <v-img
          :src="image.url"
          height="250"
        />
      </v-carousel-item>
    </v-carousel>
    <v-card-title>
      <v-row class="pl-4 grey--text">
        {{ lot.title }}
        <v-spacer />
        <LotIcons :lot="lot" :x="2 ** userNumbers.length" />
      </v-row>
    </v-card-title>

    <v-card-text>
      {{ lot.description }}
    </v-card-text>

    <v-divider />

    <LotCompany
      v-if="lot.user"
      :company="lot.user"
      :user-company="$auth.loggedIn && $auth.user.id === lot.user.id"
    />

    <div v-else-if="!lot.active && lot.wins">
      <v-card
        class="mx-auto my-2 pb-2"
        max-width="400"
        rounded="xl"
        color="deep-purple lighten-1"
      >
        <v-card-title class="white--text text-lighten-1">
          {{ $t('detail.winners') }}
          <v-spacer />
          <v-btn icon dark large>
            <v-icon>
              mdi-comment-question
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col
              v-for="winner in lot.wins"
              :key="`winner_${winner.id}`"
              cols="2"
              active-class="deep-purple white--text"
            >
              <v-btn
                icon
                x-large
                @click="$router.push({ name: 'profile', params: { user: winner.user }})"
              >
                <v-avatar
                  :rounded="$auth.loggedIn && winner.user.id === $auth.user.id"
                  :color="$auth.loggedIn && winner.user.id === $auth.user.id ? 'green' : 'blue'"
                  size="48"
                  class="white--text"
                >
                  #{{ winner.num }}
                </v-avatar>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <v-divider class="mx-4" />

    <v-card v-if="lot.active && lot.condition">
      <v-card-title>
        {{ $t('detail.condition') }}
        <v-spacer />
        <v-menu transition="slide-x-reverse-transition">
          <template #activator="{ on, attrs }">
            <v-btn
              color="secondary"
              text
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon large color="gray">
                mdi-comment-question
              </v-icon>
            </v-btn>
          </template>
          <v-sheet
            color="warning"
            class="white-text"
          >
            Выполнив условия, можно принять участие в
            <br>
            розыгрыше, если условия будут выполнены после участия,
            <br>
            в случае победы результат аннулируется.
          </v-sheet>
        </v-menu>
      </v-card-title>

      <v-card-text>
        <div>
          <v-row
            v-for="condition in lot.conditions"
            :key="condition.id"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <a
              :href="condition.link"
              class="nano-decoration"
            >
              <v-icon :color="condition.color" x-large>
                mdi-{{ condition.icon }}
              </v-icon>

              <div
                v-for="type_condition in ['subscribe', 'like', 'comment', 'repost']"
                :key="type_condition"
              >
                <v-chip
                  v-if="condition[type_condition]"
                  :color="condition[type_condition].color"
                  class="ma-2"
                >
                  {{ $t(`detail.${type_condition}`) }}
                </v-chip>
              </div>

            </a>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <div v-else-if="!lot.active && lot.wins">
      <v-card
        class="mx-auto my-2 pb-2"
        max-width="400"
        rounded="xl"
        color="deep-purple lighten-1"
      >
        <v-card-title class="white--text text-lighten-1">
          {{ $t('detail.winners') }}
          <v-spacer />
          <v-btn icon dark large>
            <v-icon>
              mdi-comment-question
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col
              v-for="winner in lot.wins"
              :key="`winner_${winner.id}`"
              cols="2"
              active-class="deep-purple white--text"
            >
              <v-btn
                icon
                x-large
                @click="$router.push({ name: 'profile', params: { user: winner.user }})"
              >
                <v-avatar
                  :rounded="$auth.loggedIn && winner.user.id === $auth.user.id"
                  :color="$auth.loggedIn && winner.user.id === $auth.user.id ? 'green' : 'blue'"
                  size="48"
                  class="white--text"
                >
                  #{{ winner.num }}
                </v-avatar>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <v-spacer />

    <v-divider class="mx-4" />

    <button
      v-if="$auth.loggedIn && $auth.user.id !== lot.user.id && lot.active"
      type="button"
      class="btn btn-entry btn-lot"
      @click="reserve()"
    >
      {{ $t('detail.take_number') }}
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'Detail',
  data () {
    return {
      lot: null
    }
  },
  computed: {
    ...mapState(['numbers']),
    userNumbers () {
      return this.$auth.loggedIn ? this.numbers.filter(number => number.lot === this.lot.id) : []
    }
  },
  created () {
    this.fetchLot()
  },
  methods: {
    ...mapActions(['fetchLots', 'fetchNumbers']),
    async fetchLot () {
      try {
        const { data } = await this.$axios.get('/api/lot/' + this.$route.params.id)
        this.lot = data
      } catch (error) {
        console.error(error)
        this.$router.push('/')
      }
    },
    async reserve() {
      try {
        const response = await this.$axios.patch('/api/number/update/', { lot_id: this.lot.id })
        this.$root.$emit('snackbar', {
          text: response.status === 200 ? `Ваш номер #${response.data}` : 'Вам не удалось взять номер',
          color: response.status === 200 ? 'success' : 'error'
        })
        this.$auth.fetchUser()
        this.fetchNumbers()
        this.fetchLot()
        this.fetchLots()
      } catch (error) {
        this.$root.$emit('snackbar', { icon: 'mdi-flash', color: 'error', text: 'Недостаточно энергии' })
      }
    }
  }
}
</script>

<style scoped>
.btn-lot {
  position: absolute;
  bottom: 10px;
  left: 5%;
  width: 90%;
}
.nano-decoration {
  text-decoration: none;
}
</style>
