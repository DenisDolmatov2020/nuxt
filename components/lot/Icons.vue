<template functional>
  <v-row
    align="center"
    justify="end"
    class="mr-4"
  >
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-icon
          class="mr-1"
          color="pink"
          v-bind="attrs"
          v-on="on"
        >
          mdi-gift-outline
        </v-icon>
        <span class="subheading mr-2 font-weight-bold pink--text">
          {{ props.lot.winners }}
        </span>
      </template>
      <span>Призы</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <span class="subheading mr-2 font-weight-bold indigo--text">
          {{ props.lot.energy * props.x }}
        </span>
        <v-icon
          color="indigo"
          v-bind="attrs"
          v-on="on"
        >
          mdi-flash
        </v-icon>
      </template>
      <span>Энергия</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <span class="subheading font-weight-bold green--text">
          {{ props.lot.free_numbers ? `${props.lot.players - props.lot.free_numbers}/` : '' }}{{ props.lot.players }}
        </span>
        <v-icon
          class="mr-1"
          color="green"
          v-bind="attrs"
          v-on="on"
        >
          mdi-table-account
        </v-icon>
      </template>
      <span>Участники</span>
    </v-tooltip>
  </v-row>
</template>


