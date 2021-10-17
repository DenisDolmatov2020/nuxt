<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      shaped
    >
      <v-list-item>
        <v-icon
          large
          class="mr-2"
        >
          {{ icon }}
        </v-icon>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            {{ title }}
          </v-list-item-title>
          <span class="text-style">
            {{ text }}
          </span>
        </v-list-item-content>
      </v-list-item>

      <template #action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="clickButton"
        >
          {{ lot_id ? 'Перейти' : '' }}
          <v-icon v-if="!lot_id">
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    icon: '',
    timeout: null,
    color: '',
    title: '',
    text: '',
    lot_id: null
  }),
  created () {
    this.$root.$on('snackbar', payload => {
      this.timeout = payload.timeout || 3500
      this.color = payload.color || 'primary'
      this.icon = payload.icon || (this.color === 'error' ? 'mdi-tooltip-remove-outline' : 'mdi-checkbox-multiple-marked')
      this.title = payload.title || ''
      this.text = payload.text || ''
      this.lot_id = payload.lot_id || null
      this.snackbar = true
    })
  },
  methods: {
    clickButton () {
      if (this.lot_id) {
        this.$router.push('/' + this.lot_id)
      } else {
        this.snackbar = false
      }
    }
  }
}
</script>

<style scoped>
.text-style {
  color: rgba(255, 255, 255, 0.7);
}
</style>
