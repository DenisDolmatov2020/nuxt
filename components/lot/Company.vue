<template functional>
  <v-card
    class="v-sheet--offset mx-auto"
    :color="props.userLot ? 'green' : 'blue lighten-1'"
    elevation="12"
    width="calc(100% - 32px)"
    height="80px"
  >
    <v-card-title
      three-line
      class="mb-2"
      :class="`mx-1 white--text`"
    >
      <v-list-item-avatar
        color="grey lighten-2"
        class="ml-1 mt-1"
      >
        <v-img
          v-if="props.company.image"
          :src="props.company.image"
        />
        <v-icon v-else>
          mdi-camera
        </v-icon>
      </v-list-item-avatar>
      <v-spacer />
      {{ props.userLot ? 'Ваш лот' : props.company.name }}
    </v-card-title>
  </v-card>
</template>
<style scoped>
.v-sheet--offset {
  top: -24px;
  margin-top: 24px;
}
</style>
