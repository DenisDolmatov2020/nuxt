<template functional>
  <v-tooltip
    left
    fixed
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="blue darken-2"
        fab
        dark
        class="btn-no-auth"
        v-bind="attrs"
        v-on="on"
        @click="parent.$router.push('/login')"
      >
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
    </template>
    <span>
        {{ String(parent.$t('auth.sign')) }}
      </span>
  </v-tooltip>
</template>
<style scoped>
.btn-no-auth {
  position: fixed;
  z-index: 1;
  top: 16px;
  right: 16px;
}
</style>
