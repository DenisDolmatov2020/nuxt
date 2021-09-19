<template>
  <!--TODO current component will destroy -->
  <v-dialog
    v-if="$auth.loggedIn"
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        dark
        icon
        class="mr-4"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-file-input
              v-model="user.image"
              :label="$t('modal.avatar')"
              prepend-icon="mdi-camera"
            />
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.name"
                :label="$t('modal.name')"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.email"
                label="Email"
                required
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.phone"
                :label="$t('modal.address_delivery')"
                required
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.address"
                :label="$t('modal.address_delivery')"
                required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="error"
          text
          @click="dialog = false"
        >
          {{ $t('modal.cancel') }}
        </v-btn>
        <v-spacer />
        <v-btn
          color="success"
          text
          @click="update(user); dialog = false"
        >
          {{ $t('modal.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'


export default {
  name: 'Modal',
  data () {
    return {
      dialog: false,
      user: {}
    }
  },
  created () {
    this.user = { ...this.$auth.user, image: null }
  },
  methods: {
    ...mapActions('sign', ['update'])
  }
}
</script>

<style scoped>

</style>
