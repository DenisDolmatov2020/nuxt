<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card
        class="my-12 mx-auto"
        width="400"
        :elevation="hover ? 24 : 3"
        shaped
        @click="$router.push(`/${lot.id}`)"
      >
        <LotCompany
          :company="lot.user"
          :user-lot="userLot"
        />
        <v-card-text class="pt-0">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div class="title font-weight-light mb-2">
              <v-card-title
                class="headline"
                v-text="lot.title"
              />
              <v-card-subtitle
                class="subheading font-weight-light grey--text"
                v-text="lot.description"
              />
            </div>

            <v-avatar
              class="ma-3"
              size="80"
              tile
              color="grey lighten-1"
            >
              <v-img
                v-if="lot.images && lot.images.length"
                :src="lot.images[0].url"
              />
              <v-icon v-else>
                mdi-camera
              </v-icon>
            </v-avatar>
          </div>
          <v-divider :class="['my-2', userNumbers.length || userLot ? 'green' : 'blue']" />
          <v-row
            no-gutters
            :class="userLot ? 'pa-4' : ''"
          >
            <span
              v-if="!userLot"
              class="text-h6 ml-4 text--lighten-1"
            >
              <span :class="!userNumbers.length ? 'blue--text' : 'green--text'">
                X{{ 2 ** userNumbers.length }}
              </span>
            </span>
            <LotIcons :lot="lot" :x="2 ** userNumbers.length" />
          </v-row>
        </v-card-text>
      </v-card>
    </template>
  </v-hover>
</template>
<script>
export default {
  props: {
    lot: {
      type: Object,
      default: null
    },
    userNumbers: {
      type: Array,
      default: () => []
    },
    userLot: {
      type: Boolean,
      default: false
    }
  }
}
</script>
