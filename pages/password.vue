<template>
  <div>
    <CoreHeader
      url="/profile"
      :page="{ title: $t('password.title'), color: '#00cae3', dark: true, update: false }"
    />

    <div class="user-container">
      <div class="content-w3ls">
        <form class="content-bottom">
          <div
            v-if="message"
            class="login-first login-first-error"
          >
            {{ message }}
          </div>
          <div class="field-group">
            <img
              alt="lock icon"
              class="icon-field"
              :src="require('assets/icons/lock.svg')"
            >
            <div class="wthree-field">
              <input
                id="old_password"
                v-model="user.old_password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="on"
                :placeholder="$t('auth.password')"
              >
            </div>
          </div>
          <div class="field-group">
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
                :type="showPassword ? 'text' : 'password'"
                autocomplete="on"
                :placeholder="$t('auth.new_password')"
              >
            </div>
          </div>
          <div class="field-group">
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
                :type="showPassword ? 'text' : 'password'"
                autocomplete="on"
                :placeholder="$t('auth.password_repeat')"
              >
            </div>
          </div>
          <div class="field-group-2">
            <div class="switch-agileits">
              <label class="switch">
                <input v-model="showPassword" type="checkbox">
                <span class="slider round" />
                {{ $t('auth.show_password') }}
              </label>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-entry"
            @click="updatePassword()"
          >
            {{ $t('password.changing') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      message: '',
      showPassword: false,
      user: {
        old_password: '',
        password: '',
        password_repeat: ''
      }
    }
  },
  methods: {
    switchPage (page) {
      this.$router.replace({ name: 'login', query: { page } })
    },
    updatePassword () {
      this.$axios.patch('/api/my-user/update-password/', this.user)
        .then(() => {
          this.$router.push({ name: 'profile' })
          this.$root.$emit('snackbar', { color: 'success', text: this.$t('password.changed') })
        })
        .catch(error => {
          this.message = error?.response?.data?.message[0] ? this.$t(error.response.data.message[0]) : error
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-first {
  text-align: center;
  max-width: 350px;
  padding: 20px;
  margin-bottom: 20px;
  color: white;
  &-error {
    background-color: rgba(255, 0, 0, 1);
  }
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
  padding: 50px 0 50px 0;
}
.pages-bottom {
  display: flex;
  justify-content: space-between;
}
.forgot-password {
  cursor: pointer;
  margin-top: 1em;
  color: #81D4FA;
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
  background: #00cae3;  /* rgba(0, 0, 0, 0.4); */
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
}
.field-group-2 {
  margin: 0 0 12px 0;
}

.field-group span {
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

.field-group .wthree-field {
  flex: 2 55%;
  -webkit-box-flex: 2 55%;     /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 2 55%;        /* OLD - Firefox 19- */
  -webkit-flex: 2 55%;          /* Chrome */
  -ms-flex: 2 55%;             /* IE 10 */
}

.wthree-field input {
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
    margin: 1em 0 0;
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
