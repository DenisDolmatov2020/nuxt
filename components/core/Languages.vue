<template>
  <div id="create">
    <v-speed-dial
      v-model="fab"
      fixed
      bottom
      left
      direction="top"
      slide-y-reverse-transition
      style="z-index: 7"
    >
      <template v-slot:activator>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-model="fab"
              color="green"
              dark
              fab
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar>
                <v-img
                  :src="require(`~/assets/images/${$i18n.locale}.png`)"
                />
              </v-avatar>
            </v-btn>
          </template>
          <span>{{ $t('name') }}</span>
        </v-tooltip>
      </template>
      <v-tooltip
        v-for="(value, key) in $i18n.messages"
        :key="key"
        right
      >
        <template
          v-if="key !== $i18n.locale"
          v-slot:activator="{ on, attrs }"
        >
          <v-btn
            v-model="fab"
            dark
            fab
            v-bind="attrs"
            v-on="on"
            @click="$i18n.locale = key"
          >
            <v-avatar>
              <v-img :src="require(`~/assets/images/${key}.png`)" />
            </v-avatar>
          </v-btn>
        </template>
        <span>{{ value.name }}</span>
      </v-tooltip>
    </v-speed-dial>
  </div>
</template>
<script>
export default {
  data: () => ({
    fab: false
  })
}
</script>
