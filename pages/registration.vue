<template>
  <CoreForm
    @request-link="$router.push('/login')"
    @final-request="registration"
  >
    <template v-slot:header>
      <h5 @click="$router.push('/login')">
        {{ $t('auth.login') }}
      </h5>
    </template>
    <template v-slot:footer>
      <div
        class="forgot-password"
        @click="$router.push('/reset')"
      >
        {{ $t('auth.reset_password')  }}
      </div>
    </template>
  </CoreForm>
</template>
<script>
export default {
  methods: {
    async registration (user) {
      try {
        await this.$axios.post('/api/my-user/create/', user)
        this.$root.$emit('snackbar', { color: 'success', text: this.$t('auth.account_created') })
        await this.$auth.loginWith('local', { data: user })
      } catch (error) {
        this.$root.$emit('snackbar', { color: 'success', text: this.$t('auth.have_error') })
        console.log(error)
      }
    }
  }
}
</script>
