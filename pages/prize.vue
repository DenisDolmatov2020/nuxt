<template>
  <div>
    <CoreHeader :page="{ title: $t('prize.title'), color: 'purple', dark: true, update: false }" />
    <v-alert
      v-for="prize in prizes"
      :key="prize.id"
      class="ma-4"
      color="deep-purple"
      dark
      icon="mdi-gift"
      prominent
      border="left"
    >
      <v-row align="center">
        <v-col class="grow">
          {{ `${$t('prize.message_1')} ${prize.lot.title}` }},
          {{ `${$t('prize.message_2')} # ${prize.num}` }}
        </v-col>
        <v-col class="shrink">
          <v-btn text @click="$router.push(`/${prize.lot.id}`)">
            {{ $t('prize.show') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Prize',
  middleware: ['auth'],
  computed: {
    ...mapState(['prizes'])
  }
}
</script>
