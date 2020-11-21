// scss
import './../scss/main.scss'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import VueScrollTo from 'vue-scrollto'

import App from '../templates/App.vue'
import store from './store'

Vue.use(Vuelidate)
Vue.use(VueTheMask)
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: -10,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
