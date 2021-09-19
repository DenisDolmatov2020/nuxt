<template>
  <CoreForm @request-link="$router.push('/registration')" @final-request="reset">
    <template v-slot:header>
      <h5 @click="$router.push('/login')">
        {{ $t('auth.login') }}
      </h5>
    </template>
    <template v-slot:footer>
      <div
        class="forgot-password"
        @click="$router.push('/registration')"
      >
        {{ $t('auth.registration')  }}
      </div>
    </template>
  </CoreForm>
</template>
<script>
export default {
  methods: {
    async reset (user) {
      try {
        await this.$axios.patch('/api/my-user/reset-password/', user)
        this.$root.$emit('snackbar', { color: 'primary', text: this.$t('password.changed') })
        this.$router.push('/')
      } catch (error) {
        this.$root.$emit('snackbar', { color: 'error', text: this.$t('auth.no_have_user') })
      }
    }
  }
}
</script>
