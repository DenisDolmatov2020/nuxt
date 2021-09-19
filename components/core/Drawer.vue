<template functional>
  <v-navigation-drawer
    :value="parent.$route.name !== 'index'"
    right
    fixed
    temporary
    width="480"
    floating
    permanent
  >
    <nuxt />
  </v-navigation-drawer>
</template>

