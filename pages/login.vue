<template functional>
  <CoreForm @request-link="parent.$router.push('/reset')">
    <template v-slot:header>
      <h5 @click="parent.$router.push('/registration')">
        {{ parent.$t('auth.registration') }}
      </h5>
    </template>
    <template v-slot:footer>
      <div
        class="forgot-password"
        @click="parent.$router.push('/reset')"
      >
        {{ parent.$t('auth.reset_password') }}
      </div>
    </template>
  </CoreForm>
</template>
