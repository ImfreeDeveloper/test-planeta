// scss
import './../scss/main.scss'

import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from '../templates/App.vue'

Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
