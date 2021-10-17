<template>
  <div>
    <CoreHeader :page="{ title: titles[$route.path], color: '#333', dark: true, update: false }" />
    <div class="user-container">
      <div class="content-w3ls">
        <div class="content-bottom">
          <div
            v-if="step === 2"
            class="login-first login-first-primary"
          >
            <div>
              0{{ Math.floor(timer / 60) }}:{{ `${timer % 60 > 9 ? '' : '0'}${timer % 60}` }}
            </div>
            <button
              v-if="!timer_interval"
              class="login-first-link"
              @click="requestLink"
            >
              {{ $t('auth.send_again') }}
            </button>
          </div>

          <div v-else class="form-buttons">
            <h2>
              {{ titles[$route.path] }}
            </h2>
            <slot name="header" />
          </div>
          <div class="field-group">
            <div class="field-group-icons">
              <img
                v-if="isValueValid !== 1"
                alt="phone icon"
                class="icon-field"
                :src="require('assets/icons/phone.svg')"
              >
              <img
                v-if="isValueValid !== 2"
                alt="email icon"
                class="icon-field"
                :src="require('assets/icons/email.svg')"
              >
            </div>
            <div class="wthree-field">
              <input
                v-model="user.identifier"
                :disabled="step === 2"
                :class="{ invalid: !isValueValid && user.identifier.length }"
                name="email or phone"
                type="text"
                :placeholder="$t('auth.email_or_phone')"
                required
              >
            </div>
          </div>
          <div v-if="step > 1" class="field-group">
            <div class="field-group-icons">
              <img
                alt="verify code"
                class="icon-field"
                :src="require('assets/icons/gr_code_scan.svg')"
              >
            </div>
            <div class="wthree-field">
              <input
                v-model="user.code"
                name="email or phone"
                type="text"
                :disabled="step === 3"
                :placeholder="$t('auth.code')"
                required
              >
            </div>
          </div>
          <div
            v-if="step === 3 && signIn"
            class="field-group"
          >
            <img
              alt="user icon"
              class="icon-field"
              :src="require('assets/icons/user.svg')"
            >
            <div class="wthree-field">
              <input
                v-model="user.name"
                name="username"
                type="text"
                :placeholder="$t('auth.username')"
                required
              >
            </div>
          </div>
          <div
            v-if="step === 3 || logIn"
            class="field-group"
          >
            <img
              alt="lock icon"
              class="icon-field"
              :src="require('assets/icons/lock.svg')"
            >
            <div class="wthree-field">
              <input
                id="password"
                v-model="user.password"
                name="password"
                :type="show_password ? 'text' : 'password'"
                autocomplete="on"
                :placeholder="$t('auth.password')"
              >
            </div>
          </div>
          <div
            v-if="step === 3"
            class="field-group"
          >
            <img
              alt="lock icon"
              class="icon-field"
              :src="require('assets/icons/lock.svg')"
            >
            <div class="wthree-field">
              <input
                id="password-repeat"
                v-model="user.password_repeat"
                name="password-repeat"
                :type="show_password ? 'text' : 'password'"
                autocomplete="on"
                :placeholder="$t('auth.password_repeat')"
              >
            </div>
          </div>
          <div
            v-if="step === 3 || logIn"
            class="field-group-2"
          >
            <div class="switch-agileits">
              <label class="switch">
                <input v-model="show_password" type="checkbox">
                <span class="slider round" />
                {{ $t('auth.show_password') }}
              </label>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-entry"
            @click="requests"
          >
            {{ buttonTitle }}
          </button>
          <div class="pages-bottom">
            <slot name="footer" />
            <div
              v-if="step > 1"
              class="forgot-password"
              @click="step -= 1;"
            >
              {{ $t('modal.cancel') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timer: process.env.timerTime,
      timer_interval: null,
      titles: {
        '/registration': this.$t('auth.registration'),
        '/reset': this.$t('auth.reset'),
        '/login': this.$t('auth.login')
      },
      step: 1,
      user: {
        identifier: '',
        code: '',
        name: '',
        password: '',
        password_repeat: ''
      },
      show_password: false,
      reg_email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      reg_phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
    }
  },
  computed: {
    isValueValid () {
      if (this.user.identifier) {
        if (this.reg_email.test(this.user.identifier)) {
          return 1
        } else if (this.reg_phone.test(this.user.identifier)) {
          return 2
        }
      }
      return 0
    },
    signIn () {
      return this.$route.path === '/registration'
    },
    logIn () {
      return this.$route.path === '/login'
    },
    buttonTitle () {
      return this.step === 3 || this.logIn ? this.titles[this.$route.path] :
        this.step === 2 ? this.$t('auth.send_code') : this.$t('auth.get_code')
    }
  },
  methods: {
    requestLink () {
      this.step === 2 ? this.getOTP() : this.$emit('request-link')
    },
    requests () {
      if (this.logIn) {
        this.login()
      } else if (this.signIn && this.user.password !== this.user.password_repeat) {
        this.$root.$emit('snackbar', {
          color: 'error',
          text: this.$t('auth.password_mismatch'),
        })
      } else if (this.step === 3) {
        this.$emit('final-request', this.user)
      } else if (this.step === 2) {
        this.sentOTP()
      } else {
        this.getOTP()
      }
    },
    async login () {
      if (this.isValueValid) {
        try {
          await this.$auth.loginWith('local', { data: this.user })
          this.$root.$emit('snackbar', {
            color: 'success',
            text: this.$t('auth.logged_in'),
            icon: 'mdi-account-check'
          })
        } catch (error) {
          this.$root.$emit('snackbar', {
            color: 'error',
            text: this.$t('auth.wrong_data')
          })
        }
      }
    },
    /*
    async checkValue () {
      if (this.isValueValid) {
        try {
          await this.$axios.post(
            '/api/my-user/have-account/',
            { identifier: this.user.identifier, have: !this.signIn }
          )
          return true
        } catch (error) {
          this.message = {
            type: 'error',
            text: this.signIn ? this.$t('auth.account_have') : this.$t('auth.no_have_account'),
            link: this.signIn ? this.$t('auth.login') : this.$t('auth.sign_in')
          }
          this.$t('auth.wrong_data')
        }
      }
      return false
    },

     */
    timerStart () {
      this.timer = process.env.timerTime
      this.timer_interval = setInterval(() => {
        if (this.timer < 1) {
          this.timer = process.env.timerTime
          clearInterval(this.timer_interval)
          this.timer_interval = null
        } else {
          this.timer -= 1
        }
      }, 1000)
    },
    async getOTP () {
      try {
        await this.$axios.post('/api/otp/', this.user)
        this.step = 2
        this.timerStart()
        this.$root.$emit('snackbar', {
          color: 'primary',
          text: this.$t('auth.send_code')
        })
      } catch (error) {
        this.$root.$emit('snackbar', {
          color: 'error',
          text: this.$t('auth.have_error')
        })
      }
    },
    async sentOTP () {
      if (this.user.code) {
        try {
          await this.$axios.post('/api/otp/verify/', this.user)
          this.$root.$emit('snackbar', {
            color: 'success',
            text: this.$t('auth.enter_new')
          })
          this.step = 3
        } catch (error) {
          this.$root.$emit('snackbar', {
            color: 'error',
            text: this.$t('auth.wrong_code')
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
.timer {
  text-align: center;
  max-width: 350px;
  padding: 10px;
  color: white;
  &-time {
    font-size: 28px;
  }
  &-start {
    background-color: #f39f01;
    .send-again {
      color: rgba(0, 0, 0, 0.4);
    }
  }
  &-finish {
    background-color: #00a800;
    .send-again {
      background-color: rgba(0, 0, 0, 0.5);
      padding: 5px 15px;
      border: 2px solid #81D4FA;
      border-radius: 10px;
      transition: all 0.5s ease-in;
      &:hover {
        border-color: whitesmoke;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
.login-first {
  text-align: center;
  max-width: 350px;
  padding: 20px;
  margin-bottom: 12px;
  color: white;
  &-primary {
    background-color: rgba(0, 0, 255, 0.7);
  }
  &-link {
    text-decoration: underline; opacity: .5; cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
.form-buttons {
  display: flex;
  justify-content: space-between;
  justify-self: center;
}
.icon-field {
  width: 30px;
  margin-right: 5px;
}
.user-container {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding: 80px 0 100px 0;
}
.pages-bottom {
  display: flex;
  justify-content: space-between;
}
.forgot-password {
  cursor: pointer;
  margin-top: 1em;
  color: #81D4FA;
  font-size: 18px;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
/*--start editing from here--*/
a {
  text-decoration: none;
}
/* horizontal menu */
img {
  max-width: 100%;
}
/*--end reset--*/
body a:hover {
  text-decoration: none;
}
body {
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -ms-background-size: cover;
  background-attachment: fixed;
  font-family: cursive;
}
.content-w3ls {
  max-width: 500px;
  margin: 0 auto;
}
.content-bottom {
  min-height: 25em;
  padding: 3em 4em;
  background: #333;  /* rgba(0, 0, 0, 0.4); */
  border-radius: 1px 1px 1px 0;
  margin: 0 1em;
  box-shadow: 12px 12px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 12px 12px rgba(0, 0, 0, 0.6);
  -o-box-shadow: 12px 12px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 12px 12px rgba(0, 0, 0, 0.6);
  -ms-box-shadow: 12px 12px rgba(0, 0, 0, 0.6);
}
h2 {
  font-size: 25px;
  color: #fff;
  letter-spacing: 2px;
  margin-bottom: 1em;
}
h5 {
  font-size: 17px;
  color: #81D4FA;
  letter-spacing: 2px;
  margin-top: 0.5em;
  cursor: pointer;
}
.field-group label {
  font-size: 15px;
}
.radio input {
  position: absolute;
  left: -9999px;
}
.checkbox i {
  position: absolute;
  bottom: 5px;
  left: 2px;
  display: block;
  width: 14px;
  height: 14px;
  outline: none;
  border: none;
  background: #fff;
}
.check label {
  margin: 0;
  font-size: 1em;
  text-transform: capitalize;
  color: #fff;
  letter-spacing: 1px;
  font-weight: 300;
}
.checkbox input:checked+i:after,
.radio input:checked+i:after {
  opacity: 1;
}
.checkbox input+i:after {
  content: '';
  top: 0px;
  left: 0px;
  width: 14px;
  height: 14px;
  font: normal 8px/16px FontAwesome;
  text-align: center;
}
.checkbox input+i:after,
.radio input+i:after {
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s;
  -o-transition: opacity 0.1s;
  -ms-transition: opacity 0.1s;
  -moz-transition: opacity 0.1s;
  -webkit-transition: opacity 0.1s;
}
.field-group {
  background: transparent;
  display: flex;
  display: -webkit-box;
  /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;
  /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;
  /* TWEENER - IE 10 */
  display: -webkit-flex;
  /* NEW - Chrome */
  margin: 0 0 12px 0;
  &-icons {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  span {
    flex: 1;
    -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1;         /* OLD - Firefox 19- */
    width: 20%;               /* For old syntax, otherwise collapses. */
    -webkit-flex: 1;          /* Chrome */
    -ms-flex: 1;              /* IE 10 */
    color: #252525;
    font-size: 1.2em;
    background: #fff;
    text-align: center;
    line-height: 49px;
    border-width: 1px 1px 1px 1px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  .wthree-field {
    flex: 2 55%;
    -webkit-box-flex: 2 55%;     /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 2 55%;        /* OLD - Firefox 19- */
    -webkit-flex: 2 55%;          /* Chrome */
    -ms-flex: 2 55%;             /* IE 10 */
    input {
      padding: 15px;
      font-size: 16px;
      color:#333;
      letter-spacing: 1px;
      border: none;
      border-width: 1px 1px 1px 1px;
      background: #fff;
      box-sizing: border-box;
      font-family: cursive;
      width: 100%;
      outline: none;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
    }
    .invalid {
      border: 2px solid red
    }
  }
}
.field-group-2 {
  margin: 0 0 12px 0;
}
/* switch */
label.switch {
  position: relative;
  display: inline-block;
  height: 23px;
  padding-left: 3.5em;
  cursor: pointer;
  color: #fff;
  font-weight: 300;
}
li:nth-child(2) a,
label.switch {
  font-size: 16px;
  letter-spacing: 0.5px;
  font-weight: 300;
}
li:nth-child(2) a {
  color: #fff;
}
.switch input {
  display: none;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 42px;
  background-color: #252525;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked+.slider {
  background-color: #03A9F4;
}
input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}
input:checked+.slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
@media screen and (max-width: 1280px) {
  .content-w3ls {
    margin: 1em auto;
  }
}
@media screen and (max-width: 1024px) {
  h1.title-agile {
    font-size: 3em;
  }
}
@media screen and (max-width: 768px) {
  h1.title-agile {
    font-size: 3.1em;
    letter-spacing: 3px;
    word-spacing: 5px;
  }
}
@media screen and (max-width: 667px) {
  h1.title-agile {
    font-size: 2.8em;
  }
  .content-w3ls {
    margin: 3em auto;
  }
}
@media screen and (max-width: 600px) {
  .copyright p {
    color: #fff;
    letter-spacing: 1px;
  }
}
@media screen and (max-width: 568px) {
  .content-bottom {
    padding: 3.5em 2em 1em;
  }
}
@media screen and (max-width: 480px) {
  h1.title-agile {
    font-size: 2.7em;
  }
  form .field-group .wthree-field {
    flex: 3 45%;
  }
  li.switch-agileits,ul.list-login li:nth-child(2){
    float: none;
  }
  ul.list-login li:nth-child(2){
    margin:1em 0 0;
  }
}
@media screen and (max-width: 414px) {
  h1.title-agile {
    font-size: 2.45em;
  }
  form .field-group .wthree-field {
    flex: 3 41%;
  }
}
@media screen and (max-width: 384px) {
  h1.title-agile {
    font-size: 2.15em;
  }
  .wthree-field input {
    padding: 11px 5px;
  }
  form .field-group span {
    font-size: 1.2em;
    line-height: 43px;
  }
}
@media screen and (max-width: 375px) {
  form .field-group .wthree-field {
    flex: 3 37%;
  }
  .copyright p {
    padding:0 1em 2em;
    letter-spacing: 0;
  }
}
@media screen and (max-width: 320px) {
  h1.title-agile {
    font-size: 1.9em;
  }
  .content-bottom {
    padding: 3.5em 1em 1em;
  }
}
</style>

