import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Lottee',
    title: 'Lottee',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  env: {
    timerTime: process.env.TIMER_TIME || 30
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/main.css'
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        domain: '127.0.0.1:8000/en'
      },
      {
        code: 'vn',
        domain: 'vn.127.0.0.1:8000'
      },
      {
        code: 'ru',
        domain: '127.0.0.1:8000/ru'
      }
    ],
    differentDomains: true,
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          name: 'English',
          error: {
            home_page: 'Home page',
            page_not_found: '404 Not Found',
            error_occurred: 'An error occurred'
          },
          modal: {
            avatar: 'Avatar',
            name: 'Name',
            cancel: 'Cancel',
            save: 'Saving',
            address_delivery: 'Address delivery'
          },
          detail: {
            lot: 'Lot',
            numbers: 'Numbers',
            you_won: 'You won',
            completed: 'Completed',
            condition: 'Condition',
            subscribe: 'Subscribe',
            like: 'Like',
            comment: 'Comment',
            repost: 'Repost',
            winners: 'Winners', // Победитель {{ lot.wins.length === 1 ? 'ь' : 'и' }}
            take_number: 'Take number', // Взять номер
            free: 'Free numbers', // Свободно
            lot_finish: 'Lot completed', // 'Лот завершен'
          },
          auth: {
            username: 'Username',
            login: 'Login',
            password: 'Password',
            password_repeat: 'Password repeat',
            show_password: 'show password',
            forgot_password: 'forgot password?',
            registration: 'Sign in',
            sign_in: 'Sing in',
            entry: 'have account',
            create: 'Create',
            password_reset: 'Password reset',
            sign: 'Sign',
            new_password: 'New password',
            save: 'Save',
            invalid_data: 'Data not correct',
            password_mismatch: 'Password mismatch',
            old_password_incorrect: 'The old password is not correct',
            sent_letter: 'We sent letter on your email',
            logged_in: 'Logged in',
            sent_instruction: 'We sent for you instruction on email for reset password', // 'Инструкция сброса отравлена на почту'
            sent_agreement:  'Sent agreement on your email', // 'Подтверждение отправлено на почту, возможно в папке спам'
            account_free: 'Account address free', // 'Адрес свободен',
            wrong_data: 'Account or password not correct', // 'Не верные данные',
            wrong_token: 'Token wrong or expired', // 'Токен устарел или не верен, попробуйте заново',
            // new
            email_or_phone: 'Enter email or phone',
            invalid_account: 'Not valid account',
            account_confirmed: 'Account confirmed, please login',
            account_not_confirmed: 'Account not confirmed, please agree', // 'Почта не подтверждена',
            entry_code: 'Enter a code',
            account_have: 'it\'s account ready, please login',
            get_code: 'Get code',
            send_code: 'Send code',
            send_again: 'Get new code',
            sent_code: 'We sent you code, enter please',
            last_step: 'Last step',
            info: 'User data',
            account_created: 'Account created',
            many_requests: 'Too many requests, wait',
            no_have_account: 'No have account',
            no_have_user: 'No have such account', // 'Нет пользователя с таким адресом'
            wrong_code: 'Wrong code',
            code: 'Enter code',
            logout: 'Logout account', // 'Вы вышли из профиля'
            reset: 'Reset',
            reset_password: 'Reset password',
            have_error: 'Have error',
            not_login: 'You not login'
          },
          energy: {
            title: 'Energy',
            daily: {
              bonus: 'Daily bonus',
              message: 'Coming every day and getting bonuses',
            }
          },
          password: {
            enter_new: 'Enter new password',
            title: 'Change password',
            old: 'Old password',
            repeat: 'Repeat password',
            changing: 'Change',
            changed: 'Password changed'
          },
          prize: {
            new_message: "Numbers | You won with number | You won with numbers",
            title: 'Prizes',
            message_1: 'You won',
            message_2: 'number',
            show: 'Show'
          },
          profile: {
            title: 'Profile',
            update: 'Update Profile',
            user: 'User',
            button: 'Change password',
            name: 'Name',
            phone: 'Number phone',
            address: 'Address'
          },
          speed: {
            setting: 'Settings',
            won_prizes: 'you\'r prizes',
            logout: 'Logout'
          }
        },
        ru: {
          name: 'Русский',
          error: {
            home_page: 'Вернуться на главную',
            page_not_found: '404 страница не найдена',
            error_occurred: 'Произошла ошибка'
          },
          modal: {
            address_delivery: 'Адрес доставки',
            avatar: 'Аватар',
            name: 'Имя',
            cancel: 'Отменить',
            save: 'Сохранить'
          },
          detail: {
            lot: 'Лот',
            condition: 'Условия',
            subscribe: 'Подписка',
            like: 'Лайк',
            comment: 'Комментарий',
            repost: 'Репост',
            winners: 'Победители', // Победитель {{ lot.wins.length === 1 ? 'ь' : 'и' }}
            take_number: 'Взять номер', //  Взять номер
            free: 'Свободно', // Свободно
            lot_finish: 'Лот завершен', // 'Лот завершен'
          },
          auth: {
            account_free: 'Юзернейм свободен', // 'Адрес свободен',
            invalid_data: 'Данные не корректны',
            sign: 'Вход',
            username: 'Юзернейм',
            login: 'Логин',
            password: 'Пароль',
            password_repeat: 'Повторите пароль',
            send_again: 'Отправить повторно',
            email_ready: 'Почта уже используется, войдите',
            show_password: 'Показать пароль',
            forgot_password: 'забыли пароль?',
            registration: 'Регистрация',
            sign_in: 'Зарегистрироваться',
            entry: 'есть аккаунт',
            create: 'Создать',
            password_reset: 'Сбрось пароля',
            reset: 'Сбросить',
            new_password: 'Новый пароль',
            save: 'Сохранить',
            invalid_email: 'Почта не валидна',
            password_mismatch: 'Пароли не совпадают',
            old_password_incorrect: 'Старый пароль введен не верно',
            sent_letter: 'Мы отправили письмо на Вашу почту',
            logged_in: 'Вы вошли в аккаунт',
            sent_instruction: 'Инструкция сброса отравлена на почту', // 'Инструкция сброса отравлена на почту'
            no_have_user: 'Нет пользователя с таким адресом', // 'Нет пользователя с таким адресом'
            new_password_saved: 'Новый пароль сохранен', // 'Новый пароль сохранен'
            sent_agreement:  'Подтверждение отправлено на почту, возможно в папке спам', // 'Подтверждение отправлено на почту, возможно в папке спам'
            email_confirmed: 'Почта подтверждена, войдите',
            email_not_confirmed: 'Почта не подтверждена', // 'Почта не подтверждена',
            email_free: 'Адрес свободен', // 'Адрес свободен',
            wrong_data: 'Не верные данные', // 'Не верные данные',
            wrong_token: 'Токен устарел или не верен, попробуйте заново', // 'Токен устарел или не верен, попробуйте заново',
            register_error: 'Эта почта уже зарегистрирована попробуйте войти',
            email_or_phone: 'Введите email или номер',
            invalid_account: 'Не валидный аккаунт',
            account_confirmed: 'Аккуаунт подтвержден, пожалуйста войдите',
            account_not_confirmed: 'Аккаунт не подтвержден', // 'Почта не подтверждена',
            entry_code: 'Введите код',
            account_have: 'Пользователь уже существует, войдите',
            get_code: 'Получить код',
            send_code: 'Отправить код',
            sent_code: 'Мы отправили Вам код',
            last_step: 'Последний шаг',
            info: 'Информация пользователя',
            account_created: 'аккаунт создан',
            many_requests: 'Слишком много запросов, пожалуйста подождите',
            no_have_account: 'Этого аккаунта не существует',
            wrong_code: 'Не верный код',
            code: 'Введите код',
            logout: 'Вы вышли из профиля', // 'Вы вышли из профиля'
            reset_password: 'Сброс пароля',
            have_error: 'Есть ошибки',
            not_login: 'Вы не залогинились'
          },
          energy: {
            title: 'Энергия',
            daily: {
              bonus: 'Ежедневный бонус',
              message: 'Заходи каждый день и получай бонусы',
            }
          },
          password: {
            enter_new: 'Введите новый пароль',
            title: 'Смена пароля',
            old: 'Старый пароль',
            repeat: 'Повторите пароль',
            changing: 'Сменить',
            changed: 'Пароль изменен'
          },
          prize: {
            title: 'Подарки',
            message_1: 'Вы выиграли',
            message_2: 'номер',
            show: 'Перейти'
          },
          profile: {
            title: 'Профиль',
            update: 'Обновить профиль',
            user: 'Пользователь',
            button: 'Сменить пароль',
            name: 'Имя',
            phone: 'Номер телефона',
            address: 'Адрес'
          },
          speed: {
            setting: 'Настройки',
            won_prizes: 'Выигранные призы',
            logout: 'Выйти'
          }
        },
        vn: {
          name: 'Viet Nam',
          error: {
            home_page: 'Home page',
            page_not_found: '404 Not Found',
            error_occurred: 'An error occurred'
          },
          modal: {
            avatar: 'Ảnh đại diện',
            name: 'Tên',
            cancel: 'Hủy',
            save: 'Lưu',
            address_delivery: 'Địa chỉ nhận hàng'
          },
          detail: {
            lot: 'Số lượng',
            condition: 'Conditio',
            subscribe: 'Subscribe',
            like: 'Like',
            comment: 'Bình luận',
            repost: 'Repost',
            winners: 'Winners', // Победитель {{ lot.wins.length === 1 ? 'ь' : 'и' }}
            take_number: 'Take number', //  Взять номер
            your_number: 'Your number', // 'Ваш номер'
            free: 'Miễn phí', // Свободно
            lot_finish: 'Lot completed', // 'Лот завершен'
          },
          auth: {
            username: 'Username',
            login: 'Đăng nhập',
            password: 'Mật khẩu',
            password_repeat: 'Nhập lại mật khẩu',
            show_password: 'Hiển thị mật khẩu',
            forgot_password: 'Quên mật khẩu?',
            registration: 'Sign in',
            sign_in: 'Sing in',
            entry: 'have account',
            create: 'Create',
            password_reset: 'Password reset',

            new_password: 'Mật khẩu mới',
            save: 'Lưu',
            invalid_data: 'Data not correct',
            password_mismatch: 'Password mismatch',
            old_password_incorrect: 'The old password is not correct',
            sent_letter: 'We sent letter on your email',
            logged_in: 'Logged in',
            sent_instruction: 'We sent for you instruction on email for reset password', // 'Инструкция сброса отравлена на почту'

            sent_agreement:  'Sent agreement on your email', // 'Подтверждение отправлено на почту, возможно в папке спам'

            account_free: 'Account address free', // 'Адрес свободен',
            wrong_data: 'Account or password not correct', // 'Не верные данные',
            wrong_token: 'Token wrong or expired', // 'Токен устарел или не верен, попробуйте заново',
            // new
            email_or_phone: 'Enter email or phone',
            invalid_account: 'Not valid account',
            account_confirmed: 'Account confirmed, please login',
            account_not_confirmed: 'Account not confirmed, please agree', // 'Почта не подтверждена',
            entry_code: 'Enter a code',
            account_have: 'it\'s account ready, please login',
            get_code: 'Get code',
            send_code: 'Send code',
            send_again: 'Send code again',
            sent_code: 'We sent you code, enter please',
            last_step: 'Last step',
            info: 'User data',
            account_created: 'Account created',
            many_requests: 'Too many requests, wait',
            no_have_account: 'No have account',
            no_have_user: 'No have such account', // 'Нет пользователя с таким адресом'
            wrong_code: 'Wrong code',
            code: 'Enter code',
            sign: 'Sign',
            logout: 'Logout account', // 'Вы вышли из профиля'
            reset: 'Reset',
            reset_password: 'Reset password'
          },
          energy: {
            title: 'Energy',
            daily: {
              bonus: 'Daily bonus',
              message: 'Coming every day and getting bonuses',
            }
          },
          password: {
            enter_new: 'Nhập mật khẩu mới',
            title: 'Thay đổi mật khẩu',
            old: 'Mật khẩu cũ',
            repeat: 'Lập lại mật khẩu',
            changing: 'thay đổi',
            changed: 'Mật khẩu đã được thay đổi'
          },
          prize: {
            title: 'Phần thưởng',
            message_1: 'Bạn đã trúng thưởng',
            message_2: 'số',
            show: 'Show'
          },
          profile: {
            title: 'Profile',
            update: 'Update Profile',
            user: 'User',
            button: 'Change password',
            name: 'Tên',
            phone: 'Số điện thoại',
            address: 'Địa chỉ'
          },
          speed: {
            setting: 'Cài đặt',
            won_prizes: 'Phần thưởng của bạn ',
            logout: 'Đăng xuất'
          }
        }
      }
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/my-user/token/', method: 'post', propertyName: 'access' },
          logout: false,
          user: { url: '/api/my-user', method: 'get' },
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    },
    redirect: {
      // login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    }
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true, // Can be also an object with default options
    baseURL: process.env.API_URI || 'http://127.0.0.1:8000' // 'http://api.lottee.online',
  },
  proxy: {
    '/api': {
      target: process.env.API_URI || 'http://127.0.0.1:8000' + '/api', // 'http://api.lottee.online/' + 'api',
      secure: false
    },
    '/media': {
      target: process.env.API_URI || 'http://127.0.0.1:8000' + '/api', // 'http://api.lottee.online/' + 'media',
      secure: false
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
