// scss
import './../scss/main.scss'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'

import App from '../templates/App.vue'
import store from './store'

Vue.use(Vuelidate)
Vue.use(VueTheMask)

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
