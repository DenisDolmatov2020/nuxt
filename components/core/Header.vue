<template functional>
  <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar
      dense
      :color="props.page.color"
      :dark="props.page.dark"
    >
      <v-btn icon @click="parent.$router.push(props.url || '/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ props.page.title }}</v-toolbar-title>
      <v-spacer />
      <CoreModal v-if="props.page.update" />
    </v-toolbar>
  </v-card>
</template>
