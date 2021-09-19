<template>
  <v-app dark>
    <h1>
      {{ head }}
    </h1>
    <NuxtLink to="/">
     {{ $t('error.home_page') }}
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: this.$t('page_not_found'),
      otherError: this.$t('error_occurred')
    }
  },
  computed: {
    head () {
      return this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    }
  },
  head () {
    return this.head
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
