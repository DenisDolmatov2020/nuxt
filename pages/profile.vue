<template>
  <div>
    <CoreHeader :page="page" />
    <v-img height="100%">
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="start"
          :cols="5"
          :offset-sm="1"
        >
          <v-avatar
            class="profile"
            color="grey"
            size="164"
          >
            <v-img v-if="profile.image" :src="profile.image" />
            <v-icon v-else x-large>
              mdi-camera
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col
          align-self="end"
          :cols="7"
          :sm="6"
        >
          <button
            v-if="my_profile"
            type="button"
            class="btn btn-entry btn-lot"
            @click="$router.push('/password')"
          >
            {{ $t('profile.button') }}
          </button>
        </v-col>
        <v-spacer />
        <v-col>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-account
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ profile.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('profile.name') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset />
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-mail
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ profile.email }}</v-list-item-title>
              <v-list-item-subtitle> Email </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon large>
                mdi-comment-question
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider inset />
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-phone
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ profile.phone }}</v-list-item-title>
              <v-list-item-subtitle> {{ $t('profile.phone') }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon large>
                mdi-comment-question
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider inset />

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-map-marker
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ profile.address }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('profile.address') }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon large>
                mdi-comment-question
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    profile () {
      return this.$route.params.user || this.$auth.user
    },
    my_profile () {
      return this.profile.id === this.$auth.user.id
    },
    page () {
      if (this.my_profile) {
        return { title: this.$t('profile.title'), color: 'green lighten-1', dark: true, update: true }
      } else {
        return { title: `${this.$t('profile.user')} ${this.profile.name}`, color: 'blue', dark: true, update: false }
      }
    }
  }
}
</script>
